import MenuNavButton from '../MenuNavButton';

const CompanyMyMenu = () => {
  return (
    <div className="font-[Pretendard JP]">
      <div className="w-full flex justify-center text-[24px] text-[#747474] py-[12px] border-b-[1.3px] border-[#CCCCCC]">
        내 기업 정보
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px] py-[30px] px-[8px]">
        <MenuNavButton url="/company/my/repost">
          마감된 구직 다시 올리기
        </MenuNavButton>
        <MenuNavButton url="/company/my/info">기업 정보</MenuNavButton>
      </div>
    </div>
  );
};

export default CompanyMyMenu;
