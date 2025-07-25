interface JobInfoSectionProps {
  jobName: string;
  info: {
    name: string;
    gender: string;
    age: string;
    phone: string;
    idNumber: string;
    address: string;
  };
}

const JobInfoSection = ({ jobName, info }: JobInfoSectionProps) => {
  return (
    <>
      {/* 선택한 일자리 */}
      <div className="w-full max-w-[320px] mb-6">
        <button className="w-full h-[4.5rem] border border-[#08D485] text-[#414141] rounded-md text-[16px] font-medium">
          {jobName}
        </button>
      </div>

      {/* 기본 정보 박스 */}
      <div className="w-full max-w-[320px] border border-[#08D485] rounded-[8px] p-4 mb-10">
        <h3 className="text-[16px] font-semibold text-[#414141] mb-4">
          기본 정보
        </h3>
        <p className="text-[14px] text-[#414141] mb-1">성함: {info.name}</p>
        <p className="text-[14px] text-[#414141] mb-1">성별: {info.gender}</p>
        <p className="text-[14px] text-[#414141] mb-1">나이: {info.age}</p>
        <p className="text-[14px] text-[#414141] mb-1">
          전화번호: {info.phone}
        </p>
        <p className="text-[14px] text-[#414141] mb-1">
          주민등록번호: {info.idNumber}
        </p>
        <p className="text-[14px] text-[#414141]">거주지: {info.address}</p>
      </div>
    </>
  );
};

export default JobInfoSection;
