import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../signIn/NextButton';
import { IdFindResult } from '../../../types/user';
import { useSendAccountSMS, useFindUsername } from '../../../hooks/useAuth';

const IdFind = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [idFindResult, setIdFindResult] = useState<IdFindResult | null>(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const sendSMSMutation = useSendAccountSMS();
  const findUsernameMutation = useFindUsername();

  const state = {
    phone: phoneNumber,
    smsCode: verificationCode,
  };

  const handleSendVerification = () => {
    if (!phoneNumber.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    // 전화번호 형식 검증 (간단한 검증)
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phoneNumber.replace(/-/g, ''))) {
      alert('올바른 전화번호 형식을 입력해주세요.');
      return;
    }

    sendSMSMutation.mutate(
      { phone: phoneNumber },
      {
        onSuccess: (data) => {
          console.log('SMS 발송 성공:', data);
          alert('인증번호가 발송되었습니다.');
          setIsVerificationSent(true);
        },
        onError: (error) => {
          console.error('SMS 발송 실패:', error);
          alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  // 가짜 인증 확인
  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    setTimeout(() => {
      setIsVerified(true);
    }, 500);
  };

  const handleIdFind = () => {
    if (!name.trim() || !phoneNumber.trim() || !verificationCode.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (!isVerified) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }

    const requestData = {
      name: name.trim(),
      phone: phoneNumber.trim(),
      verificationCode: verificationCode.trim(),
    };

    findUsernameMutation.mutate(requestData, {
      onSuccess: (data) => {
        const result = data.result || data.data;
        if (result) {
          setIdFindResult({
            userName: result.userName || result.name || name,
            userId: result.userId || result.username || result.id,
          });
          setShowResult(true);
        } else {
          alert('아이디를 찾을 수 없습니다.');
        }
      },
    });
  };

  const handleGoToLogin = () => {
    navigate('/personal/login');
  };

  const inputClass =
    'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[2.1rem] bg-white placeholder-[#c2c2c2] text-[1.6rem]';

  if (showResult && idFindResult) {
    return (
      <div className="flex flex-col items-center mb-[3.1rem]">
        <div className="flex flex-col items-center justify-center mb-[1.1rem] w-[27rem] h-[12.2rem] border border-[#08D485] rounded-[0.8rem] p-6 text-center">
          <p className="text-[1.6rem] text-[#747474] mb-2">
            {idFindResult.userName} 님이 가입하신 아이디는{' '}
            <span className="text-[1.8rem] font-semibold text-[#0D29B7]">
              {idFindResult.userId}
            </span>{' '}
            입니다.
          </p>
        </div>

        <NextButton onClick={handleGoToLogin}>로그인 하기</NextButton>
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
        autoComplete="off"
      />

      <input
        className={inputClass}
        placeholder="전화번호를 입력하세요"
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
              onClick={handleSendVerification}
              disabled={sendSMSMutation.isPending || !state.phone}
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
              disabled={!state.smsCode || isVerified}
            >
              {isVerified ? '인증완료' : '확인'}
            </button>
          )}
        </div>
        {isVerificationSent && !isVerified && (
          <div className="w-[29.4rem] mb-4 flex flex-col items-end mt-[0.8rem]">
            <p className="text-[#08D485] text-[1.4rem] font-medium mb-2 text-right">
              인증번호를 받지 못한 경우 한 번 더 눌러주세요
            </p>
            <button
              className="bg-gray-200 text-gray-700 rounded-[6px] px-[1.2rem] py-[0.8rem] text-[1.2rem] font-medium"
              onClick={handleSendVerification}
              disabled={sendSMSMutation.isPending}
            >
              {sendSMSMutation.isPending ? '재전송 중...' : '인증번호 재전송'}
            </button>
          </div>
        )}
      </div>

      <NextButton
        onClick={handleIdFind}
        disabled={findUsernameMutation.isPending || !isVerified}
      >
        {findUsernameMutation.isPending ? '찾는 중...' : '인증 완료'}
      </NextButton>
    </div>
  );
};

export default IdFind;
