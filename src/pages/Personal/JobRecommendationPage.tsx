import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import { useRecommendedJobs } from './hooks/useRecommend';

const JobRecommendationPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { jobs, isLoading, isError } = useRecommendedJobs();
  // const { jobs, isLoading, isError, refetch } = useRecommendedJobs();

  // 검색어 필터링 (디바운스 + memoized)
  const [kw, setKw] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setKw(search.trim().toLowerCase()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredJobs = useMemo(() => {
    if (!kw) return jobs;
    return jobs.filter(
      (job) =>
        job.workplaceName.toLowerCase().includes(kw) ||
        job.description.toLowerCase().includes(kw)
    );
  }, [jobs, kw]);

  return (
    <Topbar>
      <div className="w-full h-full flex flex-col">
        {/* 검색창 */}
        <div className="flex mt-6 items-center justify-center">
          <div className="relative w-[293px] h-[48px] mt-[11px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="키워드를 입력하세요"
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

        {/* 안내 텍스트 */}
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
          <div
            className="mt-[17px] flex-1 w-full flex justify-center"
            style={{ minHeight: 0 }}
          >
            <div
              className="flex flex-col items-center overflow-y-auto gap-[41px] scrollbar-hide"
              style={{ maxHeight: '400px' }}
            >
              {/* 로딩 상태 */}
              {isLoading && <p className="text-gray-400">불러오는 중...</p>}

              {/* 결과 없음 */}
              {!isLoading && !isError && filteredJobs.length === 0 && (
                <p className="text-gray-400 text-[16px]">
                  검색 결과가 없습니다.
                </p>
              )}

              {/* 결과 리스트 */}
              {!isLoading &&
                !isError &&
                filteredJobs.map((job) => (
                  <div
                    key={job.jobPostId}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/personal/jobs/recommend/${job.jobPostId}`)
                    }
                  >
                    <p className="text-[14px] font-normal text-black text-center">
                      {job.workplaceName}
                    </p>
                    <img
                      src={job.imageUrl}
                      alt={job.workplaceName}
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
