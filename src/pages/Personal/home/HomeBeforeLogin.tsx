import { useNavigate } from 'react-router-dom';
import { useTrendJobs } from '../hooks/useTrendJob';

const HomeBeforeLogin = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTrendJobs(1);

  return (
    <div className="text-[16px]">
      <div className="flex justify-center">
        <div>
          {/* 로그인 박스 */}
          <div className="w-[298px] h-[180px] mt-[16px] mb-[40px] flex flex-col items-center justify-center gap-[27px] rounded-[13px] border-[1px] border-[#D3D3D3]">
            <div className="flex flex-col items-center">
              <div>나에게 맞는 정보를</div>
              <div>확인하세요</div>
            </div>
            <button
              className="w-[207px] h-[45px] px-[78px] py-[12px] rounded-[8px] bg-[#08D485] text-black"
              onClick={() => navigate('/personal/login')}
            >
              로그인
            </button>
          </div>

          {/* 섹션 제목 */}
          <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
            요즘 뜨는 일자리
          </span>

          {/* 리스트 */}
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
            {data?.jobPostList.length === 0 && !isLoading && !isError && (
              <div className="w-[298px] h-[100px] flex items-center justify-center text-gray-400">
                인기있는 공고가 없습니다
              </div>
            )}
            {data?.jobPostList.slice(0, 5).map((job) => (
              <div
                key={job.id}
                onClick={() => navigate('/personal/login')}
                className="cursor-pointer w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]"
              >
                <span className="text-center px-2">{job.title}</span>
                <img
                  className="w-[250px] h-[120px] object-cover rounded-[8px] border-[1px] border-[#A4A4A4]"
                  src={job.images?.[0]?.imageUrl ?? ''}
                  alt={job.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBeforeLogin;
