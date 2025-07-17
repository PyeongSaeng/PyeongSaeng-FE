import { IoChevronForward } from 'react-icons/io5';
import MenuNavButton from '../MenuNavButton';

interface MainMenuProps {
  handleMenu: () => void;
}

const MainMenu = ({ handleMenu }: MainMenuProps) => {
  return (
    <div className="px-[8px]">
      <div className="flex items-center gap-[12px] text-[24px] pt-[33px] pb-[25px]">
        {'로그인 하세요'}
        <IoChevronForward className="size-[30px]" />
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton url="/jobs/recommend">일자리 추천</MenuNavButton>
        <MenuNavButton url="/jobs/saved">일자리 저장함</MenuNavButton>
        <MenuNavButton url="/jobs/drafts">일자리 신청함</MenuNavButton>
        <MenuNavButton url="/jobs/recommend/:id/apply/additional">
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
