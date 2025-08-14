import { useNavigate } from 'react-router-dom';
import { LinkedSenior } from '../../../../../pages/Personal/types/userInfo';

interface LinkedSeniorDetailProps {
  seniorData: LinkedSenior | null;
  goBack: () => void;
}

const LinkedSeniorDetail = ({
  seniorData,
  goBack,
}: LinkedSeniorDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-[8px]">
      <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] mb-[30px] border-b-[1.3px] border-[#CCCCCC]">
        내 정보
      </div>
      {seniorData ? (
        <>
          <div className="flex flex-col items-start gap-[23px] text-[16px]">
            <div className="text-[24px]">{seniorData?.seniorName}</div>
            <button
              onClick={() =>
                navigate('/personal/care-my/application-results', {
                  state: { seniorData },
                })
              }
            >
              신청 결과
            </button>
            <button onClick={() => navigate('')}>추가 정보 입력</button>
          </div>
        </>
      ) : (
        <div className="h-[430px] text-[16px] flex flex-col justify-center items-center gap-[20px]">
          <div className="flex flex-col justify-center items-center gap-[2px] leading-[1]">
            <span>시니어 정보조회에 실패하였습니다.</span>
            <br />
            <span>다시 시도하여주세요.</span>
          </div>
          <button
            type="button"
            className="w-[280px] h-[45px] rounded-[8px] bg-[#08D485] text-white"
            onClick={goBack}
          >
            돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkedSeniorDetail;
