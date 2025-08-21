import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopularJobs } from '../hooks/usePopularJobs';
import HomeTopButton from '../../../shared/components/buttons/HomeTopButton';
import axiosInstance from '../../../shared/apis/axiosInstance';
import { RepostJob } from '../types/companyInfo';
import { formatDateForCom } from '../../../shared/utils/userInfoUtils';

const HomeAfterLogin = () => {
  const page = 1;
  const { jobs, fetchPopular, loading, error } = usePopularJobs();
  const navigate = useNavigate();

  const [firstApplication, setFirstApplication] = useState<RepostJob>();
  const [applicationLoading, setApplicationLoading] = useState<boolean>(false);
  const [deadline, setDeadLine] = useState<string>('');

  useEffect(() => {
    fetchPopular(page);
  }, [fetchPopular, page]);

  // 현재 회사에서 채용중인 공고목록 조회
  useEffect(() => {
    setApplicationLoading(true);
    axiosInstance
      .get(`/api/job/companies/me/posts?page=1&state=RECRUITING`)
      .then((data: any) => setFirstApplication(data.data.result.jobPostList[0]))
      .catch((err) => console.error('회사 채용 목록 조회 에러: ', err))
      .finally(() => setApplicationLoading(false));
  }, []);

  // 마감기한을 위한 채용공고 상세조회
  useEffect(() => {
    if (!firstApplication?.id) return;

    setApplicationLoading(true);
    axiosInstance
      .get(`/api/job/posts/${firstApplication?.id}/detail`)
      .then((data) => setDeadLine(data.data.result.deadline as string))
      .catch((err) => console.error('채용공고 상세 조회 에러: ', err))
      .finally(() => setApplicationLoading(false));
  }, [firstApplication]);

  return (
    <div className="flex justify-center text-[16px]">
      <div className="flex flex-col justify-center items-center">
        <div className="py-[16px]">
          <div className="flex gap-[4px]">
            <HomeTopButton
              bgColor="blue"
              textColor="white"
              onClick={() => navigate('/company/jobs/create-form')}
            >
              신청서 입력
            </HomeTopButton>
            <HomeTopButton
              bgColor="blue"
              textColor="white"
              onClick={() => navigate('/company/jobs/applications')}
            >
              받은 신청서
            </HomeTopButton>
            <HomeTopButton
              bgColor="blue"
              textColor="white"
              onClick={() => navigate('/company/my')}
            >
              내 기업 정보
            </HomeTopButton>
          </div>
        </div>
        <div className="flex justify-center items-center w-[298px] h-[152px] rounded-[13px] border-[1.3px] border-[#D3D3D3] mb-[20px]">
          <div>
            <div className="text-center w-[265px] pb-[4px] border-b-[1px] border-[#C2C2C2]">
              내 기업에서 구직 중인 공고
            </div>
            <div className="flex flex-col">
              <div className="flex gap-[8px] px-[8px] py-[8px]">
                <span>{firstApplication?.description}</span>
                <span>~({deadline && formatDateForCom(deadline)})</span>
              </div>
              <div className="flex gap-[10px] justify-center items-center">
                <button
                  type="button"
                  className="flex flex-col justify-center items-center w-[122px] h-[53px] rounded-[8px] border-[1.3px] border-[#0D29B7] leading-tight"
                  onClick={() =>
                    navigate(
                      `/company/jobs/applications/${firstApplication?.id}`
                    )
                  }
                >
                  <span>받은 신청서</span>
                  <span>확인하기</span>
                </button>
                <button
                  type="button"
                  className="w-[122px] h-[53px] rounded-[8px] border-[1.3px] border-[#0D29B7]"
                  onClick={() =>
                    navigate(
                      `/company/jobs/applications/${firstApplication?.id}/results`
                    )
                  }
                >
                  합불 입력하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
            이번 주 지원이 많은 공고
          </span>
          <div className="h-[348px] mt-[21px] overflow-y-scroll scrollbar-hide">
            {loading && (
              <>
                <div className="w-[298px] h-[196px] mb-[17px] rounded-[13px] border-[1px] border-[#D3D3D3] animate-pulse" />
                <div className="w-[298px] h-[196px] mb-[17px] rounded-[13px] border-[1px] border-[#D3D3D3] animate-pulse" />
              </>
            )}

            {error && !loading && (
              <div className="text-[16px] text-[#ff4d4f] mt-[35px] w-[298px]">
                인기 공고를 불러오지 못했어요.
              </div>
            )}

            {!loading && !error && jobs.length === 0 && (
              <div className="text-[16px] text-[#707070] mt-[35px] w-[298px] ">
                표시할 공고가 없습니다. <br /> 새로운 공고를 추가해주세요!
              </div>
            )}

            {!loading &&
              !error &&
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[17px] rounded-[13px] border-[1px] border-[#D3D3D3]"
                >
                  <span className="text-center text-[16px] font-medium mt-[13px]">
                    {job.roadAddress}
                  </span>
                  {job.images &&
                  job.images.length > 0 &&
                  job.images[0]?.imageUrl ? (
                    <img
                      src={job.images[0].imageUrl}
                      alt={job.images[0].originalFileName ?? job.title}
                      className="w-[230px] h-[133px] object-cover rounded-[10px] border-[1.3px] border-[#A0A0A0]"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = 'none';
                        (
                          e.currentTarget.nextElementSibling as HTMLElement
                        )?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div
                    className={`${
                      job.images && job.images.length > 0 ? 'hidden' : ''
                    } w-[230px] h-[133px] text-[13px] bg-gray-100 rounded-[10px] border-[1.3px] border-[#A0A0A0] flex items-center justify-center text-gray-400`}
                  >
                    이미지 없음
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAfterLogin;
