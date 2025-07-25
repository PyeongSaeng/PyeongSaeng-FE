import { useState } from 'react';
import LoginLogo from '/icons/loginLogo.svg';
import { useNavigate } from 'react-router-dom';
import LoginPage from './Login';

const LoginMainPage = () => {
  const [view, setView] = useState<'main' | 'id'>('main');
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/personal/join');
  };

  if (view === 'id') {
    return <LoginPage />;
  }
  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <img
        src={LoginLogo}
        alt="평생 로고"
        className="w-[212px] h-[117px] mr-4 mb-[7.2rem]"
      />

      {/* 아이디로 로그인 버튼 */}
      <button
        className="w-[270px] bg-[#08D485] text-black text-[16px] py-[12px] rounded-[8px] mb-[26px]"
        onClick={() => setView('id')}
      >
        아이디로 로그인
      </button>

      {/* 카카오톡으로 로그인 버튼 */}
      <button className="w-[270px] bg-[#FEE500] text-[#130909] text-[16px] py-[13px] rounded-[8px] flex items-center justify-center gap-3 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-[17px]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.123 4.354c-1.766-1.636-4.473-2.653-7.607-2.653-6.093 0-11.018 4.02-11.018 8.974 0 2.828 1.639 5.355 4.168 6.982v3.689l3.813-2.094c.982.137 1.996.209 3.037.209 6.093 0 11.018-4.02 11.018-8.974 0-2.549-1.196-4.86-3.411-6.133z" />
        </svg>
        카카오톡으로 로그인
      </button>

      {/* 회원가입 */}
      <button
        className="w-[320px] text-[#6E6E6E] text-[1.6rem] underline text-right mr-[3.9rem] mt-2"
        onClick={handleSignIn}
      >
        회원가입
      </button>
    </div>
  );
};

export default LoginMainPage;
