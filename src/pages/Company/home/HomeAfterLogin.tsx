import HomeTopButton from '../../../shared/components/buttons/HomeTopButton';
import dummy1 from '../../../shared/assets/popular-dummy1.png';

const HomeAfterLogin = () => {
  return (
    <div className="flex justify-center font-[pretendard] text-[16px]">
      <div className="flex flex-col justify-center items-center">
        <div className="py-[16px]">
          <div className="flex gap-[4px]">
            <HomeTopButton bgColor="blue" textColor="white">
              신청서 입력
            </HomeTopButton>
            <HomeTopButton bgColor="blue" textColor="white">
              받은 신청서
            </HomeTopButton>
            <HomeTopButton bgColor="blue" textColor="white">
              내 기업 정보
            </HomeTopButton>
          </div>
        </div>
        <div className="flex justify-center items-center w-[298px] h-[152px] rounded-[13px] border-[1.3px] border-[#D3D3D3] mb-[20px]">
          <div>
            <div className="text-center w-[265px] pb-[4px] border-b-[1px] border-[#C2C2C2]">
              내 기업에서 구직 중인 공고
            </div>
            <div className="flex flex-col">
              <div className="px-[8px] py-[8px]">
                죽전도서관 사서 업무 (~7/25)
              </div>
              <div className="flex gap-[10px] justify-center items-center">
                <button className="flex flex-col justify-center items-center w-[122px] h-[53px] rounded-[8px] border-[1.3px] border-[#0D29B7] leading-tight">
                  <span>받은 신청서</span>
                  <span>확인하기</span>
                </button>
                <button className="w-[122px] h-[53px] rounded-[8px] border-[1.3px] border-[#0D29B7]">
                  합불 입력하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
            이번 주 지원이 많은 공고
          </span>
          <div className="h-[348px] overflow-y-scroll scrollbar-hide">
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
    </div>
  );
};

export default HomeAfterLogin;
