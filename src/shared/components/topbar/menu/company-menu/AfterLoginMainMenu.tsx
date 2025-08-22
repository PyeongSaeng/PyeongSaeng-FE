import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import MenuNavButton from '../MenuNavButton';
import { getCompanyData } from '../../../../../pages/Company/apis/companyMy';

interface AfterLoginMainMenuProps {
  goNext: () => void;
}

const AfterLoginMainMenu = ({ goNext }: AfterLoginMainMenuProps) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [companyName, setCompanyName] = useState<string>('');
  const [prevCompanyName, setPrevCompanyName] = useState<string>('');

  useEffect(() => {
    if (!accessToken) return;

    getCompanyData('/api/companies/profile')
      .then((data) => {
        setCompanyName(data.result.username);
        setPrevCompanyName(data.result.username);
      })
      .catch((err) => console.error('기업 정보 조회 에러: ', err));
  }, [accessToken]);

  return (
    <div className="px-[8px]">
      <button
        className="flex items-center gap-[12px] text-[24px] pt-[33px] pb-[25px]"
        onClick={() => {
          navigate('/company/my/info');
        }}
      >
        <span className="font-bold flex items-center gap-2">
          {companyName || prevCompanyName || ''}
          {!companyName && (
            <span className="loader w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"></span>
          )}
        </span>{' '}
        계정
        <IoChevronForward className="size-[30px]" />
      </button>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton url="/company/jobs/create-form">
          신청서 입력
        </MenuNavButton>
        <MenuNavButton url="/company/jobs/applications">
          받은 신청서
        </MenuNavButton>
        <button onClick={goNext}>내 기업 정보</button>
        <MenuNavButton isLogout={true}>로그아웃</MenuNavButton>
        <MenuNavButton url="/company/delete-account">회원탈퇴</MenuNavButton>
      </div>
    </div>
  );
};

export default AfterLoginMainMenu;
