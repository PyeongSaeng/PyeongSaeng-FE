import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import { getCareBasicInfo } from '../../../apis/my/careMy';
import { CareInfo as Info } from '../../../types/userInfo';

const CareInfo = () => {
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 정보 조회
  useEffect(() => {
    getCareBasicInfo('/api/user/protector/me')
      .then((data) => setInfo(data.result as Info))
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  // 뷰 전용
  const infoData = useMemo(() => {
    if (!info) return [];
    return [
      { label: '이름', value: info.name },
      { label: '아이디', value: info.username },
      { label: '비밀번호', value: '수정화면에서 변경하세요' },
      {
        label: '연락처',
        value: info.phone
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      },
    ];
  }, [info]);

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            개인정보
          </div>
          <div className="flex justify-center items-center w-[309px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2] font-[Pretendard JP] font-[500] text-black text-[16px]">
            기본 정보
          </div>
          <div className="h-[466px] pt-[20px]">
            <div className="h-full flex flex-col justify-start items-center text-[16px] font-[Pretendard] font-[500]">
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
                      ) : (
                        value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px] font-[pretendard] font-[400]"
            onClick={() => navigate('/personal/care-my/info/edit')}
          >
            수정
          </button>
        </div>
      </Topbar>
    </div>
  );
};

export default CareInfo;
