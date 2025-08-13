import Topbar from '../../../shared/components/topbar/Topbar';
import dummy1 from '../../../shared/assets/popular-dummy1.png';

type appliedJobs = {
  job: string;
  dueDate: string;
  dayOfWeek: string;
  img: string;
  result: string;
};

const dummyApplies: appliedJobs[] = [
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

const JobPostRepost = () => {
  return (
    <div>
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] pt-[10px] pb-[26px] font-[semibold]">
          마감된 공고 다시 올리기
        </div>
        <div className="h-[572px] text-[16px] font-[400] font-[Regular] overflow-y-scroll scrollbar-hide">
          {dummyApplies.map((apply, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center border-b-[1.3px] border-[#CCCCCC] py-[12px]"
              >
                <div className="flex justify-between w-[292px] pb-[10px]">
                  <span>{apply.job}</span>
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
                    className="w-[294px] h-[45px] rounded-[8px] border-[1.3px] bg-[#0D29B7] text-white"
                  >
                    수정 후 게시
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Topbar>
    </div>
  );
};

export default JobPostRepost;
