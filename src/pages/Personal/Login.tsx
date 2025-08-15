import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopbarForLogin from '../../shared/components/topbar/TopbarForLogin';
import { useLogin } from './hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleFindAccount = () => {
    navigate('/personal/find-account');
  };

  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!id || !pw) {
      toast.warning('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    loginMutation.mutate(
      { username: id, password: pw },
      {
        onSuccess: () => {
          toast.success('로그인 성공! 메인 페이지로 이동합니다.');
          navigate('/', { replace: true });
        },
        onError: (error: unknown) => {
          console.error('로그인 실패:', error);
          toast.error('로그인 실패! 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <TopbarForLogin>
      <div className="flex flex-col items-center w-full pt-12">
        {/* 제목 */}
        <h2 className="text-[2rem] font-semibold text-[#747474] text-center mb-4">
          로그인하기
        </h2>
        <div className="w-[320px] border-t border-[#d9d9d9] mb-[2.4rem]" />

        {/* 입력 폼 */}
        <form
          className="flex flex-col items-center w-full"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={`mb-[1.9rem] w-[270px] h-[45px] rounded-[8px] font-medium border border-[#e1e1e1] text-[1.6rem] px-[13px] py-[16px] focus:outline-black ${id ? 'text-black' : 'text-[#C2C2C2]'}`}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={`mb-[3rem] w-[270px] h-[45px] font-medium rounded-[8px] border border-[#e1e1e1] text-[1.6rem] px-[13px] py-[16px] focus:outline-black ${pw ? 'text-black' : 'text-[#C2C2C2]'}`}
          />
          <button
            className="w-[270px] bg-[#08D485] text-black text-[16px] py-[12px] rounded-[8px] mb-[26px] shadow transition"
            onClick={handleLogin}
          >
            로그인
          </button>
        </form>

        {/* 안내문구 및 보조버튼 */}
        <div className="flex flex-col mt-[5.1rem]">
          <p className="text-[#747474] text-[1.6rem] mb-[1.2rem]">
            비밀번호를 잊어버리셨나요?
          </p>
          <button
            type="button"
            className="w-[270px] border-[1.3px] border-[#08D485] text-black text-[16px] py-[12px] rounded-[8px] mb-[26px]"
            onClick={handleFindAccount}
          >
            아이디/비밀번호 찾기
          </button>
        </div>
      </div>
    </TopbarForLogin>
  );
};

export default LoginPage;
