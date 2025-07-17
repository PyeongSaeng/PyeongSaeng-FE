import MenuNavButton from '../MenuNavButton';

const GuardianMyMenu = () => {
  return (
    <div className="px-[8px]">
      <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] mb-[30px] border-b-[1.3px] border-[#CCCCCC]">
        내 정보
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <MenuNavButton url="/my/seniors">{'케어 중인 어르신 >'}</MenuNavButton>
        <MenuNavButton url="/my/info">개인정보 확인</MenuNavButton>
        <MenuNavButton url="/my/delete-account">회원탈퇴</MenuNavButton>
      </div>
    </div>
  );
};

export default GuardianMyMenu;
