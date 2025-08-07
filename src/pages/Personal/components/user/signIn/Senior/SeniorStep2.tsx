import React, { useState } from 'react';
import NextButton from '../NextButton';
import SignUpHeader from '../SignUpHeader';
import { useCheckUsername } from '../../../../hooks/useAuth';

type Step2State = {
  id: string;
  idCheck: string;
  isIdAvailable: boolean;
  password: string | null;
  passwordConfirm: string | null;
};

type SeniorStep2Props = {
  state: Step2State;
  setState: React.Dispatch<React.SetStateAction<Step2State>>;
  onNext: () => void;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-3 bg-white placeholder-[#C2C2C2] text-[1.6rem]';

const SeniorStep2 = ({ state, setState, onNext }: SeniorStep2Props) => {
  const [usernameMessage, setUsernameMessage] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  const checkUsernameMutation = useCheckUsername();

  // 아이디 중복 확인
  const handleCheckUsername = () => {
    if (!state.idCheck.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }

    checkUsernameMutation.mutate(state.idCheck, {
      onSuccess: (data: any) => {
        setHasChecked(true);

        const isAvailable = data.result && data.result.includes('사용 가능한');

        if (isAvailable) {
          setState((s) => ({ ...s, id: state.idCheck, isIdAvailable: true }));
          setUsernameMessage('사용 가능한 아이디입니다.');
        } else {
          setState((s) => ({ ...s, isIdAvailable: false }));
          setUsernameMessage('이미 사용 중인 아이디입니다.');
        }
      },
      onError: () => {
        setHasChecked(true);
        setState((s) => ({ ...s, isIdAvailable: false }));
        setUsernameMessage('이미 사용 중인 아이디입니다.');
      },
    });
  };

  // 아이디 입력 변경
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({ ...s, idCheck: e.target.value, isIdAvailable: false }));
    setUsernameMessage('');
    setHasChecked(false);
  };

  const handleNext = () => {
    if (!state.idCheck || !state.password || !state.passwordConfirm) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (state.password !== state.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!state.isIdAvailable) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    onNext();
  };

  // 메시지 색상을 isIdAvailable로 결정
  const getMessageStyle = () => {
    if (!hasChecked) return 'text-[#c2c2c2]';
    return state.isIdAvailable ? 'text-[#08D485]' : 'text-red-500';
  };

  const getDefaultMessage = () => {
    return usernameMessage;
  };

  return (
    <div className="flex flex-col items-center w-full pt-[0.4rem] px-[3.3rem]">
      <SignUpHeader title="회원가입 하기" />
      <div className="w-[29.4rem]">
        <p className="text-[#747474] mb-[2.3rem] text-[1.6rem] font-semibold">
          회원가입을 위해 필수정보를 입력해주세요
        </p>
        <div className="flex gap-2 mt-[0.9rem] mb-1">
          <input
            className={`${inputClass} ${state.idCheck ? 'text-black' : 'text-[#C2C2C2]'}`}
            placeholder="아이디를 입력해주세요"
            value={state.idCheck}
            onChange={handleUsernameChange}
          />
          <button
            className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium h-[4.5rem]"
            onClick={handleCheckUsername}
            disabled={checkUsernameMutation.isPending || !state.idCheck.trim()}
          >
            {checkUsernameMutation.isPending ? '확인 중...' : '중복 확인'}
          </button>
        </div>
        <div
          className={`text-[1.4rem] mb-[2.2rem] mt-[0.6rem] ml-[0.9rem] ${getMessageStyle()}`}
        >
          {getDefaultMessage()}
        </div>
        <input
          className={`${inputClass} ${state.password ? 'text-black' : 'text-[#C2C2C2]'}`}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={state.password || ''}
          onChange={(e) =>
            setState((s) => ({ ...s, password: e.target.value }))
          }
        />
        <input
          className={`${inputClass} ${state.passwordConfirm ? 'text-black' : 'text-[#C2C2C2]'}`}
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          value={state.passwordConfirm || ''}
          onChange={(e) =>
            setState((s) => ({ ...s, passwordConfirm: e.target.value }))
          }
        />
        {state.password &&
          state.passwordConfirm &&
          state.password !== state.passwordConfirm && (
            <div className="text-red-500 text-[1.4rem] mt-[-0.5rem] mb-[1rem] ml-[0.9rem]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
      </div>
      <NextButton onClick={handleNext}>다음</NextButton>
    </div>
  );
};

export default SeniorStep2;
