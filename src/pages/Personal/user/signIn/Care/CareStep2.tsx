import React from 'react';
import NextButton from '../NextButton';
import SignUpHeader from '../SignUpHeader';

type Step2State = {
  id: string;
  idCheck: string;
  isIdAvailable: boolean;
  password: string;
  passwordConfirm: string;
};

type CareStep2Props = {
  state: Step2State;
  setState: React.Dispatch<React.SetStateAction<Step2State>>;
  onNext: () => void;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-3 bg-white placeholder-[#BDBDBD] text-[1.6rem]';

const CareStep2 = ({ state, setState, onNext }: CareStep2Props) => (
  <div className="flex flex-col items-center w-full pt-8 px-[3.3rem]">
    <SignUpHeader title="회원가입 하기" />
    <div className="w-[29.4rem]">
      <p className="text-[#747474] mb-[2.3rem] text-[1.6rem] font-semibold">
        회원가입을 위해 필수정보를 입력해주세요
      </p>
      <input
        className={`${inputClass} ${state.id ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="아이디를 입력해주세요"
        value={state.id}
        onChange={(e) => setState((s) => ({ ...s, id: e.target.value }))}
      />
      <div className="flex gap-2 mt-[1.6rem] mb-1">
        <input
          className={`${inputClass} ${state.idCheck ? 'text-black' : 'text-[#BDBDBD]'}`}
          placeholder="아이디를 입력해주세요"
          value={state.idCheck}
          onChange={(e) => setState((s) => ({ ...s, idCheck: e.target.value }))}
        />
        <button className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-semibold h-[4.5rem]">
          확인
        </button>
      </div>
      <div className="text-[#08D485] text-[1.4rem] mb-[2.2rem] mt-[1.3rem]">
        쓸 수 있는 아이디입니다
      </div>
      <input
        className={`${inputClass} ${state.password ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={state.password}
        onChange={(e) => setState((s) => ({ ...s, password: e.target.value }))}
      />
      <input
        className={`${inputClass} ${state.passwordConfirm ? 'text-black' : 'text-[#BDBDBD]'}`}
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
        value={state.passwordConfirm}
        onChange={(e) =>
          setState((s) => ({ ...s, passwordConfirm: e.target.value }))
        }
      />
    </div>
    <NextButton onClick={onNext}>다음</NextButton>
  </div>
);

export default CareStep2;
