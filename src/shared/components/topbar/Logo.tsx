import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname.startsWith('/company')) {
      navigate('/company');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-[60.45px]">
      <img
        className="w-auto h-[36px] cursor-pointer"
        src={logo}
        alt="로고"
        onClick={handleLogoClick}
      />
      {/* <img className="w-[51px] h-[35px]" src={watermark} alt="워커마크" /> */}
    </div>
  );
};

export default Logo;
