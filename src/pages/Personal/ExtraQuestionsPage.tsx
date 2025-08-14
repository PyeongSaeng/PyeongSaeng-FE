import Topbar from '../../shared/components/topbar/Topbar';

const ExtraQuestionsPage = () => {
  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center pt-[25px] text-[#747474] gap-[26px]">
          <span className="text-[20px] font-semibold">질문 답변</span>
          <div className="flex flex-col text-[16px] font-semibold">
            <span>부모님에 대한 정보를 입력해주세요</span>
            <span>정확한 일자리 추천과 신청서 작성에 도움을 줍니다</span>
          </div>
          <div className="pb-[30px]"></div>
        </div>
      </Topbar>
    </div>
  );
};

export default ExtraQuestionsPage;
