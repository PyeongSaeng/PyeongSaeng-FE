import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Topbar from '../../../../shared/components/topbar/Topbar';

const PersonalInfo = () => {
  const [isClicked, setIsClicked] = useState<'basic' | 'extra'>('basic');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // post
  };

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            개인정보
          </div>
          <div className="flex justify-center items-center gap-[10px] font-[Pretendard JP] font-[500] text-black text-[16px]">
            <NavLink
              to="basic"
              className={({ isActive }) =>
                `flex justify-center items-center w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] 
              ${isActive ? 'bg-[#ECF6F2]' : ''}`
              }
            >
              기본 정보
            </NavLink>
            <NavLink
              to="extra"
              className={({ isActive }) =>
                `flex justify-center items-center w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]
              ${isActive ? 'bg-[#ECF6F2]' : ''}`
              }
            >
              추가 정보
            </NavLink>
          </div>
          <div className="h-[466px]">
            <Outlet />
          </div>
          <button
            type="button"
            className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px] font-[pretendard] font-[400]"
            onClick={() => navigate('/personal/my/info/basic/edit')}
          >
            수정
          </button>
        </div>
      </Topbar>
    </div>
  );
};

export default PersonalInfo;
