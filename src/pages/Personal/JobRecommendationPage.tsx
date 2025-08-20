import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import { useSearchJobs } from './hooks/useSearchJob';
import { useRecommendedJobs } from './hooks/useRecommend';
import { SearchJobItem } from './types/jobs';

const JobRecommendationPage = () => {
  const navigate = useNavigate();
  const userId = 1;

  // 검색어 상태 및 디바운싱
  const [search, setSearch] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  // 검색 API
  const {
    data: searchResult,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearchJobs(debouncedKeyword, !!debouncedKeyword);

  // 추천 API
  const {
    data: recommended,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useRecommendedJobs(userId, debouncedKeyword === '');

  // 디바운싱 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(search.trim());
    }, 600);
    return () => clearTimeout(timer);
  }, [search]);

  // 공통 타입으로 매핑
  const mappedJobs: SearchJobItem[] | undefined = debouncedKeyword
    ? searchResult?.results
    : recommended?.slice(0, 10).map((job) => ({
        id: job.jobPostId,
        title: job.workplaceName,
        address: job.description,
        imageUrl: job.imageUrl,
        displayApplicationCount: 0,
      }));

  const isLoading = debouncedKeyword ? isSearchLoading : isRecommendedLoading;
  const isError = debouncedKeyword ? isSearchError : isRecommendedError;

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

          {/* 결과 리스트 */}
          <div
            className="mt-[17px] flex-1 w-full flex justify-center"
            style={{ minHeight: 0 }}
          >
            <div
              className="flex flex-col items-center overflow-y-auto gap-[41px] scrollbar-hide"
              style={{ maxHeight: '400px' }}
            >
              {isLoading && <p className="text-gray-400">불러오는 중...</p>}
              {isError && <p className="text-red-400">오류가 발생했습니다</p>}

              {!isLoading && mappedJobs?.length === 0 && (
                <p className="text-gray-400 text-[16px]">검색 결과가 없습니다.</p>
              )}

              {mappedJobs?.map((job) => (
                <div
                  key={job.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/personal/jobs/recommend/${job.id}`)}
                >
                  <p className="text-[14px] text-[#000000] text-center">{job.address}</p>
                  <img
                    src={job.imageUrl}
                    alt={job.title}
                    className="w-[230px] h-[130px] mx-auto mt-[9px] rounded-[8px] border-[1px] border-[#A4A4A4] object-cover"
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
