import React, { useState } from 'react';
import SignUpHeader from '../SignUpHeader';
import NextButton from '../NextButton';

type Step5State = {
  carrier: string;
  name: string;
  phone: string;
  smsCode: string;
};

type CareStep5Props = {
  state: Step5State;
  setState: React.Dispatch<React.SetStateAction<Step5State>>;
  onSubmit: () => void;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-3 placeholder-[#BDBDBD] text-[1.6rem] font-medium';
const selectClass =
  'h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] text-[#BDBDBD] text-[1.6rem] font-medium';

const CareStep5 = ({ state, setState, onSubmit }: CareStep5Props) => {
  return (
    <div className="flex flex-col items-center w-full pt-[0.4rem] px-[1.1rem] pb-[8rem]">
      <SignUpHeader title="회원가입 하기" />
      <div className="w-full text-left text-[#747474] text-[1.6rem] font-semibold mb-[1.5rem] leading-tight">
        어르신 본인인증을 진행합니다.
        <br />
        어르신의 정보를 입력해주세요.
      </div>

      <input
        className={`${inputClass} w-[29.4rem] mb-[2rem] ${state.name ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="이름을 입력하세요"
        value={state.name}
        onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
      />
      <input
        className={`${inputClass} w-[29.4rem] ${state.phone ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="전화번호를 입력하세요"
        value={state.phone}
        onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
      />
      <div className="w-[29.4rem] text-left font-medium text-[#747474] text-[1.6rem] mb-[2rem] mt-[2rem]">
        인증번호(SMS)
      </div>
      <div className="w-[29.4rem] flex gap-[1.4rem] mb-2">
        <input
          className={`w-[18.3rem] ${selectClass} mb-0 ${state.smsCode ? 'text-black' : 'text-[#BDBDBD]'}`}
          placeholder="인증번호를 입력하세요"
          value={state.smsCode}
          onChange={(e) => setState((s) => ({ ...s, smsCode: e.target.value }))}
        />
        <button className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-semibold">
          인증번호 전송
        </button>
      </div>
      <div className="w-[29.4rem] text-left text-[#01AA42] text-[1.4rem] mt-[0.8rem] mb-6 font-medium">
        어르신께 문자로 온 인증번호를 입력해주세요
      </div>
      <NextButton onClick={onSubmit}>회원가입 완료</NextButton>
    </div>
  );
};

export default CareStep5;
