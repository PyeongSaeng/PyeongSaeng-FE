import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../shared/components/topbar/Topbar';
import { CompanyInfo as Info } from '../types/companyInfo';
import { getCompanyData } from '../apis/companyMy';
import Loading from '../../../shared/components/Loading';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 정보 조회
  useEffect(() => {
    getCompanyData('/api/companies/profile')
      .then((data) => setInfo(data.result as Info))
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  // 뷰 전용
  const infoData = useMemo(() => {
    if (!info) return [];
    return [
      { label: '사업자명', value: info.ownerName },
      {
        label: '사업자 전화번호',
        value: info.phone
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      },
      { label: '기업명', value: info.companyName },
      {
        label: '사업자 등록 번호',
        value: info.businessNo
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'),
      },
      {
        label: '사업자 아이디',
        value: info.username,
      },
      {
        label: '비밀번호',
        value: '수정화면에서 변경하세요',
      },
    ];
  }, [info]);

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            기업 정보
          </div>
          <div className="h-[466px]">
            {!info ? (
              <Loading />
            ) : (
              <div className="h-full flex flex-col justify-start items-center text-[16px] font-[Pretendard] font-[500] font-semibold">
                <div className="py-[6px]">
                  {infoData.map(({ label, value }) => {
                    return (
                      <div
                        key={label}
                        className="w-full flex justify-center text-black leading-[4.4]"
                      >
                        {label === '사업자 등록 번호' ? (
                          <ViewInfoRow label={label} value={String(value)} />
                        ) : (
                          <ViewInfoCol label={label} value={value} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="w-[294px] h-[45px] rounded-[8px] bg-[#0D29B7] text-white text-[16px] font-[pretendard] font-[400] mt-[45px]"
            onClick={() => navigate('/company/my/info/edit')}
          >
            수정
          </button>
        </div>
      </Topbar>
    </div>
  );
};

export default CompanyInfo;

interface ViewInfoProps<T> {
  label: string;
  value: T;
}

type ViewInfoRowProps = ViewInfoProps<string>;
type ViewInfoColProps = ViewInfoProps<number | string>;

const ViewInfoCol = ({ label, value }: ViewInfoColProps) => {
  const labelSplit = label.split(' ');
  return (
    <div className="flex w-[360px] h-[70px] px-[33px]">
      <span className="w-[160px] flex justify-start items-center text-[16px] text-[#747474] leading-[1.4]">
        <div className="flex flex-col">
          {labelSplit.map((ls, idx) => (
            <span key={idx}>{ls}</span>
          ))}
        </div>
      </span>
      <span className="w-full flex justify-start items-center text-[#C2C2C2]">
        {label === '비밀번호' ? (
          <div className="flex justify-center items-center w-[226px] h-[45px] rounded-[8px] border-[1px] border-[#E1E1E1] text-[14px] text-center">
            {value}
          </div>
        ) : (
          value
        )}
      </span>
    </div>
  );
};

const ViewInfoRow = ({ label, value }: ViewInfoRowProps) => {
  const valueSplit = value.split('-');
  return (
    <div className="w-full h-[90px] px-[33px]">
      <div className="text-[16px] text-[#747474] leading-[1.4]">{label}</div>
      <div className="h-[58px] text-[#C2C2C2] flex justify-between items-center">
        <input
          className="w-[66px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px]"
          value={valueSplit[0]}
          disabled
        ></input>
        <span>-</span>
        <input
          className="w-[66px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px]"
          value={valueSplit[1]}
          disabled
        ></input>
        <span>-</span>
        <input
          className="w-[121px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px]"
          value={valueSplit[2]}
          disabled
        ></input>
      </div>
    </div>
  );
};
