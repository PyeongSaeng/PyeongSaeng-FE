import MenuNavButton from '../MenuNavButton';

const SeniorMyMenu = ({ goNext }: { goNext: (menu: any) => void }) => {
  // goNext 파라미터 미사용 -> 추가
  console.log(goNext);

  return (
    <div>
      <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] mb-[30px] border-b-[1.3px] border-[#CCCCCC]">
        내 정보
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px] px-[8px]">
        <MenuNavButton url="/personal/senior-my/applied-results">
          신청 결과
        </MenuNavButton>
        <MenuNavButton url="/personal/senior-my/info/basic">
          개인정보
        </MenuNavButton>
        <MenuNavButton url="/personal/delete-account">회원탈퇴</MenuNavButton>
      </div>
    </div>
  );
};

export default SeniorMyMenu;
