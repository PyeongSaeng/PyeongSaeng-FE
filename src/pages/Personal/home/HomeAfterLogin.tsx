import { useNavigate } from 'react-router-dom';
import HomeTopButton from '../../../shared/components/buttons/HomeTopButton';
import { useTrendJobs } from '../hooks/useTrendJob';

const HomeAfterLogin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken') ?? undefined;

  const { data, isLoading, isError } = useTrendJobs(1, token);

  return (
    <div className="flex justify-center text-[16px]">
      <div className="flex flex-col justify-center items-center">
        {/* 상단 버튼 */}
        <div className="py-[16px]">
          <div className="flex gap-[4px]">
            <HomeTopButton
              bgColor="green"
              textColor="black"
              onClick={() => navigate('/personal/jobs/recommend')}
            >
              <span className="leading-tight">
                <span>일자리 추천(어르신용)</span>
              </span>
            </HomeTopButton>
            <HomeTopButton
              bgColor="green"
              textColor="black"
              onClick={() => navigate('/personal/jobs/saved')}
            >
              <span className="leading-tight">
                <span>일자리 저장(어르신용)</span>
              </span>
            </HomeTopButton>
            <HomeTopButton
              bgColor="green"
              textColor="black"
              onClick={() => navigate('/personal/jobs/drafts')}
            >
              일자리 신청
            </HomeTopButton>
          </div>
        </div>

        {/* 내 정보 입력 유도 */}
        <div className="flex flex-col justify-center items-center w-[298px] h-[130px] rounded-[13px] border-[1.3px] border-[#D3D3D3] mb-[20px]">
          <div className="flex flex-col justify-center items-center leading-tight py-[8px]">
            <span>추가 정보를 입력하면</span>
            <span>AI가 맞춤형 신청서를 작성해줍니다</span>
          </div>
          <button
            className="w-[270px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]"
            onClick={() => navigate('/personal/care-my/info')}
          >
            내 정보 입력하러 가기
          </button>
        </div>

        {/* 요즘 뜨는 일자리 */}
        <div>
          <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
            요즘 뜨는 일자리
          </span>

          <div className="h-[348px] overflow-y-scroll scrollbar-hide mt-[12px]">
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
            {data?.jobPostList.length === 0 && !isLoading && !isError && (
              <div className="w-[298px] h-[100px] flex items-center justify-center text-gray-400">
                인기있는 공고가 없습니다
              </div>
            )}

            {data?.jobPostList.slice(0, 5).map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/personal/jobs/recommend/${job.id}`)}
                className="cursor-pointer w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]"
              >
                <span className="text-center mt-[17px]">{job.description}</span>
                <img
                  className="w-[250px] h-[120px] object-cover rounded-[8px] border-[1px] border-[#A4A4A4]"
                  src={job.images?.[0]?.imageUrl ?? ''}
                  alt={job.title}
                />
                <span className="text-[14px] text-[#5f5f5f] mb-[10px]">
                  {job.address}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAfterLogin;
