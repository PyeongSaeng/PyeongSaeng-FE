import MenuNavButton from './MenuNavButton';

interface MainMenuProps {
  handleMenu: () => void;
}

const MainMenu = ({ handleMenu }: MainMenuProps) => {
  return (
    <div className="px-[8px]">
      <div className="text-[24px] underline decoration-2 pt-[33px] pb-[25px]">
        {'로그인 하세요 >'}
      </div>
      <div className="flex flex-col items-start gap-5 text-lg">
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
