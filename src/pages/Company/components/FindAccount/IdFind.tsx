import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NextButton from '../../../Personal/components/user/signIn/NextButton';
import { IdFindResult } from '../../types/findAccount';
import {
  useSendCompanyVerificationCode,
  useFindUsername,
} from '../../hooks/useCompanyAuth';

const IdFind = () => {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [idFindResult, setIdFindResult] = useState<IdFindResult | null>(null);

  const sendVerificationCodeMutation = useSendCompanyVerificationCode();
  const findUsernameMutation = useFindUsername();

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

  const handleIdFind = () => {
    if (!ownerName.trim() || !phone.trim() || !verificationCode.trim()) {
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }

    if (!isVerificationSent) {
      toast.warning('인증번호를 발송해주세요.');
      return;
    }

    const requestData = {
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      verificationCode: verificationCode.trim(),
    };

    findUsernameMutation.mutate(requestData, {
      onSuccess: (data) => {
        const result = data.result || data.data;
        if (result) {
          setIdFindResult({
            userName: result.userName || result.ownerName || ownerName,
            userId: result.userId || result.username || result.id,
          });
          setShowResult(true);
        } else {
          toast.error('아이디를 찾을 수 없습니다.');
        }
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          '아이디 찾기 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      },
    });
  };

  const handleGoToLogin = () => {
    navigate('/company/login');
  };

  const inputClass =
    'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[2.1rem] bg-white placeholder-[#c2c2c2] text-[1.6rem]';

  // 아이디 찾기 결과 표시
  if (showResult && idFindResult) {
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
        placeholder="사업자명을 입력하세요"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
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
            onClick={handleVerificationSend}
            disabled={
              sendVerificationCodeMutation.isPending ||
              !phone.trim() ||
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
        onClick={handleIdFind}
        disabled={findUsernameMutation.isPending}
      >
        {findUsernameMutation.isPending ? '찾는 중...' : '인증 완료'}
      </NextButton>
    </div>
  );
};

export default IdFind;
