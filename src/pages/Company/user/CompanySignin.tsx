import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../../Personal/user/signIn/NextButton';

type CompanySigninState = {
  companyNumber: string;
  id: string;
  idCheck: string;
  isIdAvailable: boolean;
  password: string;
  passwordConfirm: string;
};

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-[0.7rem] bg-white placeholder-[#BDBDBD] text-[1.6rem]';

const CompanySignin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<CompanySigninState>({
    companyNumber: '',
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
  });

  const handleCompleteSignIn = () => {
    navigate('/company/login');
  };

  return (
    <div className="flex flex-col items-center w-full pt-8 px-[3.3rem]">
      <div className="w-[29.4rem]">
        {/* 사업자 등록 번호 */}
        <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mb-[1rem]">
          사업자 등록 번호
        </div>
        <div className="flex w-full justify-between items-center relative">
          <input
            className="w-[6.6rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem] text-center"
            value={state.companyNumber.split('-')[0] || ''}
            onChange={(e) => {
              const parts = state.companyNumber.split('-');
              parts[0] = e.target.value;
              setState((s) => ({ ...s, companyNumber: parts.join('-') }));
            }}
            maxLength={3}
          />
          <div className="absolute left-[7.1rem] w-[1.5rem] h-[0.1rem] bg-[#929292] top-1/2 transform -translate-y-1/2"></div>
          <input
            className="w-[6.6rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem] text-center"
            value={state.companyNumber.split('-')[1] || ''}
            onChange={(e) => {
              const parts = state.companyNumber.split('-');
              parts[1] = e.target.value;
              setState((s) => ({ ...s, companyNumber: parts.join('-') }));
            }}
            maxLength={2}
          />
          <div className="absolute left-[16rem] w-[1.5rem] h-[0.1rem] bg-[#929292] top-1/2 transform -translate-y-1/2"></div>
          <input
            className="w-[11.4rem] h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] bg-white placeholder-[#BDBDBD] text-[1.6rem] text-center"
            value={state.companyNumber.split('-')[2] || ''}
            onChange={(e) => {
              const parts = state.companyNumber.split('-');
              parts[2] = e.target.value;
              setState((s) => ({ ...s, companyNumber: parts.join('-') }));
            }}
            maxLength={5}
          />
        </div>

        {/* 사업자 계정 생성 */}
        <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mt-[3.8rem] mb-[1rem]">
          사업자 계정 생성
        </div>
        <div className="flex gap-2 mt-[1.6rem] mb-1">
          <input
            className={`${inputClass} ${state.idCheck ? 'text-black' : 'text-[#BDBDBD]'}`}
            placeholder="아이디를 입력해주세요"
            value={state.idCheck}
            onChange={(e) =>
              setState((s) => ({ ...s, idCheck: e.target.value }))
            }
          />
          <button className="bg-[#0D29B7] w-[9.6rem] text-white rounded-[8px] py-[1.2rem] text-[1.6rem] font-medium h-[4.5rem] text-center">
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
          onChange={(e) =>
            setState((s) => ({ ...s, password: e.target.value }))
          }
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
      <NextButton
        onClick={handleCompleteSignIn}
        className="!bg-[#0D29B7] text-white mt-[3.3rem]"
      >
        회원가입
      </NextButton>
    </div>
  );
};

export default CompanySignin;
