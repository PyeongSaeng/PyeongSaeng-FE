import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../Personal/components/user/signIn/NextButton';
import TopbarForLogin from '../../shared/components/topbar/TopbarForLogin';
import { CompanySigninState, CompanySigninRequest } from './types/auth';
import {
  useCompanySignup,
  useCheckCompanyUsername,
  useSendCompanyVerificationCode,
} from './hooks/useCompanyAuth';
import BusinessNumberErrorModal from './components/Modal/BusinessNumberErrorModal';

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[0.7rem] bg-white placeholder-[#BDBDBD] text-[1.6rem]';

const CompanySignin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<CompanySigninState>({
    ownerName: '',
    phone: '',
    verificationCode: '',
    companyName: '',
    businessNo: '',
    username: '',
    password: '',
    passwordConfirm: '',
    isIdAvailable: false,
  });

  // 불필요한 상태 제거
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [showBusinessNumberErrorModal, setShowBusinessNumberErrorModal] =
    useState(false);
  const [usernameCheckResult, setUsernameCheckResult] = useState<
    'available' | 'unavailable' | null
  >(null);

  // hooks
  const companySignupMutation = useCompanySignup();
  const checkUsernameMutation = useCheckCompanyUsername();
  const sendVerificationCodeMutation = useSendCompanyVerificationCode();

  // 비밀번호 확인 검증
  const passwordsMatch =
    state.password &&
    state.passwordConfirm &&
    state.password === state.passwordConfirm;
  const passwordMismatch =
    state.passwordConfirm && state.password !== state.passwordConfirm;

  // 메시지 초기화 함수
  const clearMessages = () => {
    setUsernameCheckResult(null);
  };

  // 인증번호 발송 함수
  const handleSendVerificationCode = () => {
    if (!state.phone) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    clearMessages();
    sendVerificationCodeMutation.mutate(state.phone, {
      onSuccess: () => {
        setIsVerificationSent(true);
        alert('인증번호가 발송되었습니다.');
      },
      onError: (error: any) => {
        const errorMsg =
          error.response?.data?.message ||
          '인증번호 발송 중 오류가 발생했습니다.';
        alert(errorMsg);
      },
    });
  };

  // 아이디 중복 확인 함수
  const handleCheckUsername = () => {
    if (!state.username) {
      alert('아이디를 입력해주세요.');
      return;
    }

    clearMessages();

    checkUsernameMutation.mutate(state.username, {
      onSuccess: (data) => {
        const resultMessage = data?.result || '';
        const isAvailable =
          resultMessage.includes('사용 가능한') ||
          resultMessage.includes('사용가능한');

        if (isAvailable) {
          setState((s) => ({ ...s, isIdAvailable: true }));
          setUsernameCheckResult('available');
        } else {
          setState((s) => ({ ...s, isIdAvailable: false }));
          setUsernameCheckResult('unavailable');
        }
      },
      onError: (error: any) => {
        setState((s) => ({ ...s, isIdAvailable: false }));
        setUsernameCheckResult('unavailable');
        const errorMsg =
          error.response?.data?.message ||
          '아이디 중복 확인 중 오류가 발생했습니다.';
        alert(errorMsg);
      },
    });
  };

  // 회원가입 완료 함수에서 성공 메시지 처리
  const handleCompleteSignIn = () => {
    clearMessages();

    // 유효성 검사
    if (
      !state.ownerName ||
      !state.phone ||
      !state.companyName ||
      !state.businessNo ||
      !state.username ||
      !state.password ||
      !state.passwordConfirm ||
      !state.verificationCode
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!isVerificationSent) {
      alert('인증번호를 발송해주세요.');
      return;
    }

    if (!state.isIdAvailable) {
      alert('아이디 중복 확인을 완료해주세요.');
      return;
    }

    if (!passwordsMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비즈니스 번호에서 하이픈 제거
    const businessNoFormatted = state.businessNo.replace(/-/g, '');

    const signupData: CompanySigninRequest = {
      ownerName: state.ownerName,
      phone: state.phone,
      verificationCode: state.verificationCode,
      companyName: state.companyName,
      businessNo: businessNoFormatted,
      username: state.username,
      password: state.password,
    };

    companySignupMutation.mutate(signupData, {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/company/login');
      },
      onError: (error: any) => {
        if (
          error.response?.data?.message?.includes('사업자 등록번호') ||
          error.response?.status === 400
        ) {
          setShowBusinessNumberErrorModal(true);
        } else {
          const errorMsg =
            error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
          alert(errorMsg);
        }
      },
    });
  };

  return (
    <TopbarForLogin showToggle={false}>
      <div className="flex flex-col items-center w-full pt-8 px-[3.3rem]">
        {/* 성공/에러 메시지 영역 완전 제거 */}

        <div className="w-[29.4rem]">
          {/* 사업자명 */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem]">
            사업자명
          </div>
          <input
            className={inputClass}
            placeholder="사업자명을 입력하세요"
            value={state.ownerName}
            onChange={(e) => {
              setState((s) => ({ ...s, ownerName: e.target.value }));
              clearMessages();
            }}
          />

          {/* 사업자 전화번호 */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem] mt-[2.8rem]">
            사업자 전화번호
          </div>
          <input
            className={inputClass}
            placeholder="사업자 전화번호를 입력하세요"
            value={state.phone}
            onChange={(e) => {
              setState((s) => ({ ...s, phone: e.target.value }));
              clearMessages();
            }}
          />

          {/* 인증번호(SMS) */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem] mt-[2.8rem]">
            인증번호(SMS)
          </div>
          <div className="flex gap-2 mb-[1rem]">
            <input
              className="w-[18.3rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem]"
              placeholder="인증번호를 입력하세요"
              value={state.verificationCode}
              onChange={(e) => {
                setState((s) => ({ ...s, verificationCode: e.target.value }));
                clearMessages();
              }}
            />
            <button
              onClick={handleSendVerificationCode}
              disabled={
                sendVerificationCodeMutation.isPending ||
                !state.phone.trim() ||
                isVerificationSent
              }
              className="bg-[#0D29B7] w-[10.3rem] text-white rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium h-[4.5rem] text-center whitespace-nowrap disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {sendVerificationCodeMutation.isPending
                ? '발송중...'
                : isVerificationSent
                  ? '전송완료'
                  : '인증번호 전송'}
            </button>
          </div>

          {/* 재전송 버튼 영역 */}
          {isVerificationSent && (
            <div className="w-full mb-4 flex flex-col items-end mt-[0.8rem]">
              <p className="text-[#0D29B7] text-[1.4rem] font-medium mb-2 text-right">
                인증번호를 받지 못한 경우 한 번 더 눌러주세요
              </p>
              <button
                className="bg-gray-200 text-gray-700 rounded-[6px] px-[1.2rem] py-[0.8rem] text-[1.2rem] font-medium disabled:opacity-50"
                onClick={handleSendVerificationCode}
                disabled={sendVerificationCodeMutation.isPending}
              >
                {sendVerificationCodeMutation.isPending
                  ? '재전송 중...'
                  : '인증번호 재전송'}
              </button>
            </div>
          )}

          {/* 기업명 */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem] mt-[2.8rem]">
            기업명
          </div>
          <input
            className={inputClass}
            placeholder="기업명을 입력하세요"
            value={state.companyName}
            onChange={(e) => {
              setState((s) => ({ ...s, companyName: e.target.value }));
              clearMessages();
            }}
          />

          {/* 사업자 등록 번호 */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem] mt-[2.8rem]">
            사업자 등록 번호
          </div>
          <div className="flex w-full justify-between items-center relative">
            <input
              className="w-[6.6rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem] text-center"
              value={state.businessNo.split('-')[0] || ''}
              onChange={(e) => {
                const parts = state.businessNo.split('-');
                parts[0] = e.target.value;
                setState((s) => ({ ...s, businessNo: parts.join('-') }));
                clearMessages();
              }}
              maxLength={3}
            />
            <div className="absolute left-[7.1rem] w-[1.5rem] h-[0.1rem] bg-[#929292] top-1/2 transform -translate-y-1/2"></div>
            <input
              className="w-[6.6rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem] text-center"
              value={state.businessNo.split('-')[1] || ''}
              onChange={(e) => {
                const parts = state.businessNo.split('-');
                parts[1] = e.target.value;
                setState((s) => ({ ...s, businessNo: parts.join('-') }));
                clearMessages();
              }}
              maxLength={2}
            />
            <div className="absolute left-[16rem] w-[1.5rem] h-[0.1rem] bg-[#929292] top-1/2 transform -translate-y-1/2"></div>
            <input
              className="w-[11.4rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem] text-center"
              value={state.businessNo.split('-')[2] || ''}
              onChange={(e) => {
                const parts = state.businessNo.split('-');
                parts[2] = e.target.value;
                setState((s) => ({ ...s, businessNo: parts.join('-') }));
                clearMessages();
              }}
              maxLength={5}
            />
          </div>

          {/* 사업자 계정 생성 */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mt-[3.8rem] mb-[1rem]">
            사업자 계정 생성
          </div>
          <div className="flex gap-2 mt-[1.6rem] mb-1">
            <input
              className={`${inputClass} ${state.username ? 'text-black' : 'text-[#BDBDBD]'}`}
              placeholder="아이디를 입력해주세요"
              value={state.username}
              onChange={(e) => {
                setState((s) => ({
                  ...s,
                  username: e.target.value,
                  isIdAvailable: false,
                }));
                setUsernameCheckResult(null);
                clearMessages();
              }}
            />
            <button
              onClick={handleCheckUsername}
              disabled={checkUsernameMutation.isPending}
              className="bg-[#0D29B7] w-[9.6rem] text-white rounded-[8px] py-[1.2rem] text-[1.6rem] font-medium h-[4.5rem] text-center disabled:opacity-50"
            >
              {checkUsernameMutation.isPending ? '확인중...' : '확인'}
            </button>
          </div>

          {/* 아이디 중복 확인 결과 메시지 */}
          {usernameCheckResult === 'available' && (
            <div className="text-[#08D485] text-[1.4rem] mb-[2.2rem] mt-[0.5rem] ml-[1rem]">
              사용 가능한 아이디입니다
            </div>
          )}
          {usernameCheckResult === 'unavailable' && (
            <div className="text-red-500 text-[1.4rem] mb-[2.2rem] mt-[0.5rem] ml-[1rem]">
              이미 사용중인 아이디입니다
            </div>
          )}

          {/* 비밀번호 */}
          <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem] mt-[2.8rem]">
            비밀번호
          </div>
          <input
            className={`${inputClass} ${state.password ? 'text-black' : 'text-[#BDBDBD]'}`}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={state.password}
            onChange={(e) => {
              setState((s) => ({ ...s, password: e.target.value }));
              clearMessages();
            }}
          />

          <input
            className={`${inputClass} ${state.passwordConfirm ? 'text-black' : 'text-[#BDBDBD]'}`}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            value={state.passwordConfirm}
            onChange={(e) => {
              setState((s) => ({ ...s, passwordConfirm: e.target.value }));
              clearMessages();
            }}
          />

          {/* 비밀번호 확인 메시지 */}
          {passwordMismatch && (
            <div className="text-red-500 text-[1.4rem] mb-[1rem]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>

        <NextButton
          onClick={handleCompleteSignIn}
          disabled={companySignupMutation.isPending}
          className="!bg-[#0D29B7] text-white mt-[3.3rem] mb-[2.8rem] disabled:opacity-50"
        >
          {companySignupMutation.isPending ? '회원가입 중...' : '회원가입'}
        </NextButton>
      </div>

      {/* 사업자 등록번호 오류 모달 */}
      <BusinessNumberErrorModal
        isOpen={showBusinessNumberErrorModal}
        onClose={() => setShowBusinessNumberErrorModal(false)}
      />
    </TopbarForLogin>
  );
};

export default CompanySignin;
