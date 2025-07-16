import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuButtonProps {
  children: ReactNode;
  url?: string;
  handleMenu?: () => void;
}

const MenuNavButton = ({ children, url, handleMenu }: MenuButtonProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (handleMenu) {
      handleMenu();
    }
    if (url) {
      navigate(url);
    }
  };

  return <button onClick={handleButtonClick}>{children}</button>;
};

export default MenuNavButton;
