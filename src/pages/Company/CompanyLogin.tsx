import { useState } from 'react';
import LoginLogo from '/icons/loginLogo.svg';
import { useNavigate } from 'react-router-dom';
import TopbarForLogin from '../../shared/components/topbar/TopbarForLogin';
import { useCompanyLogin } from './hooks/useCompanyAuth';

const CompanyLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const companyLoginMutation = useCompanyLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    companyLoginMutation.mutate(
      { username, password },
      {
        onError: () => {
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  const handleSignIn = () => {
    navigate('/company/join');
  };

  const handleFindAccount = () => {
    navigate('/company/find-account');
  };

  return (
    <TopbarForLogin>
      <div className="flex flex-col items-center w-full mt-[6rem]">
        <img
          src={LoginLogo}
          alt="평생 로고"
          className="w-[212px] h-[117px] mb-[2.4rem]"
        />

        {/* 입력 폼 */}
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`mb-[1.9rem] w-[270px] h-[45px] rounded-[8px] font-medium border border-[#e1e1e1] text-[1.6rem] px-[13px] py-[16px] focus:outline-black ${username ? 'text-black' : 'text-[#C2C2C2]'}`}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-[1.9rem] w-[270px] h-[45px] rounded-[8px] font-medium border border-[#e1e1e1] text-[1.6rem] px-[13px] py-[16px] focus:outline-black ${password ? 'text-black' : 'text-[#C2C2C2]'}`}
          />
          <button
            type="submit"
            disabled={companyLoginMutation.isPending}
            className="w-[270px] bg-[#0D29B7] text-white text-[16px] py-[12px] rounded-[8px] mt-[1.1rem] mb-[3rem] shadow transition disabled:opacity-50"
          >
            {companyLoginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 안내문구  */}
        <div className="flex flex-col">
          <p className="text-[#747474] text-[1.6rem] mb-[1.2rem]">
            비밀번호를 잊어버리셨나요?
          </p>
          <button
            className="w-[270px] border-[1.3px] border-[#0D29B7] text-black text-[16px] py-[12px] rounded-[8px] mb-[3rem]"
            onClick={handleFindAccount}
          >
            아이디/비밀번호 찾기
          </button>
        </div>

        {/* 회원가입 */}
        <button
          className="w-[320px] text-[#6E6E6E] text-[1.6rem] underline text-right mr-[3.9rem] mt-2"
          onClick={handleSignIn}
        >
          회원가입
        </button>
      </div>
    </TopbarForLogin>
  );
};

export default CompanyLoginPage;
