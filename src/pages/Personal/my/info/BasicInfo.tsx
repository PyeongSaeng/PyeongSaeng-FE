type info = {
  id: number;
  username: string;
  name: string;
  phone: string;
  age: number;
  password: string;
  roadAddress: string;
  detailAddress: string;
  job: string;
  experincePeriod: string;
};

const dummyInfo: info = {
  id: 1,
  username: '김영희',
  name: 'youngid',
  phone: '010-0000-0000',
  age: 63,
  password: '1234',
  roadAddress: '대지로 49',
  detailAddress: '203동 105호',
  job: '주부',
  experincePeriod: '10년 이상',
};

const infoData = [
  { label: '이름', value: dummyInfo.name },
  { label: 'id', value: dummyInfo.id },
  { label: '비밀번호', value: '수정화면에서 변경하세요' },
  { label: '나이', value: dummyInfo.age },
  { label: '연락처', value: dummyInfo.phone },
  {
    label: '거주지',
    value: dummyInfo.roadAddress,
  },
  { label: '', value: dummyInfo.detailAddress },
  { label: '직무', value: dummyInfo.job },
  { label: '기간', value: dummyInfo.experincePeriod },
];

const BasicInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center text-[16px] font-[Pretendard] font-[500]">
      <div className="py-[6px]">
        {infoData.map(({ label, value }) => (
          <div
            key={label}
            className="w-full flex justify-center text-black leading-[2.8]"
          >
            <span className="w-[140px] pl-[30px] flex justify-end items-center text-[18px] text-[#414141]">
              {label}
            </span>
            <span className="w-full flex justify-center items-center text-[#C2C2C2]">
              {label === '비밀번호' ? (
                <div className="w-[200px] h-[40px] rounded-[8px] border-[1px] border-[#E1E1E1] text-[14px] text-center">
                  {value}
                </div>
              ) : typeof value === 'string' && value.includes('\n') ? (
                <div className="text-center leading-tight">
                  {value.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              ) : (
                value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInfo;
