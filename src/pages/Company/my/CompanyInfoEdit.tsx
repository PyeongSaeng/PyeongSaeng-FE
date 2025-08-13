import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../shared/components/topbar/Topbar';
import { CompanyInfo as Info } from '../types/companyInfo';
import { getCompanyData } from '../apis/companyMy';
import { formatPhone } from '../../../shared/utils/userInfoUtils';
import { diff } from '../../../shared/utils/userInfoUtils';
import axiosInstance from '../../../shared/apis/axiosInstance';

const CompanyInfoEdit = () => {
  const navigate = useNavigate();
  const [originalInfo, setOriginalInfo] = useState<Info | null>(null);
  const [editedInfo, setEditedInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 정보 조회
  useEffect(() => {
    getCompanyData('/api/companies/profile')
      .then((data) => {
        const me = data.result as Info;
        setOriginalInfo(me);
        setEditedInfo(me);
      })
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
  }, []);

  // 뷰 전용
  const infoData = useMemo(() => {
    if (!editedInfo) return [];
    return [
      { label: '사업자명', value: editedInfo.ownerName },
      {
        label: '사업자 전화번호',
        value: editedInfo.phone
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      },
      { label: '기업명', value: editedInfo.companyName },
      {
        label: '사업자 등록 번호',
        value: editedInfo.businessNo
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'),
      },
      {
        label: '사업자 아이디',
        value: editedInfo.username,
      },
      {
        label: '비밀번호',
        value: '수정화면에서 변경하세요',
      },
    ];
  }, [editedInfo]);

  const handleChange = <K extends keyof Info>(key: K, value: Info[K]) => {
    setEditedInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('클릭');
    if (!originalInfo || !editedInfo) return;

    try {
      const changes = diff(originalInfo, editedInfo);
      await axiosInstance.patch('/api/companies/profile', changes);
      navigate('/company/my/info');
    } catch (err) {
      console.error('기업 정보 수정 실패: ', err);
      alert('정보 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            기업 정보
          </div>
          <div className="h-[466px]">
            <div className="h-full flex flex-col justify-start items-center text-[16px] font-[Pretendard] font-[500] font-semibold">
              <div className="py-[6px]">
                {infoData.map(({ label, value }) => {
                  return (
                    <div
                      key={label}
                      className="w-full flex justify-center text-black leading-[4.4]"
                    >
                      {label === '사업자 등록 번호' ? (
                        <EditInfoRow label={label} value={String(value)} />
                      ) : (
                        <EditInfoCol label={label} value={value} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-[294px] h-[45px] rounded-[8px] bg-[#0D29B7] text-white text-[16px] font-[pretendard] font-[400] mt-[45px]"
            // onClick={() => navigate('/company/my/info/edit')}
          >
            저장
          </button>
        </div>
      </Topbar>
    </div>
  );
};

export default CompanyInfoEdit;

interface EditInfoProps<T> {
  label: string;
  value: T;
}

type EditInfoRowProps = EditInfoProps<string>;
type EditInfoColProps = EditInfoProps<number | string>;

const EditInfoCol = ({ label, value }: EditInfoColProps) => {
  const navigate = useNavigate();
  const labelSplit = label.split(' ');
  return (
    <div className="flex w-[360px] px-[33px]">
      <span className="w-[160px] flex justify-start items-center text-[16px] text-[#747474] leading-[1.4]">
        <div className="flex flex-col">
          {labelSplit.map((ls, idx) => (
            <span key={idx}>{ls}</span>
          ))}
        </div>
      </span>
      <span className="w-full h-[70px] flex justify-start items-center text-[#C2C2C2]">
        {label === '비밀번호' ? (
          <button
            type="button"
            className="flex justify-center items-center w-[226px] h-[45px] rounded-[8px] bg-[#0D29B7] text-[16px] text-white font-[Pretendard JP] font-[500] font-medium"
            onClick={() => navigate('/company/password-edit')}
          >
            수정
          </button>
        ) : (
          <input
            className="w-[228px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
            value={value}
          ></input>
        )}
      </span>
    </div>
  );
};

const EditInfoRow = ({ label, value }: EditInfoRowProps) => {
  const valueSplit = value.split('-');
  return (
    <div className="w-full h-[90px] px-[33px]">
      <div className="text-[16px] text-[#747474] leading-[1.4]">{label}</div>
      <div className="text-[#C2C2C2] flex justify-between items-center h-[58px]">
        <input
          className="w-[66px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
          value={valueSplit[0]}
        ></input>
        <span>-</span>
        <input
          className="w-[66px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
          value={valueSplit[1]}
        ></input>
        <span>-</span>
        <input
          className="w-[121px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
          value={valueSplit[2]}
        ></input>
      </div>
    </div>
  );
};
