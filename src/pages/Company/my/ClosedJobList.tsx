import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../shared/components/topbar/Topbar';
import { getCompanyData } from '../apis/companyMy';
import { JobPost } from '../types/companyInfo';
import Loading from '../../../shared/components/Loading';

// api 확인해보기
// const filterClosed = (object: JobPost[]) => {
//   const closedJobList: JobPost[] = [];
//   object.map((ob: any) => {
//     if (ob.state === 'CLOSED') {
//       closedJobList.push(ob);
//     }
//   });
//   return closedJobList;
// };

const ClosedJopList = () => {
  const navigate = useNavigate();
  const [jobPostList, setJobPostList] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 무한 스크롤 상태
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // 마감 공고 목록 조회 (페이지 변경)
  useEffect(() => {
    if (isLast) return;

    // 첫 페이지일 땐 loading, 그 외에는 isFetching
    if (page === 1) {
      setLoading(true);
    } else {
      setIsFetching(true);
    }

    setLoading(true);
    getCompanyData(`/api/job/companies/me/posts?page=${page}&state=CLOSED`)
      .then((data) => {
        const result = data.result;
        // const closed = filterClosed(result.jobPostList);
        setJobPostList((prev) => [...prev, ...result.jobPostList]);
        setIsLast(result.isLast);
      })
      .catch((err) => console.log('마감 지원서 조회 에러', err))
      .finally(() => {
        setLoading(false);
        setIsFetching(false);
      });
  }, [page, isLast]);

  // Intersection Observer로 페이지 증가
  useEffect(() => {
    if (isLast) return;

    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [isLast, isFetching]);

  useEffect(() => {
    console.log('목록: ', jobPostList);
  }, [jobPostList]);

  return (
    <div>
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] pt-[10px] pb-[26px] font-[semibold]">
          마감된 공고 다시 올리기
        </div>
        <div className="h-[572px] text-[16px] font-[400] font-[Regular] overflow-y-scroll scrollbar-hide">
          {loading ? (
            <Loading />
          ) : !loading && jobPostList.length === 0 ? (
            <div className="h-full flex justify-center items-center font-[Pretendard JP] font-[600] text-[#747474] text-[18px]">
              마감된 채용 목록이 존재하지 않습니다
            </div>
          ) : (
            <>
              {jobPostList.map((post, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center border-b-[1.3px] border-[#CCCCCC] py-[12px]"
                  >
                    <div className="flex justify-between w-[292px] pb-[4px]">
                      <span>{post.title}</span>
                    </div>
                    <div className="w-[292px] h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4] overflow-hidden">
                      <img
                        className="w-[292px] h-[165px]"
                        src={post.images[0].imageUrl}
                        alt="기업 대표 사진"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-[6px] pt-[16px] pb-[6px]">
                      <button
                        type="button"
                        className="w-[294px] h-[45px] rounded-[8px] border-[1.3px] bg-[#0D29B7] text-white"
                        onClick={() => {
                          console.log(post.id);
                          navigate(`/company/jobs/repost/${post.id}/step1`);
                        }}
                      >
                        수정 후 게시
                      </button>
                    </div>
                  </div>
                );
              })}
              {isFetching && <Loading />}
              {!isLast && <div ref={loaderRef} style={{ height: '20px' }} />}
            </>
          )}
        </div>
      </Topbar>
    </div>
  );
};

export default ClosedJopList;
