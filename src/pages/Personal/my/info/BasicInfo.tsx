import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface info {
  name: string;
  id: string;
  password: string;
  age: number;
  phone: string;
  address: {
    main: string;
    detail: string;
  };
  job: string;
  period: string;
}

const dummyInfo: info = {
  name: '김영희',
  id: 'youngid',
  password: '1234',
  age: 63,
  phone: '010-0000-0000',
  address: {
    main: '대지로 49',
    detail: '203동 105호',
  },
  job: '주부',
  period: '10년 이상',
};

const infoData = [
  { label: '이름', value: dummyInfo.name },
  { label: 'id', value: dummyInfo.id },
  { label: '비밀번호', value: '*****' },
  { label: '나이', value: dummyInfo.age },
  { label: '연락처', value: dummyInfo.phone },
  {
    label: '거주지',
    value: `${dummyInfo.address.main}\n${dummyInfo.address.detail}`,
  },
  { label: '직무', value: dummyInfo.job },
  { label: '기간', value: dummyInfo.period },
];

const BasicInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-[16px] font-[500]">
      <div className="py-[26px]">
        {infoData.map(({ label, value }) => (
          <div
            key={label}
            className="w-full flex justify-center gap-[30px] text-black leading-[2.8]"
          >
            <span className="w-[140px] pl-[30px] flex justify-end items-center text-[18px] text-[#414141]">
              {label}
            </span>
            <span className="w-full flex justify-center items-center text-[#C2C2C2] text-[16px]">
              {label === '비밀번호' ? (
                <button
                  className="w-[170px] h-[40px] rounded-[8px] font-[Pretendard] text-white bg-[#08D485]"
                  onClick={() => navigate('/personal/my/info/password')}
                >
                  수정
                </button>
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
      <button
        type="button"
        className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white"
        onClick={() => navigate('/personal/my/info/edit')}
      >
        수정
      </button>
    </div>
  );
};

export default BasicInfo;
