import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../shared/components/topbar/Topbar';

const PersonalDeleteAccount = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (value === '탈퇴하겠습니다') {
      e.preventDefault();
      // post
      navigate('/personal/my/delete-account/done');
    }
  };

  return (
    <div className="font-[pretendard JP]">
      <Topbar>
        <div className="text-[#747474] font-[600] text-[16px]">
          <div className="flex justify-center items-center text-[20px] border-b-[0.8px] border-[#D9D9D9] py-[10px]">
            회원 탈퇴
          </div>
          <div className="py-[14px] leading-[2]">
            탈퇴 시 어르신/보호자 계정 간 연결이 끊어집니다
            <br />
            탈퇴를 원하시면 다음 문구를 입력해주세요
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-[60px] py-[10px]"
          >
            <input
              type="text"
              className="w-[294px] h-[45px] px-[16px] py-[13px] border-[1px] border-[#E1E1E1] rounded-[8px] font-[pretendard] font-[500] placeholder:text-[#C2C2C2]"
              placeholder="탈퇴하겠습니다"
              value={value}
              onChange={handleChange}
            ></input>
            <button
              type="submit"
              className="w-[293px] h-[45px] bg-[#08D485] rounded-[8px] text-black font-[500]"
            >
              회원탈퇴하기
            </button>
          </form>
        </div>
      </Topbar>
    </div>
  );
};

export default PersonalDeleteAccount;
