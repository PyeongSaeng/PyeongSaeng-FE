import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../../../Personal/components/user/signIn/NextButton';

type PasswordStep = 'input' | 'reset' | 'complete';

const PasswordFind = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<PasswordStep>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (step === 'input') {
      setStep('reset');
    } else if (step === 'reset') {
      setStep('complete');
    }
  };

  const handleVerificationSend = () => {
    // 인증번호 전송 로직
    console.log('인증번호 전송');
  };

  const handleGoToLogin = () => {
    navigate('/personal/login');
  };

  const inputClass =
    'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[2.1rem] bg-white placeholder-[#c2c2c2] text-[1.6rem]';

  // 1단계: 아이디 입력
  if (step === 'input') {
    return (
      <div>
        <input
          className={inputClass}
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          className={inputClass}
          placeholder="전화번호를 입력하세요"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
            />
            <button
              className="bg-[#0D29B7] w-[9.6rem] text-white rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium whitespace-nowrap"
              onClick={handleVerificationSend}
            >
              인증번호 전송
            </button>
          </div>
        </div>

        <NextButton className="!bg-[#0D29B7] text-white" onClick={handleNext}>
          인증 완료
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <NextButton className="!bg-[#0D29B7] text-white" onClick={handleNext}>
          저장
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
