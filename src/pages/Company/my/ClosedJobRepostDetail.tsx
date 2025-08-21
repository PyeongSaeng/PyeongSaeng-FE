import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Topbar from '../../../shared/components/topbar/Topbar';
import { RepostJob } from '../types/companyInfo';
import { getCompanyData } from '../apis/companyMy';
import Loading from '../../../shared/components/Loading';

const ClosedJobRepostDetail = () => {
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const [jobData, setJobData] = useState<RepostJob>();
  const [loading, setLoading] = useState<boolean>(false);

  // 채용공고 내용 불러오기
  useEffect(() => {
    setLoading(true);
    getCompanyData(`/api/job/posts/${jobPostId}/detail`)
      .then((data) => {
        setJobData(data.result);
      })
      .catch((err) => console.error('채용공고 상세 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [jobPostId]);
  return (
    <div>
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] font-[semibold] border-b-[1.3px] border-[#CCCCCC]">
          마감된 공고 다시 올리기
        </div>
        {loading ? (
          <Loading />
        ) : (
          jobData && (
            <Outlet key={location.pathname} context={{ jobData, setJobData }} />
          )
        )}
      </Topbar>
    </div>
  );
};

export default ClosedJobRepostDetail;
