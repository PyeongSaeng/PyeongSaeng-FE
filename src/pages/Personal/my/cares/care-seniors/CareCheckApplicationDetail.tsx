import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageField from '../../../../../shared/components/field/ImageField';
import TextField from '../../../../../shared/components/field/TextField';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import { getSeniorData } from '../../../apis/my/seniorMy';
import Loading from '../../../../../shared/components/Loading';
import {
  ApplicationDetail,
  ImageObject,
  questionAndAnswer,
  LinkedSenior,
} from '../../../types/userInfo';
import {
  formatMoney,
  formatPhone,
} from '../../../../../shared/utils/userInfoUtils';

const Gender = {
  FEMALE: '여성',
  MALE: '남성',
} as const;

const CareCheckApplicationDetail = () => {
  const { seniorId, applicationId } = useParams();
  const seniorIdNum = seniorId ? Number(seniorId) : undefined;
  const [seniorData, setSeniorData] = useState<LinkedSenior>();
  const [applicationData, setApplicationData] =
    useState<ApplicationDetail | null>(null);
  const [answerData, setAnswerData] = useState<questionAndAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const viewData = [
    { label: '거리', value: applicationData?.travelTime },
    {
      label: '주소',
      value:
        applicationData?.roadAddress + ' ' + applicationData?.detailAddress,
    },
    {
      label: '시급',
      value:
        applicationData?.hourlyWage && formatMoney(applicationData?.hourlyWage),
      unit: '원',
    },
    { label: '근무시간', value: applicationData?.workingTime },
    {
      label: '월급',
      value:
        applicationData?.monthlySalary &&
        formatMoney(applicationData?.monthlySalary),
      unit: '원',
    },
    {
      label: '연봉',
      value:
        applicationData?.yearSalary && formatMoney(applicationData?.yearSalary),
      unit: '원',
    },
  ];

  // 시니어 데이터 조회
  useEffect(() => {
    setLoading(true);
    getSeniorData('/api/user/seniors')
      .then((data) => {
        const value = data.result.find(
          (d: LinkedSenior) => d.seniorId === seniorIdNum
        );
        setSeniorData(value);
      })
      .catch((err) => console.error('시니어 데이터 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [seniorIdNum]);

  // 지원서 상세 조회
  useEffect(() => {
    setLoading(true);
    getSeniorData(
      `/api/applications/protector/senior/${seniorId}/details/${applicationId}`
    )
      .then((data) => {
        const res = data.result;
        setApplicationData(res);
        setAnswerData(res.questionAndAnswerList);
      })
      .catch((err) => console.error('지원서 상세 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [seniorId, applicationId]);

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
            <div className="w-[292px] min-h-[165px] rounded-[10px] border-[1.3px] border-[#A4A4A4] overflow-hidden">
              <img
                className="w-[292px] h-[165px] rounded-[10px]"
                src={applicationData?.images?.[0]?.imageUrl}
                alt="기업 대표 사진"
              />
            </div>
            <div className="flex flex-col justify-around w-[297px] h-auto px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] font-[600] pb-[12px]">
                {applicationData?.title}
              </span>
              <div className="leading-[1.8]">
                {viewData.map((data, idx) => {
                  if (data.value) {
                    return (
                      <div key={idx} className="flex justify-between">
                        <div className="min-w-[40px]">{data.label}</div>
                        <div className="text-right">{data.value}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex flex-col justify-around w-[297px] h-[221px] px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] textfont-[600] pb-[12px]">
                기본 정보
              </span>
              <div className="leading-[1.8]">
                <div className="flex justify-between">
                  <span>성함</span>
                  <span>{seniorData?.seniorName}</span>
                </div>
                <div className="flex justify-between">
                  <span>성별</span>
                  <span>
                    {seniorData?.gender ? Gender[seniorData.gender] : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>나이</span>
                  <span>{seniorData?.age}세</span>
                </div>
                <div className="flex justify-between">
                  <span>전화번호</span>
                  <span>
                    {seniorData?.seniorPhone &&
                      formatPhone(seniorData?.seniorPhone)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>거주지</span>
                  <span>
                    {seniorData?.roadAddress + ' ' + seniorData?.detailAddress}
                  </span>
                </div>
              </div>
            </div>
            {answerData.length > 0 ? (
              <>
                {answerData.map((answer, idx) => {
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

export default CareCheckApplicationDetail;
