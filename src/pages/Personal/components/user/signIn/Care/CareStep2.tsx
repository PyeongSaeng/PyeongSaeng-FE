import React, { useState } from 'react';
import { toast } from 'react-toastify';
import NextButton from '../NextButton';
import SignUpHeader from '../SignUpHeader';
import { useCheckUsername } from '../../../../hooks/useAuth';

type Step2State = {
  id: string;
  idCheck: string;
  isIdAvailable: boolean;
  password: string;
  passwordConfirm: string;
  phone: string;
};

type CareStep2Props = {
  state: Step2State;
  setState: React.Dispatch<React.SetStateAction<Step2State>>;
  onNext: () => void;
  isFromKakao?: boolean;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-3 bg-white placeholder-[#BDBDBD] text-[1.6rem]';

const CareStep2 = ({
  state,
  setState,
  onNext,
  isFromKakao = false,
}: CareStep2Props) => {
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
        setUsernameMessage('이미 사용중인 아이디입니다.');
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
    if (isFromKakao) {
      // 카카오 가입: 전화번호만 필수
      if (!state.phone) {
        toast.warning('전화번호를 입력해주세요.');
        return;
      }
    } else {
      // 일반 가입: 모든 필드 필수
      if (!state.idCheck || !state.password || !state.passwordConfirm) {
        toast.warning('모든 항목을 입력해주세요.');
        return;
      }
      if (state.password !== state.passwordConfirm) {
        toast.error('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!state.isIdAvailable) {
        toast.warning('아이디 중복 확인을 해주세요.');
        return;
      }
    }
    onNext();
  };

  const getMessageStyle = () => {
    if (!hasChecked) return 'text-[#BDBDBD]';
    return state.isIdAvailable ? 'text-[#08D485]' : 'text-red-500';
  };

  const getDefaultMessage = () => {
    if (isFromKakao) {
      return '카카오 계정으로 자동 설정되었습니다.';
    }
    return usernameMessage;
  };

  return (
    <div className="flex flex-col items-center w-full px-[3.3rem]">
      <SignUpHeader title="회원가입 하기" />
      <div className="w-[29.4rem]">
        <p className="text-[#747474] mb-[2.3rem] text-[1.6rem] font-semibold">
          회원가입을 위해 필수정보를 입력해주세요
        </p>

        {/* 카카오 안내 메시지 */}
        {isFromKakao && (
          <div className="mb-4 p-3 bg-[#DAF4EA] border border-[#08D485] rounded-[5px]">
            <p className="text-black text-sm text-center">
              카카오 계정 정보가 자동으로 연동되었습니다.
              <br />
              전화번호만 추가로 입력해주세요.
            </p>
          </div>
        )}

        {/* 아이디 입력 및 중복확인 */}
        <div className="flex gap-2 mt-[1.6rem] mb-1">
          <input
            className={`${inputClass} ${
              isFromKakao
                ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                : state.idCheck
                  ? 'text-black'
                  : 'bg-[#BDBDBD]'
            }`}
            placeholder="(영어)본인 아이디를 입력해주세요"
            value={isFromKakao ? '••••' : state.idCheck}
            onChange={handleUsernameChange}
            disabled={isFromKakao}
            readOnly={isFromKakao}
          />
          <button
            className={`w-[9.6rem] text-black rounded-[8px] py-[1.2rem] text-[1.4rem] font-medium h-[4.5rem] ${
              isFromKakao
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#08D485] hover:bg-[#07C078]'
            }`}
            onClick={handleCheckUsername}
            disabled={
              isFromKakao ||
              checkUsernameMutation.isPending ||
              !state.idCheck.trim()
            }
          >
            {isFromKakao
              ? ''
              : checkUsernameMutation.isPending
                ? '확인 중...'
                : '중복 확인'}
          </button>
        </div>
        <div
          className={`text-[1.4rem] mb-[2.2rem] mt-[0.6rem] ml-[0.9rem] ${
            isFromKakao ? 'text-[#08D485]' : getMessageStyle()
          }`}
        >
          {getDefaultMessage()}
        </div>

        {/* 비밀번호 입력 */}
        <input
          className={`${inputClass} ${
            isFromKakao
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
              : state.password
                ? 'text-black'
                : 'text-[#BDBDBD]'
          }`}
          placeholder={
            isFromKakao
              ? '카카오 로그인 사용 (비밀번호 불필요)'
              : '비밀번호를 입력해주세요'
          }
          type="password"
          value={isFromKakao ? '••••••••' : state.password}
          onChange={(e) =>
            setState((s) => ({ ...s, password: e.target.value }))
          }
          disabled={isFromKakao}
          readOnly={isFromKakao}
        />
        <input
          className={`${inputClass} ${
            isFromKakao
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
              : state.passwordConfirm
                ? 'text-black'
                : 'text-[#BDBDBD]'
          }`}
          placeholder={
            isFromKakao
              ? '카카오 로그인 사용 (비밀번호 불필요)'
              : '비밀번호를 다시 입력해주세요'
          }
          type="password"
          value={isFromKakao ? '••••••••' : state.passwordConfirm}
          onChange={(e) =>
            setState((s) => ({ ...s, passwordConfirm: e.target.value }))
          }
          disabled={isFromKakao}
          readOnly={isFromKakao}
        />

        {/* 전화번호 입력 (항상 활성화) */}
        <input
          className={`${inputClass} w-[29.4rem] mt-[2.2rem] ${state.phone ? 'text-black' : 'text-[#BDBDBD]'}`}
          placeholder="전화번호를 입력하세요"
          value={state.phone}
          onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
        />

        {/* 비밀번호 불일치 메시지 (일반 가입만) */}
        {!isFromKakao &&
          state.password &&
          state.passwordConfirm &&
          state.password !== state.passwordConfirm && (
            <div className="text-red-500 text-[1.4rem] mt-[-0.5rem] mb-[1rem] ml-[0.9rem]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
      </div>
      <NextButton onClick={handleNext}>
        {isFromKakao ? '보호자 가입 완료' : '다음'}
      </NextButton>
    </div>
  );
};

export default CareStep2;
