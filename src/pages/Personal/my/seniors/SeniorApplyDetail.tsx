import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Topbar from '../../../../shared/components/topbar/Topbar';
import { getSeniorData } from '../../apis/my/seniorMy';
import { ApplicationDetail, ImageObject } from '../../types/userInfo';
import { formatPhone } from '../../../../shared/utils/userInfoUtils';
import axiosInstance from '../../../../shared/apis/axiosInstance';

const SeniorApplyDetail = () => {
  const location = useLocation();
  const { seniorData } = location.state || {};
  const { applicationId } = useParams();
  const [applicationDetail, setApplicationDetail] =
    useState<ApplicationDetail | null>();

  useEffect(() => {
    getSeniorData(`/api/applications/me/details/${applicationId}`)
      .then((data) => setApplicationDetail(data.result as ApplicationDetail))
      .catch((err) => console.error('지원정보 조회 에러', err));
  }, [applicationId]);

  useEffect(() => {
    console.log(applicationDetail);
  }, [applicationDetail]);

  const handleFileView = async (keyName: string) => {
    try {
      const res = await axiosInstance.post(
        '/api/s3/presigned/download',
        keyName
      );
      const presignedUrl = res.data?.result?.url;

      if (presignedUrl) {
        window.open(presignedUrl, '_blank'); //새 탭에서 열기
      } else {
        alert('파일 url을 가져오지 못했습니다');
      }
    } catch (err) {
      console.error('파일 열기 실패: ', err);
      alert('파일을 불러오는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col">
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] border-b-[1.3px] border-[#CCCCCC]">
          신청 결과
        </div>
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
              <div className="flex justify-between">
                <span>거리</span>
                <span>{applicationDetail?.travelTime}</span>
              </div>
              <div className="flex justify-between">
                <span>시급</span>
                <span>{applicationDetail?.hourlyWage}원</span>
              </div>
              <div className="flex justify-between">
                <span>근무시간</span>
                <span>{applicationDetail?.workingTime}</span>
              </div>
              {applicationDetail?.yearSalary && (
                <div className="flex justify-between">
                  <span>연봉</span>
                  <span>{applicationDetail?.yearSalary}만원</span>
                </div>
              )}
              {applicationDetail?.monthlySalary && (
                <div className="flex justify-between">
                  <span>월급</span>
                  <span>{applicationDetail?.monthlySalary}만원</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-around w-[297px] h-auto px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
            <span className="text-[16px] textfont-[600] pb-[12px]">
              기본 정보
            </span>
            <div className="leading-[1.8]">
              <div className="flex gap-[5px]">
                <div className="w-[80px]">성함</div>
                <div className="w-[180px]">{seniorData?.userName}</div>
              </div>
              <div className="flex gap-[5px]">
                <div className="w-[80px]">나이</div>
                <div className="w-[180px]">{seniorData?.age}세</div>
              </div>
              <div className="flex gap-[5px]">
                <div className="w-[80px]">전화번호</div>
                <div className="w-[180px]">
                  {formatPhone(seniorData?.phone)}
                </div>
              </div>
              <div className="flex gap-[5px]">
                <div className="w-[80px]">주민등록번호</div>
                <div className="w-[180px]">
                  {applicationDetail?.zipcode + '-*******'}
                </div>
              </div>
              <div className="flex gap-[5px]">
                <div className="w-[80px]">거주지</div>
                <div className="w-[180px]">
                  {seniorData?.roadAddress} {seniorData?.detailAddress}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-around w-[297px] h-auto rounded-[13px] px-[16px] py-[10px] border-[1.3px] border-[#08D485]">
            <span className="text-[16px] font-[600] pb-[12px]">지원 내용</span>
            <div className="flex justify-between">
              <span>
                {applicationDetail?.questionAndAnswerList.map((answer) => {
                  if (answer.fieldType === 'IMAGE') return null;
                  return (
                    <div className="leading-[1.8]" key={answer.fieldName}>
                      <div className="flex gap-[5px]">
                        <div className="w-[80px]">{answer.fieldName}</div>
                        <div className="w-[180px]">
                          {answer.answerContent as string}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-[14px] font-[Pretendard JP] font-[400] w-[297px] h-auto">
            <label className="flex justify-start items-center text-[#747474]">
              첨부 파일
            </label>

            {applicationDetail?.questionAndAnswerList.some(
              (answer) => answer.fieldType === 'IMAGE'
            ) ? (
              <div className="flex flex-col gap-[8px] mt-[8px]">
                {applicationDetail?.questionAndAnswerList
                  .filter((answer) => answer.fieldType === 'IMAGE')
                  .map((answer) => {
                    const imageObj = answer.answerContent as ImageObject;
                    return (
                      <div
                        key={answer.fieldName}
                        className="flex justify-between items-center w-full h-[45px] p-[12px] rounded-[8px] border-[1.3px] border-[#08D485] cursor-pointer"
                        onClick={() => handleFileView(imageObj.keyName)}
                      >
                        <span className="truncate">{answer.fieldName}</span>
                        <span className="text-blue-500 underline truncate max-w-[150px]">
                          {imageObj.originalFileName}
                        </span>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <span className="mt-[8px] text-center text-gray-500">
                첨부된 파일 없음
              </span>
            )}
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default SeniorApplyDetail;
