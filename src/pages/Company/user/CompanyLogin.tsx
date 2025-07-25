import { useState } from 'react';
import LoginLogo from '/icons/loginLogo.svg';

const CompanyLoginPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  return (
    <div className="flex flex-col items-center w-full pt-12">
      <img
        src={LoginLogo}
        alt="평생 로고"
        className="w-[212px] h-[117px] mb-[2.4rem]"
      />

      {/* 입력 폼 */}
      <form className="flex flex-col items-center w-full">
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
        <button className="w-[270px] bg-[#0D29B7] text-white text-[16px] py-[12px] rounded-[8px] mb-[3rem] shadow transition">
          로그인
        </button>
      </form>

      {/* 안내문구 및 보조버튼 */}
      <div className="flex flex-col">
        <p className="text-[#747474] text-[1.6rem] mb-[1.2rem]">
          비밀번호를 잊어버리셨나요?
        </p>
        <button className="w-[270px] border-[1.3px] border-[#0D29B7] text-black text-[16px] py-[12px] rounded-[8px] mb-[26px]">
          아이디/비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default CompanyLoginPage;
