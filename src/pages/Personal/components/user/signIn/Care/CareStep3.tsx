import React, { useState } from 'react';
import { toast } from 'react-toastify';
import NextButton from '../NextButton';
import SignUpHeader from '../SignUpHeader';
import { useCheckUsername } from '../../../../hooks/useAuth';

type Step3State = {
  name: string;
  id: string;
  idCheck: string;
  isIdAvailable: boolean;
  password: string;
  passwordConfirm: string;
};

type CareStep3Props = {
  state: Step3State;
  setState: React.Dispatch<React.SetStateAction<Step3State>>;
  onNext: () => void;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.4rem] py-[1.3rem] mb-3 bg-white placeholder-[#c2c2c2] text-[1.6rem] font-bold';

const CareStep3 = ({ state, setState, onNext }: CareStep3Props) => {
  const [usernameMessage, setUsernameMessage] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  const checkUsernameMutation = useCheckUsername();

  const handleCheckUsername = () => {
    if (!state.idCheck.trim()) {
      toast.warning('아이디를 입력해주세요.');
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
      onError: (error: unknown) => {
        console.error('아이디 확인 실패:', error);
        setHasChecked(true);
        setState((s) => ({ ...s, isIdAvailable: false }));
        setUsernameMessage('이미 사용 중인 아이디입니다.');
      },
    });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 영어와 숫자만 허용
    const englishNumberOnlyRegex = /^[a-zA-Z0-9]*$/;

    if (value === '' || englishNumberOnlyRegex.test(value)) {
      setState((s) => ({ ...s, idCheck: value, isIdAvailable: false }));
      setUsernameMessage('');
    } else {
      toast.info('아이디는 영어와 숫자만 사용 가능합니다.');
    }
  };

  const handleNext = () => {
    // 일반 가입: 모든 필드 필수
    if (
      !state.name ||
      !state.idCheck ||
      !state.password ||
      !state.passwordConfirm
    ) {
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }
    if (!state.isIdAvailable) {
      toast.warning('아이디 중복 확인을 완료해주세요.');
      return;
    }
    if (state.password !== state.passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    onNext();
  };

  const getMessageStyle = () => {
    if (!hasChecked) return 'text-[#c2c2c2]';
    return state.isIdAvailable ? 'text-[#08D485]' : 'text-red-500';
  };

  const getDefaultMessage = () => {
    return usernameMessage;
  };

  return (
    <div className="flex flex-col items-center w-full px-[3rem]">
      <SignUpHeader title="회원가입 하기" />
      <div className="w-[30.6rem]">
        <p className="text-[#747474] mb-[2.3rem] text-[1.5rem] font-semibold">
          회원가입을 위해 어르신의 필수정보를 입력해주세요
        </p>

        {/* 이름 입력 */}
        <input
          className={`${inputClass} ${state.name ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="어르신 이름을 입력해주세요"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          autoComplete="off"
        />

        {/* 아이디 입력 및 중복확인 */}
        <div className="flex gap-2 mt-[0.9rem] mb-1">
          <input
            className={`${inputClass} ${state.idCheck ? 'text-black' : 'text-[#c2c2c2]'}`}
            placeholder="어르신의 아이디를 입력해주세요"
            value={state.idCheck}
            onChange={handleUsernameChange}
            autoComplete="off"
          />
          <button
            className="bg-[#08D485] w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-bold h-[4.5rem]"
            onClick={handleCheckUsername}
            disabled={checkUsernameMutation.isPending || !state.idCheck.trim()}
          >
            {checkUsernameMutation.isPending ? '확인 중...' : '확인'}
          </button>
        </div>
        <div
          className={`text-[1.4rem] font-bold mb-[2.2rem] mt-[1.3rem] ${getMessageStyle()}`}
        >
          {getDefaultMessage()}
        </div>

        {/* 비밀번호 입력 */}
        <input
          className={`${inputClass} ${state.password ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={state.password}
          onChange={(e) =>
            setState((s) => ({ ...s, password: e.target.value }))
          }
          autoComplete="new-password"
        />
        <input
          className={`${inputClass} ${state.passwordConfirm ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          value={state.passwordConfirm}
          onChange={(e) =>
            setState((s) => ({ ...s, passwordConfirm: e.target.value }))
          }
          autoComplete="new-password"
        />
        {state.password &&
          state.passwordConfirm &&
          state.password !== state.passwordConfirm && (
            <div className="text-red-500 text-[1.4rem] mt-[-0.5rem] mb-[1rem]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
      </div>
      <NextButton onClick={handleNext}>다음</NextButton>
    </div>
  );
};

export default CareStep3;
