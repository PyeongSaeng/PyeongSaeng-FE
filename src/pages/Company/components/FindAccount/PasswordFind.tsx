import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NextButton from '../../../Personal/components/user/signIn/NextButton';
import {
  useSendCompanyVerificationCode,
  useVerifyPasswordReset,
  useResetPassword,
} from '../../hooks/useCompanyAuth';

type PasswordStep = 'input' | 'reset' | 'complete';

const PasswordFind = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<PasswordStep>('input');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  // hooks
  const sendVerificationCodeMutation = useSendCompanyVerificationCode();
  const verifyPasswordResetMutation = useVerifyPasswordReset();
  const resetPasswordMutation = useResetPassword();

  const handleVerificationSend = () => {
    if (!phone.trim()) {
      toast.warning('전화번호를 입력해주세요.');
      return;
    }

    sendVerificationCodeMutation.mutate(phone, {
      onSuccess: () => {
        setIsVerificationSent(true);
        toast.success('인증번호가 발송되었습니다.');
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          '인증번호 발송 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      },
    });
  };

  const handleVerifyAndNext = () => {
    if (!username.trim() || !phone.trim() || !verificationCode.trim()) {
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }

    if (!isVerificationSent) {
      toast.warning('인증번호를 발송해주세요.');
      return;
    }

    const verifyData = {
      username: username.trim(),
      phone: phone.trim(),
      verificationCode: verificationCode.trim(),
    };

    verifyPasswordResetMutation.mutate(verifyData, {
      onSuccess: () => {
        setStep('reset');
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || '인증에 실패했습니다.';
        toast.error(errorMessage);
      },
    });
  };

  const handlePasswordReset = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.warning('새 비밀번호를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    const resetData = {
      username: username.trim(),
      newPassword: newPassword.trim(),
    };

    resetPasswordMutation.mutate(resetData, {
      onSuccess: () => {
        setStep('complete');
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || '비밀번호 재설정에 실패했습니다.';
        toast.error(errorMessage);
      },
    });
  };

  const handleGoToLogin = () => {
    navigate('/company/login');
  };

  const inputClass =
    'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[2.1rem] bg-white placeholder-[#c2c2c2] text-[1.6rem]';

  // 1단계: 아이디 입력 및 인증
  if (step === 'input') {
    return (
      <div>
        <input
          className={inputClass}
          placeholder="아이디를 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />

        <input
          className={inputClass}
          placeholder="전화번호를 입력하세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
            <button
              className="bg-[#0D29B7] w-[9.6rem] text-white rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium whitespace-nowrap disabled:bg-gray-300 disabled:text-gray-500"
              onClick={handleVerificationSend}
              disabled={
                sendVerificationCodeMutation.isPending ||
                !phone.trim() ||
                isVerificationSent
              }
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
                onClick={handleVerificationSend}
                disabled={sendVerificationCodeMutation.isPending}
              >
                {sendVerificationCodeMutation.isPending
                  ? '재전송 중...'
                  : '인증번호 재전송'}
              </button>
            </div>
          )}
        </div>

        <NextButton
          className="!bg-[#0D29B7] text-white"
          onClick={handleVerifyAndNext}
          disabled={verifyPasswordResetMutation.isPending}
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
          />
          <input
            className={inputClass}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <NextButton
          className="!bg-[#0D29B7] text-white"
          onClick={handlePasswordReset}
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? '저장 중...' : '저장'}
        </NextButton>
      </div>
    );
  }

  // 3단계: 완료
  return (
    <div className="flex flex-col items-center mb-[3.1rem]">
      <div className="flex flex-col items-center justify-center mb-[1.1rem] w-[27rem] h-[12.2rem] border border-[#0D29B7] rounded-[0.8rem] p-6 text-center">
        <p className="text-[1.6rem] text-[#747474] font-semibold">
          비밀번호가 재설정 되었습니다 <br /> 로그인 해주세요
        </p>
      </div>

      <NextButton
        className="!bg-[#0D29B7] text-white"
        onClick={handleGoToLogin}
      >
        로그인 하기
      </NextButton>
    </div>
  );
};

export default PasswordFind;
