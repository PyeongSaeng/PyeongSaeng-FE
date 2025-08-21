import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../../../../shared/components/topbar/Topbar';
import { getSeniorData } from '../../apis/my/seniorMy';
import { ApplicationDetail, ImageObject, Info } from '../../types/userInfo';
import {
  formatMoney,
  formatPhone,
} from '../../../../shared/utils/userInfoUtils';
import ImageField from '../../../../shared/components/field/ImageField';
import TextField from '../../../../shared/components/field/TextField';
import { questionAndAnswer } from '../../types/userInfo';
import Loading from '../../../../shared/components/Loading';

const SeniorApplyDetail = () => {
  const [seniorData, setSeniorData] = useState<Info | null>(null);
  const { applicationId } = useParams();
  const [applicationDetail, setApplicationDetail] =
    useState<ApplicationDetail | null>();
  const [answerData, setAnswerData] = useState<questionAndAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 시니어 데이터 조회
  useEffect(() => {
    setLoading(true);
    getSeniorData('/api/user/senior/me')
      .then((data) => setSeniorData(data.result))
      .catch((err) => console.error('시니어 데이터 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, []);

  // 시니어 지원서 상세조회
  useEffect(() => {
    setLoading(true);
    getSeniorData(`/api/applications/me/details/${applicationId}`)
      .then((data) => {
        const res = data.result;
        setApplicationDetail(res as ApplicationDetail);
        setAnswerData(res.questionAndAnswerList);
      })
      .catch((err) => console.error('지원정보 조회 에러', err))
      .finally(() => setLoading(false));
  }, [applicationId]);

  const viewData = [
    {
      label: '거리',
      value: applicationDetail?.travelTime,
    },
    {
      label: '주소',
      value:
        applicationDetail?.roadAddress + ' ' + applicationDetail?.detailAddress,
    },
    {
      label: '시급',
      value:
        applicationDetail?.hourlyWage &&
        formatMoney(applicationDetail?.hourlyWage),
      unit: '원',
    },
    {
      label: '근무시간',
      value: applicationDetail?.workingTime,
    },
    {
      label: '월급',
      value:
        applicationDetail?.monthlySalary &&
        formatMoney(applicationDetail?.monthlySalary),
      unit: '원',
    },
    {
      label: '연봉',
      value:
        applicationDetail?.yearSalary &&
        formatMoney(applicationDetail?.yearSalary),
      unit: '원',
    },
  ];

  return (
    <div className="flex flex-col">
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] border-b-[1.3px] border-[#CCCCCC]">
          신청 결과
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="h-[572px] overflow-y-scroll scrollbar-hide flex flex-col justify-start items-center gap-[16px] py-[20px] text-[14px] font-[500] text-[Pretendard] text-[#414141]">
            <div className="w-[292px] h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4]">
              <img
                className="w-[292px] h-[165px] rounded-[10px]"
                src={applicationDetail?.images[0].imageUrl}
                alt="기업 대표 사진"
              />
            </div>
            <div className="flex flex-col justify-around w-[297px] h-[173px] px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] font-[600] pb-[12px]">
                {applicationDetail?.title}
              </span>
              <div className="leading-[1.8]">
                {viewData.map((data, idx) => {
                  if (data.value) {
                    return (
                      <div key={idx} className="flex justify-between">
                        <span>{data.label}</span>
                        <div>
                          <span>{data.value}</span>
                          {data.unit && <span>{data.unit}</span>}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex flex-col justify-around w-[297px] h-auto px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] font-[pretendard JP] font-[600] pb-[12px]">
                기본 정보
              </span>
              <div className="leading-[1.8]">
                <div className="flex gap-[5px]">
                  <div className="w-[80px]">성함</div>
                  <div className="w-[180px]">{seniorData?.name}</div>
                </div>
                {/* <div className="flex gap-[5px]">
                <div className="w-[80px]">성별</div>
                <div className="w-[180px]">{seniorData?.gender}</div>
              </div> */}
                <div className="flex gap-[5px]">
                  <div className="w-[80px]">나이</div>
                  <div className="w-[180px]">{seniorData?.age}세</div>
                </div>
                <div className="flex gap-[5px]">
                  <div className="w-[80px]">전화번호</div>
                  <div className="w-[180px]">
                    {seniorData?.phone && formatPhone(seniorData?.phone)}
                  </div>
                </div>
                <div className="flex gap-[5px]">
                  <div className="w-[80px]">거주지</div>
                  <div className="w-[180px]">
                    {seniorData?.roadAddress + ' ' + seniorData?.detailAddress}
                  </div>
                </div>
              </div>
            </div>
            {answerData?.length > 0 ? (
              <>
                {answerData?.map((answer, idx) => {
                  if (answer.fieldType === 'IMAGE') {
                    return (
                      <ImageField
                        key={idx}
                        fieldName={answer.fieldName}
                        answerContent={answer.answerContent as ImageObject}
                      />
                    );
                  } else if (answer.fieldType === 'TEXT') {
                    return (
                      <TextField
                        key={idx}
                        fieldName={answer.fieldName}
                        answerContent={answer.answerContent as string}
                      />
                    );
                  }
                })}
              </>
            ) : undefined}
          </div>
        )}
      </Topbar>
    </div>
  );
};

export default SeniorApplyDetail;
