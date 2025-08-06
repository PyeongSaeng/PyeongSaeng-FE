import React, { useState } from 'react';
import SignUpHeader from '../SignUpHeader';
import NextButton from '../NextButton';
import {
  useSendVerificationCode,
  useVerifyCode,
} from '../../../../hooks/useAuth';

type Step1State = {
  carrier: string;
  name: string;
  phone: string;
  smsCode: string;
};

type CareStep1Props = {
  state: Step1State;
  setState: React.Dispatch<React.SetStateAction<Step1State>>;
  onNext: () => void;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-3 bg-white placeholder-[#BDBDBD] text-[1.6rem]';
const selectClass =
  'h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white text-[#BDBDBD] text-[1.6rem]';

const CareStep1 = ({ state, setState, onNext }: CareStep1Props) => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const sendVerificationMutation = useSendVerificationCode();
  const verifyCodeMutation = useVerifyCode();

  const handleSendVerification = () => {
    if (!state.phone) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    sendVerificationMutation.mutate(
      { phone: state.phone },
      {
        onSuccess: () => {
          alert(
            '인증번호가 발송되었습니다. 문자가 오지 않으면 한 번 더 눌러주세요.'
          );
          setIsVerificationSent(true);
        },
        onError: (error) => {
          console.error('인증번호 발송 실패:', error);
          alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  const handleVerifyCode = () => {
    if (!state.smsCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    verifyCodeMutation.mutate(
      {
        phone: state.phone,
        verificationCode: state.smsCode,
      },
      {
        onSuccess: () => {
          alert('인증이 완료되었습니다.');
          setIsVerified(true);
        },
        onError: (error) => {
          console.error('인증 실패:', error);
          alert('인증번호가 올바르지 않습니다.');
        },
      }
    );
  };

  const handleNext = () => {
    if (!state.name || !state.phone) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center w-full pt-[0.4rem] px-[1.2rem]">
      <SignUpHeader title="회원가입 하기" />

      <input
        className={`${inputClass} w-[29.4rem] mb-[2.1rem] ${state.name ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="본인 이름을 입력하세요"
        value={state.name}
        onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
      />
      <input
        className={`${inputClass} w-[29.4rem] ${state.phone ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="본인 전화번호를 입력하세요"
        value={state.phone}
        onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
      />
      <div className="w-[29.4rem] text-left font-semibold text-[#747474] text-[1.6rem] mb-[2.1rem] mt-[3.6rem]">
        인증번호(SMS)
      </div>
      <div className="w-[29.4rem] flex gap-[1.4rem] mb-3">
        <input
          className={`w-[18.3rem] ${selectClass} mb-0 ${state.smsCode ? 'text-black' : 'text-[#BDBDBD]'}`}
          placeholder="인증번호를 입력하세요"
          value={state.smsCode}
          onChange={(e) => setState((s) => ({ ...s, smsCode: e.target.value }))}
          disabled={!isVerificationSent}
        />
        {!isVerificationSent ? (
          <button
            className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium"
            onClick={handleSendVerification}
            disabled={sendVerificationMutation.isPending || !state.phone}
          >
            {sendVerificationMutation.isPending ? '발송 중...' : '인증하기'}
          </button>
        ) : (
          <button
            className={`w-[9.6rem] rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium transition-all duration-200 ${
              isVerified
                ? 'bg-[#08D485] text-black hover:bg-[#07C078] active:bg-[#06B56D]'
                : 'bg-[#ECF6F2] text-black border-[1.3px] border-[#08D485]'
            }`}
            onClick={handleVerifyCode}
            disabled={
              verifyCodeMutation.isPending || !state.smsCode || isVerified
            }
          >
            {verifyCodeMutation.isPending
              ? '확인 중...'
              : isVerified
                ? '인증완료'
                : '확인'}
          </button>
        )}
      </div>
      {isVerificationSent && !isVerified && (
        <div className="w-[29.4rem] mb-4">
          <p className="text-[#08D485] text-[1.4rem] font-medium mb-2">
            인증번호를 받지 못한 경우 한 번 더 눌러주세요
          </p>
          <button
            className="bg-gray-200 text-gray-700 rounded-[6px] px-[1.2rem] py-[0.8rem] text-[1.2rem] font-medium"
            onClick={handleSendVerification}
            disabled={sendVerificationMutation.isPending}
          >
            {sendVerificationMutation.isPending
              ? '재전송 중...'
              : '인증번호 재전송'}
          </button>
        </div>
      )}
      <NextButton onClick={handleNext}>다음</NextButton>
    </div>
  );
};

export default CareStep1;
