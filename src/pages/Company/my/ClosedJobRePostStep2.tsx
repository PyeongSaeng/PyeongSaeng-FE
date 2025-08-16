import Topbar from '../../../shared/components/topbar/Topbar';

const ClosedJobRepostStep2 = () => {
  return (
    <div>
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] font-[semibold] border-b-[1.3px] border-[#CCCCCC]">
          신청서 입력
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="mx-[17px] mt-[2px]">
            <div className="h-[29px] flex items-center gap-[22px] mt-[21px]">
              <span className="text-[24px] text-[#414141] w-6">1</span>
              <span className="text-[24px] text-[#414141]">성함</span>
            </div>
            <div className="h-[29px] flex items-center gap-[22px] mt-[21px]">
              <span className="text-[24px] text-[#414141] w-6">2</span>
              <span className="text-[24px] text-[#414141]">연세</span>
            </div>
            <div className="h-[29px] flex items-center gap-[22px] mt-[21px]">
              <span className="text-[24px] text-[#414141] w-6">3</span>
              <span className="text-[24px] text-[#414141]">거주지</span>
            </div>
            <div className="h-[29px] flex items-center gap-[22px] mt-[21px]">
              <span className="text-[24px] text-[#414141] w-6">4</span>
              <span className="text-[24px] text-[#414141]">전화번호</span>
            </div>

            <div className="flex items-center gap-[22px] mt-[21px]">
              <span className="text-[24px] text-[#414141] w-6">5</span>
              <span className="text-[24px] text-[#414141] flex-1">
                추가 항목 예시
              </span>
              <button>
                <img
                  src="/icons/close_icon.svg"
                  alt="삭제"
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>
            <div className="flex flex-col gap-[6px] mt-[12px]">
              <div className="flex items-center gap-[18px]">
                <span className="text-[24px] text-medium">6</span>
                <input
                  type="text"
                  placeholder="여기에 입력하세요"
                  className="flex-1 w-[260px] px-[16px] h-[45px] border-[1px] border-[#c2c2c2] rounded-[8px] text-[#000000] placeholder:text-[#c2c2c2] text-[16px] text-medium"
                />
              </div>
              <p className="text-xs text-red-500">
                이미 존재하는 질문 라벨입니다.
              </p>
              <div className="flex justify-end mt-[14px]">
                <button className="w-[144px] h-[45px] rounded-[8px] text-[16px] text-medium bg-[#0D29B7] text-[#f1f1f1]">
                  추가
                </button>
              </div>
            </div>
          </div>
          <div className="mt-[35px] flex gap-[13px]">
            <button
              type="button"
              className="flex-1 w-[144px] h-[45px] border border-[#0D29B7] text-[#000000] rounded-[8px] text-[16px] font-medium"
            >
              글자 답변 항목 추가
            </button>
            <button
              type="button"
              className="flex-1 w-[144px] h-[45px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium"
            >
              사진 답변 항목 추가
            </button>
          </div>
          <div className="mt-[47px] mb-[24px] flex gap-[13px] px-[17px]">
            <button className="flex-1 h-[45px] border border-[#0D29B7] rounded-[8px] text-[16px] font-medium text-[#000000] bg-white">
              뒤로가기
            </button>
            <button className="flex-1 h-[45px] rounded-[8px] text-[16px] font-medium bg-[#0D29B7] text-white">
              신청서 올리기
            </button>
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default ClosedJobRepostStep2;
