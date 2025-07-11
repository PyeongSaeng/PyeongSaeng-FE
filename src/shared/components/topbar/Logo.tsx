import logo from '../../assets/logo.svg';
import watermark from '../../assets/watermark.svg';

const Logo = () => {
  return (
    <div className="flex justify-center py-5 gap-2">
      <img className="w-[43.57px] h-[35.46px]" src={logo} alt="로고" />
      <img className="w-[51px] h-[35px]" src={watermark} alt="워커마크" />
    </div>
  );
};

export default Logo;
