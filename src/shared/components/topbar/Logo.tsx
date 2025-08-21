import logo from '../../assets/logo.svg';

const Logo = () => {
  return (
    <div className="flex justify-center items-center h-[60.45px]">
      <img className="w-auto h-[36px]" src={logo} alt="로고" />
      {/* <img className="w-[51px] h-[35px]" src={watermark} alt="워커마크" /> */}
    </div>
  );
};

export default Logo;
