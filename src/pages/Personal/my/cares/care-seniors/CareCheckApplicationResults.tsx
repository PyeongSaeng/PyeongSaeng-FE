import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);

  const [applicationList, setApplicationList] = useState<
    ApplicationType[] | null
  >(null);

  useEffect(() => {
    const getSeniorApplication = async () => {
      const res = await getSeniorData(
        `/api/applications/senior/${seniorData.seniorId}/submitted`
      );
      setApplicationList(res.result.applicationList);
    };

    try {
      getSeniorApplication();
      setLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [seniorData]);

  useEffect(() => {
    console.log(seniorData);
  }, [seniorData]);

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
                              `/personal/care-my/application-results/${seniorData.applicationId}`
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
