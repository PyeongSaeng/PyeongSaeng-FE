import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import { getSeniorData } from '../../../apis/my/seniorMy';
import { ApplicationType, applicationStatus } from '../../../types/userInfo';
import {
  getDayOfWeek,
  formatDate,
} from '../../../../../shared/utils/userInfoUtils';
import Loading from '../../../../../shared/components/Loading';

const CareCheckApplicationResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const seniorData = location.state?.seniorData;
  const [applicationList, setApplicationList] = useState<ApplicationType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // 무한 스크롤 상태
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 지원서 목록 조회 (페이지 변경)
  useEffect(() => {
    if (isLast) return;

    setLoading(true);
    getSeniorData(
      `/api/applications/senior/${seniorData.seniorId}/submitted?${page}`
    )
      .then((data) => {
        const result = data.result;
        setApplicationList((prev) => [
          ...prev,
          ...(result.applicationList ?? []),
        ]);
        setIsLast(result.isLast);
      })
      .catch((err) => console.error('지원서 목록 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [page, isLast, seniorData]);

  // Intersection Observer로 페이지 증가
  useEffect(() => {
    if (isLast) return;

    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading) {
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
  }, [isLast, loading]);

  return (
    <div>
      <Topbar>
        <div className="text-[16px]">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] border-b-[1.3px] border-[#CCCCCC]">
            신청 결과
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="h-[572px] overflow-y-scroll scrollbar-hide">
              {applicationList?.length === 0 ? (
                <div className="h-full flex justify-center items-center font-[Pretendard JP] font-[600] text-[#747474] text-[18px]">
                  지원 목록이 존재하지 않습니다
                </div>
              ) : (
                applicationList?.map((apply, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center border-b-[1.3px] border-[#CCCCCC] py-[12px]"
                    >
                      <div className="flex justify-between w-[292px] pb-[10px]">
                        <span>{apply.title}</span>
                        <span>
                          {formatDate(apply.deadline)} (
                          {getDayOfWeek(apply.deadline)})
                        </span>
                      </div>
                      <div className="w-[292px] h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4] overflow-hidden">
                        <img
                          className="w-[292px] h-[165px]"
                          src={apply.images[0].imageUrl}
                          alt="기업 대표 이미지"
                        />
                      </div>
                      <div className="flex justify-center items-center gap-[6px] pt-[16px] pb-[6px]">
                        <button
                          type="button"
                          className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2]"
                          onClick={() =>
                            navigate(
                              `/personal/care-my/senior/application-results/${apply.applicationId}`,
                              {
                                state: {
                                  seniorData: seniorData,
                                },
                              }
                            )
                          }
                        >
                          신청서 확인
                        </button>
                        <button
                          type="button"
                          className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]"
                        >
                          {applicationStatus[apply.applicationStatus]}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </Topbar>
    </div>
  );
};

export default CareCheckApplicationResults;
