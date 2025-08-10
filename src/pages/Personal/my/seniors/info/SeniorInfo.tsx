import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import axiosInstance from '../../../../../shared/apis/axiosInstance';
import { Info } from '../../../types/userInfo';

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
  const [changes, setChanges] = useState<Partial<Info> | null>();

  const isEdit = location.pathname.endsWith('/edit');

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();

    if (currentPath === 'edit') {
      setBtn('저장');
    } else {
      setBtn('수정');
    }
  }, [location.pathname]);

  const handleNavigateEdit = () => {
    const last = location.pathname.split('/').pop();
    if (last === 'basic') navigate('/personal/my/info/basic/edit');
    else if (last === 'extra') navigate('/personal/my/info/extra/edit');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEdit) return;

    const pathArr = location.pathname.split('/');
    const lastPath = pathArr[pathArr.length - 1];
    const prevPath = pathArr[pathArr.length - 2];

    try {
      await axiosInstance.patch('/api/user/senior/me', changes);
      if (lastPath === 'edit' && prevPath === 'basic') {
        navigate('/personal/my/info/basic');
      } else if (lastPath === 'edit' && prevPath === 'extra') {
        navigate('/personal/my/info/extra');
      }
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div>
      <Topbar>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center"
        >
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
            <Outlet
              context={{ answers, setAnswers, setChanges }}
              key={location.pathname}
            />
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
