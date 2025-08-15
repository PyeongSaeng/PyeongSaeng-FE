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

  const role = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  const myMenu = role === 'SENIOR' ? 'seniorMy' : 'careMy';

  return (
    <div className="px-[8px]">
      <button
        className="flex items-center gap-[12px] text-[24px] pt-[33px] pb-[25px]"
        onClick={() => {
          !accessToken
            ? navigate('/personal/login')
            : accessToken && role === 'SENIOR'
              ? navigate('/personal/senior-my/info/basic')
              : accessToken && role === 'PROTECTOR'
                ? navigate('/personal/care-my/info')
                : null;
        }}
      >
        {accessToken ? '안녕하세요' : '로그인 하세요'}
        <IoChevronForward className="size-[30px]" />
      </button>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton
          url={accessToken ? '/personal/jobs/recommend' : '/personal/login'}
        >
          일자리 추천
        </MenuNavButton>
        <MenuNavButton
          url={accessToken ? '/personal/jobs/saved' : '/personal/login'}
        >
          일자리 저장함
        </MenuNavButton>
        <MenuNavButton
          url={accessToken ? '/personal/jobs/drafts' : '/personal/login'}
        >
          일자리 신청함
        </MenuNavButton>
        {accessToken && (
          <MenuNavButton
            url={
              accessToken ? '/personal/senior-my/info/extra' : '/personal/login'
            }
          >
            질문답변
          </MenuNavButton>
        )}
        <MenuNavButton
          handleMenu={() => {
            accessToken ? handleMenu(myMenu) : navigate('/personal/login');
          }}
        >
          내 정보
        </MenuNavButton>
        <MenuNavButton isLogout={true}>로그아웃</MenuNavButton>
        {accessToken && (
          <MenuNavButton url="/personal/delete-account">회원탈퇴</MenuNavButton>
        )}
      </div>
    </div>
  );
};

export default MainMenu;
