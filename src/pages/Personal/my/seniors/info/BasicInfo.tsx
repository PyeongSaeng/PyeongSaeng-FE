import { useEffect, useMemo, useState } from 'react';
import { getSeniorData } from '../../../apis/my/seniorMy';
import {
  Info,
  JobTypeLabel,
  ExperiencePeriodLabel,
} from '../../../types/userInfo';
import Loading from '../../../../../shared/components/Loading';

const BasicInfo = () => {
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSeniorData('/api/user/senior/me')
      .then((data) => setInfo(data.result as Info))
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
  }, []);

  const infoData = useMemo(() => {
    if (!info) return [];
    return [
      { label: '이름', value: info.name },
      { label: '아이디', value: info.username },
      { label: '비밀번호', value: '수정화면에서 변경하세요' },
      { label: '나이', value: String(info.age) },
      {
        label: '연락처',
        value: info.phone
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      },
      { label: '거주지', value: `${info.roadAddress}\n${info.detailAddress}` },
      { label: '직무', value: JobTypeLabel[info.job] },
      { label: '기간', value: ExperiencePeriodLabel[info.experiencePeriod] },
    ];
  }, [info]);

  // 디테일 필요
  // if (error) {
  //   return <div>{error}</div>;
  // }

  if (!info) {
    return <Loading />;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center text-[16px] font-[Pretendard] font-[500]">
      <div className="py-[6px]">
        {infoData.map(({ label, value }) => (
          <div
            key={label}
            className="w-full flex justify-center text-black leading-[3]"
          >
            <span className="w-[140px] pl-[30px] flex justify-end items-center text-[18px] text-[#414141]">
              {label}
            </span>
            <span className="w-full flex justify-center items-center text-[#C2C2C2]">
              {label === '비밀번호' ? (
                <div className="w-[200px] h-[40px] rounded-[8px] border-[1px] border-[#E1E1E1] text-[14px] text-center">
                  {value}
                </div>
              ) : label === '나이' ? (
                value + '세'
              ) : typeof value === 'string' && value.includes('\n') ? (
                <div className="text-center leading-tight">
                  {value.split('\n').map((line, idx) => {
                    const maxLength = 14;
                    const displayText =
                      line.length > maxLength
                        ? line.slice(0, maxLength) + ' ...'
                        : line;

                    return <p key={idx}>{displayText}</p>;
                  })}
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
