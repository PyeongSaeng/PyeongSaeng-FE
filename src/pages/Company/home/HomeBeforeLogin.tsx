import dummy1 from '../../../shared/assets/popular-dummy1.png';

const HomeBeforeLogin = () => {
  return (
    <div className="flex justify-center font-[pretendard] text-[16px]">
      <div>
        <div className="w-[298px] h-[180px] mt-[16px] mb-[40px] flex flex-col items-center justify-center gap-[27px] rounded-[13px] border-[1px] border-[#D3D3D3]">
          <div className="flex flex-col items-center">
            <div>간편하게 공고를 올리고</div>
            <div>합불 결과까지 한 번에 관리해보세요</div>
          </div>
          <button className="w-[207px] w-[45px] px-[78px] py-[12px] rounded-[8px] bg-[#0D29B7] text-white">
            로그인
          </button>
        </div>
        <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
          이번 주 지원이 많은 공고
        </span>
        <div className="h-[356px] overflow-y-scroll scrollbar-hide">
          <div className="w-[298px] h-[196px] mt-[2px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]">
            <span>죽전 2동 행정복지센터 미화원</span>
            <img
              className="rounded-[8px] border-[1px] border-[#A4A4A4]"
              src={dummy1}
              alt="더미1"
            />
          </div>
          <div className="w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]">
            <span>죽전 2동 행정복지센터 미화원</span>
            <img
              className="rounded-[8px] border-[1px] border-[#A4A4A4]"
              src={dummy1}
              alt="더미1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBeforeLogin;
