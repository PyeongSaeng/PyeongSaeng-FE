import { useNavigate } from 'react-router-dom';
import SignUpHeader from './SignUpHeader';

const SignIn = () => {
  const navigate = useNavigate();

  const goToSeniorSignIn = () => {
    navigate('/join/senior');
  };
  const goToCareSignIn = () => {
    navigate('/join/guardian');
  };

  return (
    <div className="flex flex-col items-center w-full pt-12 mt-[148px]">
      <SignUpHeader title="회원가입 하기" />

      {/* 회원가입 선택 버튼 */}
      <div className="flex flex-col gap-[1.5rem] w-full items-center mb-8">
        <button
          onClick={goToSeniorSignIn}
          className="w-[270px] h-[122px] py-[1.2rem] flex items-center justify-center border-1 border-[#08D485] rounded-[8px] text-black text-[1.6rem] font-medium active:bg-[#DAF4EA]"
        >
          어르신 회원가입
        </button>
        <button
          onClick={goToCareSignIn}
          className="w-[270px] h-[122px] py-[1.2rem] flex items-center justify-center border-1 border-[#08D485] rounded-[8px] text-black text-[1.6rem] font-medium active:bg-[#DAF4EA]"
        >
          보호자 케어 회원가입
        </button>
      </div>

      {/* 안내문구 */}
      <div className=" text-[#747474] text-[1.6rem] font-semibold text-start ml-[1.2rem]">
        <p className="mb-2">
          보호자 케어 회원가입은
          <br />
          보호자 본인 회원가입 후<br />
          연속적으로 어르신 회원가입을 진행합니다.
        </p>
        <p>
          회원가입 도중
          <br />
          어르신 SMS로 전송된 인증번호를 안내받기 위해
          <br />
          어르신과 연락이 가능한 상태에서 진행해주세요.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
