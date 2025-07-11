import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Topbar from '../../shared/components/topbar/Topbar';

const dummyJobs = [
    {
        id: 1,
        name: '죽전1동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
    {
        id: 2,
        name: '죽전2동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
    {
        id: 3,
        name: '죽전3동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
    {
        id: 4,
        name: '죽전4동 행정복지센터 미화원',
        image: '/icons/search_line.png',
    },
];

const JobRecommendationPage = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Topbar />
      <div className="sticky top-0 z-10 flex justify-center bg-white pt-6 pb-4">
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
            src="/icons/search_line.png"
            alt="search"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px]"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-10">
        <div className="mt-[49px] flex flex-col items-center">
          <p className="text-[20px] font-semibold text-[#747474]">
            맞춤 일자리 추천
          </p>
          <p className="mt-[5px] text-[12px] font-normal text-[#747474]">
            입력하신 정보를 바탕으로 일자리를 추천해드려요
          </p>
        </div>
        <div className="mt-[17px] flex flex-col items-center">
          <div className="flex flex-col gap-[41px]">
            {dummyJobs.map((job) => (
              <div
                key={job.id}
                className="cursor-pointer"
                onClick={() => navigate(`/jobs/recommend/${job.id}`)}
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
  );
};


export default JobRecommendationPage;
