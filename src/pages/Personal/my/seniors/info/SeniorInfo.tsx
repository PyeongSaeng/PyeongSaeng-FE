import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import axiosInstance from '../../../../../shared/apis/axiosInstance';
import { Answer, Info } from '../../../types/userInfo';
import { getSeniorData } from '../../../apis/my/seniorMy';

const SeniorInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [btn, setBtn] = useState<'수정' | '저장'>('수정');

  // 기본정보 관련
  const [seniorInfo, setSeniorInfo] = useState<Info | null>();
  const [changes, setChanges] = useState<Partial<Info>>({});

  // 추가정보 관련
  const [patchObject, setPatchObject] = useState<Answer[]>([]); // patch 객체

  const isEdit = location.pathname.endsWith('/edit');

  useEffect(() => {
    getSeniorData('/api/user/senior/me')
      .then((data) => setSeniorInfo(data.result))
      .catch((err) => console.error('시니어 기본 정보 조회 실패: ', err));
  }, []);

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
    if (last === 'basic') navigate('/personal/senior-my/info/basic/edit');
    else if (last === 'extra') navigate('/personal/senior-my/info/extra/edit');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEdit) return;

    const pathArr = location.pathname.split('/');
    const prevPath = pathArr[pathArr.length - 2];

    try {
      if (prevPath === 'basic') {
        await axiosInstance.patch('/api/user/senior/me', changes);
      } else if (prevPath === 'extra') {
        await axiosInstance.patch(`/api/seniors/${seniorInfo?.id}/answers`, {
          answers: patchObject,
        });
      }
      navigate(`/personal/senior-my/info/${prevPath}`);
    } catch (err) {
      console.error('시니어 정보 수정 실패: ', err);
      alert('정보 수정에 실패했습니다.');
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
              context={{ patchObject, setPatchObject, setChanges }}
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
