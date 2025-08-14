import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import dummy1 from '../../../../../shared/assets/popular-dummy1.png';
import { getSeniorData } from '../../../apis/my/seniorMy';

type appliedJobs = {
  job: string;
  dueDate: string;
  dayOfWeek: string;
  img: string;
  result: string;
};

const dummyApplies: appliedJobs[] = [
  {
    job: '죽전2동 행정복지센터 미화원',
    dueDate: '7/20',
    dayOfWeek: '일',
    img: dummy1,
    result: '합격',
  },
  {
    job: '죽전도서관 사서',
    dueDate: '7/27',
    dayOfWeek: '일',
    img: dummy1,
    result: '미정',
  },
  {
    job: '죽전2동 동사무소 미화',
    dueDate: '7/27',
    dayOfWeek: '일',
    img: dummy1,
    result: '불합격',
  },
];

type ApplicationList = {
  applicationId: number;
  seniorId: number;
  jobPostId: number;
  seniorName: string;
  applicationStatus: 'NON_STARTED';
};

type Image = {
  jobPostId: number;
  keyName: string;
  imageUrl: string;
  originalFileName: string;
};

type ApplicationDetail = {
  title: string;
  address: string;
  detailAddress: string;
  roadAddress: string;
  zipcode: string;
  hourlyWage: number | null;
  yearSalary: number | null;
  description: string;
  workingTime: string;
  deadline: string;
  recruitCount: number;
  note: string;
  images: Image[];
  travelTime: string;
};

const filterSenior = (
  applyList: ApplicationList[] | null,
  seniorId: number
) => {
  const value: ApplicationList[] = [];
  applyList?.map((apply) => {
    if (apply.seniorId === seniorId) {
      value.push(apply);
    }
  });
  return value;
};

const ApplyResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const seniorData = location.state?.seniorData;
  const [applicationList, setApplicationList] = useState<
    ApplicationList[] | null
  >(null);

  const [applicationDetail, setApplicationDetail] =
    useState<ApplicationDetail | null>(null);

  useEffect(() => {
    const getSeniorApplication = async () => {
      const res = await getSeniorData('/api/applications/protector');
      setApplicationList(res.result);
    };

    const getSeniorApplicationDetail = async (
      seniorId: number,
      jobPostId: number
    ) => {
      const res = await getSeniorData(
        `/api/job/protector/seniors/${seniorId}/posts/${jobPostId}`
      );
      setApplicationDetail(res.result);
    };

    try {
      getSeniorApplication();

      getSeniorApplicationDetail(1, 21);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // useEffect(() => {
  //   console.log('결과', applicationList);
  //   const fileter = filterSenior(applicationList, seniorData.seniorId);
  //   // console.log('필터: ', fileter);
  // }, [applicationList]);

  return (
    <div>
      <Topbar>
        <div className="text-[16px]">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] border-b-[1.3px] border-[#CCCCCC]">
            신청 결과
          </div>
          <div className="h-[572px] overflow-y-scroll scrollbar-hide">
            {!applicationList ? (
              <div>'지원 목록이 존재하지 않습니다.'</div>
            ) : (
              dummyApplies.map((apply, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center border-b-[1.3px] border-[#CCCCCC] py-[12px]"
                  >
                    <div className="flex justify-between w-[292px] pb-[10px]">
                      <span>{apply.job}</span>
                      <span>
                        ~{apply.dueDate} ({apply.dayOfWeek})
                      </span>
                    </div>
                    <div className="w-[292px] h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4] overflow-hidden">
                      <img
                        className="w-[292px] h-[165px]"
                        src={apply.img}
                        alt="더미1"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-[6px] pt-[16px] pb-[6px]">
                      <button
                        type="button"
                        className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2]"
                      >
                        신청서 확인
                      </button>
                      <button
                        type="button"
                        className="w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]"
                      >
                        {apply.result}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default ApplyResults;
