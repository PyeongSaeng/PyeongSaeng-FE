import { useNavigate } from 'react-router-dom';
import { LinkedSenior } from '../../../../../pages/Personal/types/userInfo';

interface LinkedSeniorDetailProps {
  seniorData: LinkedSenior | null;
}

const LinkedSeniorDetail = ({ seniorData }: LinkedSeniorDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-[8px]">
      <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] mb-[30px] border-b-[1.3px] border-[#CCCCCC]">
        내 정보
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px]">
        <div className="text-[24px]">{seniorData?.seniorName}</div>
        <button onClick={() => navigate('/personal/my/info/extra')}>
          신청 결과
        </button>
        <button onClick={() => {}}>추가 정보 입력</button>
      </div>
    </div>
  );
};

export default LinkedSeniorDetail;
