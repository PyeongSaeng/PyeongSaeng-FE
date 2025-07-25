import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';

// test용 더미 추후 삭제 예정
const dummyJobs = [
  {
    jobId: 1,
    name: '죽전1동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
  {
    jobId: 2,
    name: '죽전2동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
  {
    jobId: 3,
    name: '죽전3동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
  {
    jobId: 4,
    name: '죽전4동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
];

const JobRecommendationPage = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <Topbar>
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-center mt-6">
          <div className="relative w-[293px] h-[48px]">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="필요한 일자리를 찾아보세요"
              className="w-full h-full pl-[20px] pr-[40px] py-[12px]
                       rounded-[23px] border-[3px] border-[#00CB89]
                       bg-white text-[16px] focus:outline-none"
            />
            <img
              src="/icons/magnifier_icon.png"
              alt="search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px]"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="mt-[49px] flex flex-col items-center">
            <p className="text-[20px] font-semibold text-[#747474]">
              맞춤 일자리 추천
            </p>
            <p className="mt-[5px] text-[12px] font-normal text-[#747474]">
              입력하신 정보를 바탕으로 일자리를 추천해드려요
            </p>
          </div>
          {/* 스크롤 영역 */}
          <div className="mt-[17px] flex-1 w-full flex justify-center" style={{ minHeight: 0 }}>
            <div className="flex flex-col items-center overflow-y-auto gap-[41px] scrollbar-hide"
                        style={{ maxHeight: "400px" }}>
              {dummyJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="cursor-pointer"
                  onClick={() => navigate(`/personal/jobs/recommend/${job.jobId}`)}
                >
                  <p className="text-[14px] font-normal text-black text-center">
                    {job.name}
                  </p>
                  <img
                    src={job.image}
                    alt={job.name}
                    className="w-[230px] h-auto mt-[10px] rounded-[8px] border border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Topbar>
  );
};


export default JobRecommendationPage;
