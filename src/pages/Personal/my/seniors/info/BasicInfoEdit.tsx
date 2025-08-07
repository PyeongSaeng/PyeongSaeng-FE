import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  { label: '이름', key: dummyInfo.username },
  { label: 'id', key: dummyInfo.name },
  { label: '비밀번호', key: 'password' },
  { label: '나이', key: dummyInfo.age },
  { label: '연락처', key: 'phone' },
  { label: '거주지', key: 'roadAddress' },
  { label: '', key: 'detailAddress' },
  { label: '직무', key: 'job' },
  { label: '기간', key: 'experincePeriod' },
];

const BasicInfoEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: dummyInfo.phone,
    roadAddress: dummyInfo.roadAddress,
    detailAddress: dummyInfo.detailAddress,
    job: dummyInfo.job,
    experincePeriod: dummyInfo.experincePeriod,
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 수정 필요
  return (
    <div className="flex flex-col justify-center items-center text-[16px] font-[Pretendard] font-[500]">
      <div className="py-[6px]">
        {infoData.map(({ label, key }) => (
          <div
            key={label}
            className="w-full flex justify-center text-black leading-[2.8]"
          >
            <span className="w-[140px] pl-[30px] flex justify-end items-center text-[18px] text-[#414141]">
              {label}
            </span>
            <span className="w-full flex justify-center items-center text-[#C2C2C2]">
              {
                // 비밀번호 수정버튼
                key === 'password' ? (
                  <button
                    type="button"
                    className="w-[200px] h-[40px] rounded-[8px] bg-[#08D485] text-[16px] text-white"
                    onClick={() =>
                      navigate('/personal/my/info/basic/edit/password')
                    }
                  >
                    수정
                  </button>
                ) : // 주소 검색
                key === 'roadAddress' ? (
                  <div className="flex jusity-between gap-[4px]">
                    <input
                      className="w-[146px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px]"
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                    <button className="w-[50px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[14px] font-[Pretendard JP]">
                      검색
                    </button>
                  </div>
                ) : key === 'phone' || key === 'detailAddress' ? (
                  <input
                    className="w-[200px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px]"
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ) : // 드롭다운메뉴 사용파트
                key === 'job' ? (
                  <select
                    className="w-[200px] h-[45px] border-[1.3px] border-[#E1E1E1] rounded-[8px]"
                    value={formData.job}
                    onChange={(e) => handleChange('job', e.target.value)}
                  >
                    <option value="주부">주부</option>
                    <option value="자영업">자영업</option>
                    <option value="직장인">직장인</option>
                    <option value="기타">기타</option>
                  </select>
                ) : key === 'experincePeriod' ? (
                  <select
                    className="w-[200px] h-[45px] border-[1.3px] border-[#E1E1E1] rounded-[8px]"
                    value={formData.experincePeriod}
                    onChange={(e) =>
                      handleChange('experincePeriod', e.target.value)
                    }
                  >
                    <option value="1년 미만">1년 미만</option>
                    <option value="1~3년">1~3년</option>
                    <option value="3~5년">3~5년</option>
                    <option value="5~10년">5~10년</option>
                    <option value="10년 이상">10년 이상</option>
                  </select>
                ) : (
                  // 나머지 뷰 전용
                  key
                )
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInfoEdit;
