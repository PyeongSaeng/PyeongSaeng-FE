import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';

const SeniorInfo = () => {
  const [answers, setAnswers] = useState<(string | null)[]>([
    '1시간 내외',
    '실외',
    '여럿이',
    '교육/강사',
    'C',
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const [btn, setBtn] = useState<'수정' | '저장'>('수정');

  const handleNavigateEdit = () => {
    const currentPath = location.pathname.split('/').pop();

    if (currentPath === 'basic') {
      navigate('/personal/my/info/basic/edit');
    } else if (currentPath === 'extra') {
      navigate('/personal/my/info/extra/edit');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pathArr = location.pathname.split('/');
    const lastPath = pathArr[pathArr.length - 1];
    const prevPath = pathArr[pathArr.length - 2];

    if (lastPath === 'edit' && prevPath === 'basic') {
      navigate('/personal/my/info/basic');
    } else if (lastPath === 'edit' && prevPath === 'extra') {
      navigate('/personal/my/info/extra');
    }
  };

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();

    if (currentPath === 'edit') {
      setBtn('저장');
    } else {
      setBtn('수정');
    }
  }, [location.pathname]);

  return (
    <div>
      <Topbar>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
            <Outlet context={{ answers, setAnswers }} key={location.pathname} />
          </div>
          <button
            type={btn === '수정' ? 'button' : 'submit'}
            className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px] font-[pretendard] font-[400]"
            onClick={btn === '수정' ? handleNavigateEdit : undefined}
          >
            {btn}
          </button>
        </form>
      </Topbar>
    </div>
  );
};

export default SeniorInfo;
