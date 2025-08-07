import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../signIn/NextButton';
import {
  useSendAccountSMS,
  useVerifyPasswordReset,
  useResetPassword,
} from '../../../hooks/useAuth';

type PasswordStep = 'input' | 'reset' | 'complete';

const PasswordFind = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<PasswordStep>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifiedUsername, setVerifiedUsername] = useState(''); // 인증된 username 저장

  // SMS 및 인증 상태
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isKakaoUser, setIsKakaoUser] = useState(false);

  // API 훅
  const sendSMSMutation = useSendAccountSMS();
  const verifyPasswordResetMutation = useVerifyPasswordReset();
  const resetPasswordMutation = useResetPassword();

  const handleVerificationSend = () => {
    if (!phoneNumber.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    sendSMSMutation.mutate(
      { phone: phoneNumber },
      {
        onSuccess: (data) => {
          const kakaoUser = data.result?.kakaoUser || false;
          setIsKakaoUser(kakaoUser);
          setIsVerificationSent(true);
        },
        onError: () => {
          alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    // 가짜 인증 확인 (IdFind와 동일한 방식)
    setTimeout(() => {
      console.log('가짜 인증 확인 완료');
      setIsVerified(true);
    }, 500);
  };

  const handleNext = () => {
    if (step === 'input') {
      // input 단계에서 reset 단계로
      if (!userId.trim() || !phoneNumber.trim() || !verificationCode.trim()) {
        alert('모든 항목을 입력해주세요.');
        return;
      }
      if (!isVerified) {
        alert('휴대폰 인증을 완료해주세요.');
        return;
      }

      // 비밀번호 재설정 인증
      verifyPasswordResetMutation.mutate(
        {
          username: userId.trim(),
          phone: phoneNumber.trim(),
          verificationCode: verificationCode.trim(),
        },
        {
          onSuccess: (data) => {
            console.log('비밀번호 재설정 인증 성공:', data);
            const username = data.result?.username || userId;
            setVerifiedUsername(username);
            setStep('reset');
          },
          onError: (error: any) => {
            console.error('비밀번호 재설정 인증 실패:', error);
            const errorMessage =
              error.response?.data?.message || '인증에 실패했습니다.';
            alert(errorMessage);
          },
        }
      );
    } else if (step === 'reset') {
      // reset 단계에서 complete 단계로
      if (!newPassword.trim() || !confirmPassword.trim()) {
        alert('새 비밀번호를 입력해주세요.');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 비밀번호 재설정
      resetPasswordMutation.mutate(
        {
          username: verifiedUsername,
          newPassword: newPassword.trim(),
        },
        {
          onSuccess: (data) => {
            console.log('비밀번호 재설정 성공:', data);
            setStep('complete');
          },
          onError: (error: any) => {
            console.error('비밀번호 재설정 실패:', error);
            const errorMessage =
              error.response?.data?.message ||
              '비밀번호 재설정에 실패했습니다.';
            alert(errorMessage);
          },
        }
      );
    }
  };

  const handleGoToLogin = () => {
    navigate('/personal/login');
  };

  const inputClass =
    'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[2.1rem] bg-white placeholder-[#c2c2c2] text-[1.6rem]';

  // 1단계: 아이디, 전화번호, 인증번호 입력
  if (step === 'input') {
    return (
      <div>
        <input
          className={inputClass}
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          autoComplete="off"
        />

        <input
          className={inputClass}
          placeholder="전화번호를 입력하세요 (예: 01012345678)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          autoComplete="off"
        />

        <div className="mb-[5.9rem]">
          <div className="text-[#747474] font-semibold text-[1.6rem] mb-[2.1rem]">
            인증번호(SMS)
          </div>
          <div className="flex gap-[1.4rem]">
            <input
              className="w-[18.3rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem]"
              placeholder="인증번호를 입력하세요"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              autoComplete="off"
            />
            {!isVerificationSent ? (
              <button
                className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium"
                onClick={handleVerificationSend}
                disabled={sendSMSMutation.isPending || !phoneNumber.trim()}
              >
                {sendSMSMutation.isPending ? '발송 중...' : '인증하기'}
              </button>
            ) : (
              <button
                className={`w-[9.6rem] rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium transition-all duration-200 ${
                  isVerified
                    ? 'bg-[#ECF6F2] text-black border-[1.3px] border-[#08D485]'
                    : 'bg-[#08D485] text-black hover:bg-[#07C078] active:bg-[#06B56D]'
                }`}
                onClick={handleVerifyCode}
                disabled={!verificationCode.trim() || isVerified}
              >
                {isVerified ? '인증완료' : '확인'}
              </button>
            )}
          </div>
          {isVerificationSent && !isVerified && (
            <div className="w-[29.4rem] mb-4 flex flex-col items-end mt-[0.8rem]">
              <p className="text-[#08D485] text-[1.4rem] font-medium mb-2 text-right">
                {isKakaoUser
                  ? '카카오톡으로 로그인해주세요'
                  : '인증번호를 받지 못한 경우 한 번 더 눌러주세요'}
              </p>
              {!isKakaoUser && (
                <button
                  className="bg-gray-200 text-gray-700 rounded-[6px] px-[1.2rem] py-[0.8rem] text-[1.2rem] font-medium"
                  onClick={handleVerificationSend}
                  disabled={sendSMSMutation.isPending}
                >
                  {sendSMSMutation.isPending
                    ? '재전송 중...'
                    : '인증번호 재전송'}
                </button>
              )}
            </div>
          )}
        </div>

        <NextButton
          onClick={handleNext}
          disabled={verifyPasswordResetMutation.isPending || !isVerified}
        >
          {verifyPasswordResetMutation.isPending ? '인증 중...' : '인증 완료'}
        </NextButton>
      </div>
    );
  }

  // 2단계: 비밀번호 재설정
  if (step === 'reset') {
    return (
      <div>
        <div className="text-[#747474] font-semibold text-[1.6rem] mb-[2.3rem] ml-[1.3rem]">
          비밀번호를 재설정 해주세요
        </div>

        <div className="relative mb-[9.1rem]">
          <input
            className={inputClass}
            placeholder="새로운 비밀번호를 입력하세요"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <input
            className={inputClass}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          {newPassword &&
            confirmPassword &&
            newPassword !== confirmPassword && (
              <div className="text-red-500 text-[1.4rem] mt-[-1.5rem] mb-[1rem]">
                비밀번호가 일치하지 않습니다.
              </div>
            )}
        </div>

        <NextButton
          onClick={handleNext}
          disabled={
            resetPasswordMutation.isPending || !newPassword || !confirmPassword
          }
        >
          {resetPasswordMutation.isPending ? '저장 중...' : '저장'}
        </NextButton>
      </div>
    );
  }

  // 3단계: 완료
  return (
    <div className="flex flex-col items-center mb-[3.1rem]">
      <div className="flex flex-col items-center justify-center mb-[1.1rem] w-[27rem] h-[12.2rem] border border-[#08D485] rounded-[0.8rem] p-6 text-center">
        <p className="text-[1.6rem] text-[#747474] font-semibold">
          비밀번호가 재설정 되었습니다 <br /> 로그인 해주세요
        </p>
      </div>

      <NextButton onClick={handleGoToLogin}>로그인 하기</NextButton>
    </div>
  );
};

export default PasswordFind;
