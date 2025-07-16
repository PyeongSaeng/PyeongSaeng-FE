import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuButtonProps {
  children: ReactNode;
  url?: string;
  drillDownMenu?: boolean;
}

const MenuNavButton = ({ children, url, drillDownMenu }: MenuButtonProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (drillDownMenu) {
      //
    }
    if (url) {
      navigate(url);
    }
  };

  return <button onClick={handleButtonClick}>{children}</button>;
};

export default MenuNavButton;
