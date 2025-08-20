import { useEffect, useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import MenuNavButton from '../MenuNavButton';
import { getSeniorData } from '../../../../../pages/Personal/apis/my/seniorMy';
import { getCareBasicInfo } from '../../../../../pages/Personal/apis/my/careMy';

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

  const role = localStorage.getItem('userRole'); // SENIOR | PROTECTOR
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  const myMenu = role === 'SENIOR' ? 'seniorMy' : 'careMy';

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    if (role === 'SENIOR') {
      getSeniorData('/api/user/senior/me')
        .then((res) => setName(res.result.name))
        .catch((err) => console.error('시니어 이름 가져오기 실패:', err));
    } else if (role === 'PROTECTOR') {
      getCareBasicInfo('/api/user/protector/me')
        .then((res) => setName(res.result.name))
        .catch((err) => console.error('보호자 이름 가져오기 실패:', err));
    }
  }, [accessToken, role]);

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
        {accessToken ? (
          name ? (
            <span>
              <span className="font-bold">{name}</span>님 안녕하세요
            </span>
          ) : (
            '불러오는 중...'
          )
        ) : (
          '로그인 하세요'
        )}

        <IoChevronForward className="size-[30px]" />
      </button>

      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        {role === 'SENIOR' && (
          <>
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
          </>
        )}
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
