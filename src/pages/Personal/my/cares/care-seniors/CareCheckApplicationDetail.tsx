import { useState } from 'react';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import dummy1 from '../../../../../shared/assets/popular-dummy1.png';

type TjobData = {
  job: string;
  distance: string;
  pay: string;
  hours: string;
  salary: string;
};

type TuserInfo = {
  name: string;
  sex: string;
  age: number;
  phone: string;
  residentNumber: string;
  address: string;
};

type Tmotivation = {
  motivation: string;
};

const jobData: TjobData = {
  job: '죽전2동 행정복지센터 미화원',
  distance: '도보 및 지하철 20분',
  pay: '12,240',
  hours: '월수금 2시간',
  salary: '29',
};

const userInfo: TuserInfo = {
  name: '김순자',
  sex: '여성',
  age: 63,
  phone: '010-1234-5678',
  residentNumber: '610908-*******',
  address: '대지로 49 203동',
};

const motivation: Tmotivation = {
  motivation:
    '경제적으로 자립하여 손주에게 맛있는 것도 사주고 싶은 마음에, 건강한 몸으로 즐겁게 일하고자 지원했습니다.',
};

const CareCheckApplicationDetail = () => {
  const [seniorInfo, setSeniorInfo] = useState();

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
              src={dummy1}
              alt="더미1"
            />
          </div>
          <div className="flex flex-col justify-around w-[297px] h-[173px] px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
            <span className="text-[16px] font-[600] pb-[12px]">
              {jobData.job}
            </span>
            <div className="leading-[1.8]">
              <div className="flex justify-between">
                <span>거리</span>
                <span>{jobData.distance}</span>
              </div>
              <div className="flex justify-between">
                <span>시급</span>
                <span>{jobData.pay}원</span>
              </div>
              <div className="flex justify-between">
                <span>근무시간</span>
                <span>{jobData.hours}</span>
              </div>
              <div className="flex justify-between">
                <span>월급</span>
                <span>{jobData.salary}만원</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-around w-[297px] h-[221px] px-[16px] py-[10px] rounded-[13px] border-[1.3px] border-[#08D485]">
            <span className="text-[16px] textfont-[600] pb-[12px]">
              기본 정보
            </span>
            <div className="leading-[1.8]">
              <div className="flex justify-between">
                <span>성함</span>
                <span>{userInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span>성별</span>
                <span>{userInfo.sex}</span>
              </div>
              <div className="flex justify-between">
                <span>나이</span>
                <span>{userInfo.age}세</span>
              </div>
              <div className="flex justify-between">
                <span>전화번호</span>
                <span>{userInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>주민등록번호</span>
                <span>{userInfo.residentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>거주지</span>
                <span>{userInfo.address}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-around w-[297px] h-[134px] rounded-[13px] px-[16px] py-[10px] border-[1.3px] border-[#08D485]">
            <span className="text-[16px] font-[600] pb-[12px]">지원 동기</span>
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
      </Topbar>
    </div>
  );
};

export default CareCheckApplicationDetail;
