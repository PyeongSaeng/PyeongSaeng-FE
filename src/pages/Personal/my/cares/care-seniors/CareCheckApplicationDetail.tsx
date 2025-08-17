import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import { getSeniorData } from '../../../apis/my/seniorMy';
import Loading from '../../../../../shared/components/Loading';
import { ApplicationDetail } from '../../../types/userInfo';

type Tmotivation = {
  motivation: string;
};
const motivation: Tmotivation = {
  motivation:
    '경제적으로 자립하여 손주에게 맛있는 것도 사주고 싶은 마음에, 건강한 몸으로 즐겁게 일하고자 지원했습니다.',
};

const CareCheckApplicationDetail = () => {
  const location = useLocation();
  const { seniorData } = location.state || {};
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [fileName, setFileName] = useState<string | null>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  useEffect(() => {
    setLoading(true);
    getSeniorData(
      `/api/job/protector/seniors/${seniorData.seniorId}/posts/${applicationId}`
    )
      .then((data) => setApplicationData(data.result))
      .catch((err) => console.error('지원서 상세 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [applicationId, seniorData]);

  useEffect(() => {
    if (applicationData) {
      console.log('질문 답변 리스트: ', applicationData);
    }
    // console.log(applicationData);
  }, [applicationData]);

  // useEffect(() => {
  //   console.log(seniorData);
  // }, [seniorData]);

  // useEffect(() => {
  //   console.log('jobPostId: ', applicationId);
  // }, [applicationId]);

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
                src={applicationData?.images?.[0]?.imageUrl}
                alt="기업 대표 사진"
              />
            </div>
            <div className="flex flex-col justify-around w-[297px] h-auto px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] font-[600] pb-[12px]">
                {applicationData?.title}
              </span>
              <div className="leading-[1.8]">
                <div className="flex justify-between">
                  <span>거리</span>
                  <span>{applicationData?.travelTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>시급</span>
                  <span>{applicationData?.hourlyWage}원</span>
                </div>
                <div className="flex justify-between">
                  <span>근무시간</span>
                  <span>{applicationData?.workingTime}</span>
                </div>
                {applicationData?.monthlySalary && (
                  <div className="flex justify-between">
                    <span>월급</span>
                    <span>{applicationData?.monthlySalary}만원</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-around w-[297px] h-[221px] px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] textfont-[600] pb-[12px]">
                기본 정보
              </span>
              <div className="leading-[1.8]">
                <div className="flex justify-between">
                  <span>성함</span>
                  <span>{seniorData.seniorName}</span>
                </div>
                <div className="flex justify-between">
                  <span>성별</span>
                  <span>{'여자'}</span>
                </div>
                <div className="flex justify-between">
                  <span>나이</span>
                  <span>{'75'}세</span>
                </div>
                <div className="flex justify-between">
                  <span>전화번호</span>
                  <span>{seniorData.seniorPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span>주민등록번호</span>
                  <span>{'000000-*******'}</span>
                </div>
                <div className="flex justify-between">
                  <span>거주지</span>
                  <span>{'userInfo.address'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-around w-[297px] h-[134px] rounded-[13px] px-[16px] py-[10px] border-[1.3px] border-[#08D485]">
              <span className="text-[16px] font-[600] pb-[12px]">
                지원 동기
              </span>
              <div className="flex justify-between">
                <span>{motivation.motivation}</span>
              </div>
            </div>
            <div className="flex flex-col text-[14px] font-[Pretendard JP] font-[400]">
              <label className="pb-[6px] text-[#747474]">
                사회복지 자격증 이미지
                <span className="text-[#FF0004]"> (필수)</span>
              </label>
              <div className="flex justify-center gap-[11px]">
                <div className="flex justify-between items-center w-[225px] h-[45px] p-[12px] rounded-[8px] border-[1.3px] border-[#08D485]">
                  <span className="truncate">
                    {fileName || '선택된 파일 없음'}
                  </span>
                  {fileName && (
                    <button type="button" onClick={handleRemoveFile}>
                      X
                    </button>
                  )}
                </div>
                <label
                  htmlFor="file-upload"
                  className="flex justify-center items-center w-[61px] h-[45px] rounded-[8px] bg-[#08D485] text-black"
                >
                  검색
                </label>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              ></input>
            </div>
          </div>
        )}
      </Topbar>
    </div>
  );
};

export default CareCheckApplicationDetail;
