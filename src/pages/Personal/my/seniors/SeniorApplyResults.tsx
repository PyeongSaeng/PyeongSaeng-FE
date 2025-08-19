import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../../shared/components/topbar/Topbar';
import { getSeniorData } from '../../apis/my/seniorMy';
import { ApplicationType, Info, applicationStatus } from '../../types/userInfo';
import {
  getDayOfWeek,
  formatDate,
} from '../../../../shared/utils/userInfoUtils';
import Loading from '../../../../shared/components/Loading';

const SeniorApplyResults = () => {
  const navigate = useNavigate();

  const [seniorData, setSeniorData] = useState<Info | null>(null);
  const [applicationList, setApplicationList] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 무한 스크롤 상태
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // 기본정보 조회
  useEffect(() => {
    setLoading(true);
    getSeniorData('/api/user/senior/me')
      .then((data) => {
        setSeniorData(data.result as Info);
      })
      .catch((err) => console.error('기본정보 조회 에러', err))
      .finally(() => setLoading(false));
  }, []);

  // 지원서 목록 조회 (페이지 변경)
  useEffect(() => {
    if (isLast) return;

    // 첫 페이지일 땐 loading, 그 외에는 isFetching
    if (page === 1) {
      setLoading(true);
    } else {
      setIsFetching(true);
    }

    getSeniorData(`/api/applications/me/submitted?page=${page}`)
      .then((data) => {
        const result = data.result;
        setApplicationList((prev) => [
          ...prev,
          ...(result.applicationList ?? []),
        ]);
        setIsLast(result.isLast);
      })
      .catch((err) => console.error('지원서 조회 에러', err))
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

  return (
    <div>
      <Topbar>
        <div className="text-[16px]">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] border-b-[1.3px] border-[#CCCCCC]">
            신청 결과
          </div>

          <div className="h-[572px] overflow-y-scroll scrollbar-hide">
            {!loading && applicationList.length === 0 ? (
              <div className="h-full flex justify-center items-center font-[Pretendard JP] font-[600] text-[#747474] text-[18px]">
                지원 목록이 존재하지 않습니다
              </div>
            ) : (
              <>
                {applicationList.map((apply) => (
                  <div
                    key={apply.applicationId}
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
                        className="w-[292px] h-[165px] object-cover"
                        src={
                          apply.images?.[0]?.imageUrl ||
                          '/images/placeholder.png'
                        }
                        alt="기업 대표 이미지"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-[6px] pt-[16px] pb-[6px]">
                      <button
                        type="button"
                        className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2]"
                        onClick={() =>
                          navigate(
                            `/personal/senior-my/applied-results/${apply.applicationId}`,
                            { state: { seniorData } }
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
                ))}
                {isFetching && <Loading />}
                {!isLast && <div ref={loaderRef} style={{ height: '20px' }} />}
              </>
            )}
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default SeniorApplyResults;
