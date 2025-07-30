import { useNavigate } from 'react-router-dom';
import Topbar from '../../../../shared/components/topbar/Topbar';
import dummy1 from '../../../../shared/assets/popular-dummy1.png';

type appyiedJobs = {
  job: string;
  dueDate: string;
  dayOfWeek: string;
  img: string;
  result: string;
};

const dummyApplies: appyiedJobs[] = [
  {
    job: '죽전2동 행정복지센터 미화원',
    dueDate: '7/20',
    dayOfWeek: '일',
    img: dummy1,
    result: '합격',
  },
  {
    job: '죽전도서관 사서',
    dueDate: '7/27',
    dayOfWeek: '일',
    img: dummy1,
    result: '미정',
  },
  {
    job: '죽전2동 동사무소 미화',
    dueDate: '7/27',
    dayOfWeek: '일',
    img: dummy1,
    result: '불합격',
  },
];

const ApplyResults = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar>
        <div className="text-[16px]">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            신청 결과
          </div>
          <div className="h-[572px] overflow-y-scroll scrollbar-hide">
            {dummyApplies.map((apply) => {
              return (
                <div className="flex flex-col items-center justify-center border-t-[1.3px] border-[#CCCCCC] py-[12px]">
                  <div className="flex justify-between w-[292px] pb-[10px]">
                    <span>{apply.job}</span>
                    <span>
                      ~{apply.dueDate} ({apply.dayOfWeek})
                    </span>
                  </div>
                  <div className="w-[292px] h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4] overflow-hidden">
                    <img
                      className="w-[292px] h-[165px]"
                      src={apply.img}
                      alt="더미1"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-[6px] pt-[16px] pb-[6px]">
                    <button
                      type="button"
                      className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2]"
                    >
                      신청서 확인
                    </button>
                    <button
                      type="button"
                      className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]"
                    >
                      {apply.result}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default ApplyResults;

{
  /* <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between w-[292px]">
              <span>죽전 2동 행정복지센터 미화원</span>
              <span>~ 7/20 (일)</span>
            </div>
            <div className="w-[292px] h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4] overflow-hidden">
              <img className="w-[292px] h-[165px]" src={dummy1} alt="더미1" />
            </div>
            <div>
              <button>신청서 확인</button>
            </div>
          </div> */
}
