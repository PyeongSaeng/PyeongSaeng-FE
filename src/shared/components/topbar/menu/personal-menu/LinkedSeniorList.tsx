import { useEffect, useState } from 'react';
import { IoAddOutline, IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { LinkedSenior } from '../../../../../pages/Personal/types/userInfo';
import { getSeniorData } from '../../../../../pages/Personal/apis/my/seniorMy';
import Loading from '../../../Loading';

interface LinkedSeniorListProps {
  goNext: (menu: any, seniorData: LinkedSenior) => void;
  goBack: () => void;
}

const LinkedSeniorList = ({ goNext, goBack }: LinkedSeniorListProps) => {
  const navigate = useNavigate();

  const [linkedSeniors, setLinkedSeniors] = useState<LinkedSenior[] | null>(
    null
  );
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSeniorData('/api/user/seniors');
        setLinkedSeniors(data.result as LinkedSenior[]);
      } catch (err) {
        console.error('연결된 시니어 정보 조회 실패: ', err);
        ('연결된 시니어의 정보를 불러오지 못했습니다');
        setError('연결된 시니어의 정보를 불러오지 못했습니다');
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-[8px] font-[Pretendard]">
      {error ? (
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
      ) : (
        <>
          <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] border-b-[1.3px] border-[#CCCCCC]">
            내 정보
          </div>
          <div className="flex flex-col items-start gap-[23px] text-[16px] font-[400] border-b-[1.3px] border-[#CCCCCC] pt-[30px] pb-[20px]">
            {linkedSeniors?.map((senior) => (
              <button
                key={senior.seniorId}
                onClick={() => goNext('linkedSeniorDetail', senior)}
              >
                <div className="flex justify-center items-center gap-[10px] text-[16px]">
                  {`${senior.seniorName} 님`}
                  <IoChevronForward />
                </div>
              </button>
            ))}
            <div className="flex justify-center items-center gap-[10px] text-[16px]">
              <IoAddOutline size={22} />
              <button
                className="pt-[4px]"
                onClick={() => navigate('/personal/care-my/link-seniors')}
              >
                추가하기
              </button>
            </div>
          </div>
          <div className="py-[16px] text-[16px]">
            최대 3명까지 추가할 수 있습니다
          </div>
        </>
      )}
    </div>
  );
};

export default LinkedSeniorList;
