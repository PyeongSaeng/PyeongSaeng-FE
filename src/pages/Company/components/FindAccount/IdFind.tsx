import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../../../Personal/components/user/signIn/NextButton';
import { IdFindResult } from '../../types/company';

const IdFind = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showResult, setShowResult] = useState(false);

  // 타입으로 관리되는 아이디 찾기 결과
  const [idFindResult, setIdFindResult] = useState<IdFindResult>({
    userName: '최은서',
    userId: 'es2024',
  });

  const handleVerificationSend = () => {
    // 인증번호 전송 로직
    console.log('인증번호 전송');
  };

  const handleIdFind = () => {
    // 아이디 찾기 완료
    // TODO: 실제 API 호출 시 응답 데이터로 setIdFindResult 업데이트
    setShowResult(true);
  };

  const handleGoToLogin = () => {
    navigate('/company/login');
  };

  const inputClass =
    'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[2.1rem] bg-white placeholder-[#c2c2c2] text-[1.6rem]';

  if (showResult) {
    return (
      <div className="flex flex-col items-center mb-[3.1rem]">
        <div className="flex flex-col items-center justify-center mb-[1.1rem] w-[27rem] h-[12.2rem] border border-[#0D29B7] rounded-[0.8rem] p-6 text-center">
          <p className="text-[1.6rem] text-[#747474] mb-2">
            {idFindResult.userName} 님이 가입하신 아이디는{' '}
            <span className="text-[1.8rem] font-semibold text-[#08D485]">
              {idFindResult.userId}
            </span>{' '}
            입니다.
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
  }

  return (
    <div>
      <input
        className={inputClass}
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      <NextButton className="!bg-[#0D29B7] text-white" onClick={handleIdFind}>
        인증 완료
      </NextButton>
    </div>
  );
};

export default IdFind;
