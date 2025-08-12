import MenuNavButton from '../MenuNavButton';

const CareMyMenu = ({ goNext }: { goNext: (menu: any) => void }) => {
  return (
    <div className="px-[8px] font-[Pretendard]">
      <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] border-b-[1.3px] border-[#CCCCCC]">
        내 정보
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px] py-[30px]">
        <button onClick={() => goNext('linkedSeniors')}>
          {'케어 중인 어르신 >'}
        </button>
        <MenuNavButton url="/personal/care-my/info">개인정보</MenuNavButton>
        <MenuNavButton url="">로그아웃</MenuNavButton>
        <MenuNavButton url="/personal/delete-account">회원탈퇴</MenuNavButton>
      </div>
    </div>
  );
};

export default CareMyMenu;
