import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import MenuNavButton from '../MenuNavButton';

type MenuType =
  | 'main'
  | 'seniorMy'
  | 'careMy'
  | 'linkedSeniors'
  | 'linkedSeniorDetail';

interface MainMenuProps {
  handleMenu: (menu: MenuType) => void;
}

const MainMenu = ({ handleMenu }: MainMenuProps) => {
  const navigate = useNavigate();

  const myMenu = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className="px-[8px]">
      <button
        className="flex items-center gap-[12px] text-[24px] pt-[33px] pb-[25px]"
        onClick={() => {
          accessToken
            ? navigate('/personal/login')
            : myMenu === 'SENIOR'
              ? navigate('/personal/senior-my/info/basic')
              : navigate('/personal/care-my/info');
        }}
      >
        {accessToken ? '안녕하세요' : '로그인 하세요'}
        <IoChevronForward className="size-[30px]" />
      </button>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton url="/personal/jobs/recommend">
          일자리 추천
        </MenuNavButton>
        <MenuNavButton url="/personal/jobs/saved">일자리 저장함</MenuNavButton>
        <MenuNavButton url="/personal/jobs/drafts">일자리 신청함</MenuNavButton>
        <MenuNavButton url="/personal/senior-my/info/extra">
          질문답변
        </MenuNavButton>
        <MenuNavButton
          handleMenu={() =>
            handleMenu(myMenu === 'SENIOR' ? 'seniorMy' : 'careMy')
          }
        >
          내 정보
        </MenuNavButton>
        <MenuNavButton isLogout={true}>로그아웃</MenuNavButton>
        <MenuNavButton url="/personal/delete-account">회원탈퇴</MenuNavButton>
      </div>
    </div>
  );
};

export default MainMenu;
