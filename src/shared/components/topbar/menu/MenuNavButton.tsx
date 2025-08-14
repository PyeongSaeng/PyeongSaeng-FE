import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../../../shared/hooks/useLogout';

interface MenuButtonProps {
  children: ReactNode;
  url?: string;
  handleMenu?: () => void;
  isLogout?: boolean; // 로그아웃 버튼인지 구분
}

const MenuNavButton = ({
  children,
  url,
  handleMenu,
  isLogout = false,
}: MenuButtonProps) => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleButtonClick = () => {
    // 로그아웃 버튼인 경우
    if (isLogout) {
      if (confirm('로그아웃하시겠습니까?')) {
        logoutMutation.mutate();
      }
      return;
    }

    // 일반 버튼인 경우
    if (handleMenu) {
      handleMenu();
    }
    if (url) {
      navigate(url);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={isLogout && logoutMutation.isPending}
    >
      {isLogout && logoutMutation.isPending ? '로그아웃 중...' : children}
    </button>
  );
};

export default MenuNavButton;
