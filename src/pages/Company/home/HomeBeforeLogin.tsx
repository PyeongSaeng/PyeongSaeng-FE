import { useNavigate } from 'react-router-dom';
import { useTrendJobs } from '../../Personal/hooks/useTrendJob';

const HomeBeforeLogin = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTrendJobs(1);

  return (
    <div className="flex justify-center text-[16px]">
      <div>
        {/* 로그인 안내 박스 */}
        <div className="w-[298px] h-[180px] mt-[16px] mb-[40px] flex flex-col items-center justify-center gap-[27px] rounded-[13px] border-[1px] border-[#D3D3D3]">
          <div className="flex flex-col items-center text-center">
            <div>간편하게 공고를 올리고</div>
            <div>합불 결과까지 한 번에 관리해보세요</div>
          </div>
          <button
            type="button"
            className="w-[207px] h-[45px] px-[78px] py-[12px] rounded-[8px] bg-[#0D29B7] text-white"
            onClick={() => navigate('/company/login')}
          >
            로그인
          </button>
        </div>

        {/* 인기 공고 리스트 */}
        <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
          이번 주 지원이 많은 공고
        </span>
        <div className="h-[356px] overflow-y-scroll scrollbar-hide mt-[12px]">
          {isLoading && (
            <div className="w-[298px] h-[100px] flex items-center justify-center text-gray-500">
              로딩 중...
            </div>
          )}
          {isError && (
            <div className="w-[298px] h-[100px] flex items-center justify-center text-red-500">
              데이터 불러오기에 실패했습니다
            </div>
          )}
          {!isLoading && !isError && data?.jobPostList.length === 0 && (
            <div className="w-[298px] h-[100px] flex items-center justify-center text-gray-400">
              인기있는 공고가 없습니다
            </div>
          )}
          {data?.jobPostList.slice(0, 5).map((job) => (
            <div
              key={job.id}
              onClick={() => navigate('/company/login')}
              className="cursor-pointer w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]"
            >
              <span className="text-center px-2">{job.title}</span>
              <img
                className="w-[250px] h-[120px] object-cover rounded-[8px] border-[1px] border-[#A4A4A4]"
                src={job.images?.[0]?.imageUrl ?? ''}
                alt={job.title}
              />
              <span className="text-[14px] text-[#5f5f5f]">{job.address}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBeforeLogin;
