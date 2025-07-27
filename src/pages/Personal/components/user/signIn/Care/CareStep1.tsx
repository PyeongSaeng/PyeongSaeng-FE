import React from 'react';
import SignUpHeader from '../SignUpHeader';
import NextButton from '../NextButton';

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
  return (
    <div className="flex flex-col items-center w-full pt-8 px-[3.3rem]">
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
        />
        <button className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium">
          인증하기
        </button>
      </div>
      <NextButton onClick={onNext}>다음</NextButton>
    </div>
  );
};

export default CareStep1;
