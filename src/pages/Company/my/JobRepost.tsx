import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import DaumPostcode from 'react-daum-postcode';
import Topbar from '../../../shared/components/topbar/Topbar';
import { RepostJob } from '../types/companyInfo';
import { getCompanyData } from '../apis/companyMy';
import Loading from '../../../shared/components/Loading';

const truncate = (str: string) => {
  if (!str) return '';

  const segmenter = new Intl.Segmenter('ko', { granularity: 'grapheme' });
  const graphemes = [...segmenter.segment(str)].map((s) => s.segment);

  if (graphemes.length > 10) {
    return graphemes.slice(0, 10).join('') + '...';
  }
  return str;
};

const JobRepost = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [originalJobData, setoriginalJobData] = useState<RepostJob>(); // 원본
  const [editedJobData, setEditedJobData] = useState<Partial<RepostJob>>({}); // 서버제출
  const [companyImg, setCompanyImg] = useState<string>('');
  const [isPostcodeOpen, setIsPostCodeOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleRoadAddress = (data: any) => {
    // handleChange('roadAddress', data.roadAddress);
    setIsPostCodeOpen(false);
  };

  const handleDownload = async (keyName: string) => {
    const result = await getCompanyData(
      `/api/s3/presigned/download?keyName=${keyName}`
    );
    const presignedUrl = result.result.url;

    window.open(presignedUrl, '_blank');
  };

  // 채용공고 내용 불러오기
  useEffect(() => {
    setLoading(true);
    getCompanyData(`/api/job/posts/${applicationId}/detail`)
      .then((data) => {
        setoriginalJobData(data.result);
        setEditedJobData(data.result);
        setCompanyImg(data.result.jobPostImageList[0].keyName);
      })
      .catch((err) => console.error('채용공고 상세 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [applicationId]);

  useEffect(() => {
    console.log(originalJobData);
  }, [originalJobData]);

  return (
    <div>
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] font-[semibold] border-b-[1.3px] border-[#CCCCCC]">
          마감된 공고 다시 올리기
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
            <div className="flex flex-row mt-[26px] gap-[24px]">
              <label className="w-[56px] h-[48px] font-medium text-[#414141] text-[20px] flex justify-center items-center">
                근무지 이미지
              </label>
              <div className="w-[231px] h-[45px] flex justify-center items-center gap-[3px]">
                <FileUpload
                  imagefile={
                    editedJobData?.jobPostImageList?.[0]?.originalFileName ?? ''
                  }
                  keyName={editedJobData?.jobPostImageList?.[0]?.keyName ?? ''}
                  download={handleDownload}
                />
              </div>
            </div>

            <div className="flex flex-row mt-[15px] mb-[3px] gap-[14px]">
              <label className="mt-[19px] font-medium text-[#414141] text-[20px]">
                근무지
              </label>
              <div className="w-[251px] h-[120px] pl-[12px] flex flex-col gap-[10px] items-center justify-center">
                <div className="flex jusity-between gap-[4px]">
                  <input
                    className={clsx(
                      'w-[141px] h-[45px] px-[10px] py-[4px] text-[16px] text-[#C2C2C2] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px] focus:text-black truncate'
                    )}
                    value={editedJobData?.roadAddress}
                    onClick={() => setIsPostCodeOpen(true)}
                  />
                  <button
                    type="button"
                    className="w-[83px] h-[45px] rounded-[8px] bg-[#0D29B7] text-white text-[14px] font-[Pretendard JP] "
                    onClick={() => setIsPostCodeOpen(true)}
                  >
                    주소 검색
                  </button>
                </div>
                <input
                  className="w-[231px] h-[45px] px-[10px] py-[4px] text-[#C2C2C2] text-[16px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
                  value={editedJobData?.detailAddress}
                  onChange={(e) =>
                    setEditedJobData((prev) =>
                      prev
                        ? {
                            ...prev,
                            detailAddress: e.target.value,
                          }
                        : prev
                    )
                  }
                />
              </div>
            </div>

            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
              <label className="w-[70px] text-[20px] text-[#414141] font-medium">
                근무내용
              </label>
              <textarea
                // type="text"
                placeholder="ex) 환경 미화"
                className="w-[231px] h-[80px] resize-none border border-[#E1E1E1] rounded-[8px] text-[#C2C2C2] text-[16px] placeholder:text-[#c2c2c2] focus:text-black focus:outline-black"
                value={editedJobData?.description}
                onChange={(e) =>
                  setEditedJobData((prev) =>
                    prev
                      ? {
                          ...prev,
                          description: e.target.value,
                        }
                      : prev
                  )
                }
              />
            </div>

            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
              <label className="w-[70px] text-[20px] text-[#414141] font-medium">
                시급
              </label>
              <input
                type="number"
                placeholder="ex) 15000"
                className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[#C2C2C2] text-[16px] text-center placeholder:text-[#c2c2c2] focus:text-black focus:outline-black"
                value={editedJobData?.hourlyWage}
                onChange={(e) =>
                  setEditedJobData((prev) =>
                    prev
                      ? {
                          ...prev,
                          hourlyWage: Number(e.target.value),
                        }
                      : prev
                  )
                }
              />
            </div>

            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
              <label className="w-[70px] text-[20px] text-[#414141] font-medium">
                근무일수
              </label>
              <input
                type="text"
                placeholder="ex) 주 3일, 평일 오전 등"
                className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-[#C2C2C2] text-center placeholder:text-[#C2C2C2] focus:text-black focus:outline-black"
                value={editedJobData?.workingTime}
                onChange={(e) =>
                  setEditedJobData((prev) =>
                    prev
                      ? {
                          ...prev,
                          workingTime: e.target.value,
                        }
                      : prev
                  )
                }
              />
            </div>

            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
              <label className="w-[70px] text-[20px] text-[#414141] font-medium">
                마감기한
              </label>
              <input
                type="date"
                className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[#C2C2C2] text-[16px] text-center text-[#000000] px-[12px] focus:text-black focus:outline-black"
                value={editedJobData?.deadline}
                onChange={(e) =>
                  setEditedJobData((prev) =>
                    prev
                      ? {
                          ...prev,
                          deadline: e.target.value,
                        }
                      : prev
                  )
                }
              />
            </div>

            <button className="w-[294px] mt-[24px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium mb-[44px] p-5">
              신청서 양식 작성하기
            </button>
          </div>
        )}
      </Topbar>
      {isPostcodeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div
            className="bg-white p-4 rounded-lg shadow-lg
                 transition-all duration-300 ease-out
                 opacity-0 scale-95 animate-fadeIn"
          >
            <DaumPostcode onComplete={handleRoadAddress} autoClose />
            <button
              className="mt-[2px] px-[10px] py-[6px] bg-gray-300 rounded text-[16px]"
              onClick={() => setIsPostCodeOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRepost;

interface FileUploadProps {
  imagefile: string;
  keyName: string;
  download: (keyName: string) => void;
}

const FileUpload = ({ imagefile, keyName, download }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(imagefile);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex justify-center items-center gap-[3px]">
      <div
        className={clsx(
          fileName ? 'border-[#0D29B7]' : 'border-[#E1E1E1]',
          'flex flex-row justify-center items-center w-[180px] h-[45px] rounded-[8px] border-[1px]'
        )}
      >
        {fileName ? (
          <>
            <span
              className="text-[16px] text-[#0D29B7] font-[700]"
              onClick={() => download(keyName)}
            >
              {truncate(fileName)}
            </span>
            <IoClose size={20} onClick={() => setFileName('')} />
          </>
        ) : (
          <span className="text-[16px] text-[#C2C2C2]">파일 없음</span>
        )}
      </div>
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-[48px] h-[45px] rounded-[8px] px-3 py-2 bg-[#0D29B7] text-white text-[16px] font-[Pretendard JP]"
      >
        검색
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
