import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import MenuNavButton from '../MenuNavButton';

interface MainMenuProps {
  handleMenu: () => void;
}

const MainMenu = ({ handleMenu }: MainMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-[8px]">
      <button
        className="flex items-center gap-[12px] text-[24px] pt-[33px] pb-[25px]"
        onClick={() => navigate('/personal/login')}
      >
        {'로그인 하세요'}
        <IoChevronForward className="size-[30px]" />
      </button>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton url="/personal/jobs/recommend">일자리 추천</MenuNavButton>
        <MenuNavButton url="/personal/jobs/saved">일자리 저장함</MenuNavButton>
        <MenuNavButton url="/personal/jobs/drafts">일자리 신청함</MenuNavButton>
        <MenuNavButton url="/personal/jobs/recommend/:id/apply/additional">
          질문답변
        </MenuNavButton>
        <MenuNavButton handleMenu={handleMenu}>내 정보</MenuNavButton>
        <MenuNavButton>로그아웃</MenuNavButton>
        <MenuNavButton url="/my/delete-account">회원탈퇴</MenuNavButton>
      </div>
    </div>
  );
};

export default MainMenu;
