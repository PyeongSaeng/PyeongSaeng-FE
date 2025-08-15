import { useNavigate } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import MenuNavButton from '../MenuNavButton';

const BeforeLoginMainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="px-[8px]">
      <button
        className="flex items-center gap-[12px] text-[24px] pt-[33px] pb-[25px]"
        onClick={() => {
          navigate('/company/login');
        }}
      >
        로그인 하세요
        <IoChevronForward className="size-[30px]" />
      </button>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton url="/company/login">신청서 입력</MenuNavButton>
        <MenuNavButton url="/company/login">받은 신청서</MenuNavButton>
        <MenuNavButton url="/company/login">내 기업 정보</MenuNavButton>
      </div>
    </div>
  );
};

export default BeforeLoginMainMenu;
