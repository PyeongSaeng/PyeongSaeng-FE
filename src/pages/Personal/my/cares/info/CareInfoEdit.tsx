import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import { getCareBasicInfo } from '../../../apis/my/careMy';
import { CareInfo as Info } from '../../../types/userInfo';
import {
  formatPhone,
  normalizePhone,
} from '../../../../../shared/utils/userInfoUtils';
import { diff } from '../../../../../shared/utils/userInfoUtils';
import axiosInstance from '../../../../../shared/apis/axiosInstance';
import Loading from '../../../../../shared/components/Loading';

const CareInfoEdit = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  console.log(error); // error 상태 미사용 -> 추가

  const [originalInfo, setOriginalInfo] = useState<Info | null>(null);
  const [editedInfo, setEditedInfo] = useState<Info | null>(null);
  const [isPhoneEditing, setIsPhoneEditing] = useState<boolean>(false);

  // 정보 조회
  useEffect(() => {
    getCareBasicInfo('/api/user/protector/me')
      .then((data) => {
        const me = data.result as Info;
        setOriginalInfo(me);
        setEditedInfo(me);
      })
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
  }, []);

  useEffect(() => {
    console.log(originalInfo);
  }, [originalInfo]);

  // 뷰 전용
  const infoData = useMemo(() => {
    if (!editedInfo) return [];
    return [
      { label: '이름', value: editedInfo.name },
      { label: '아이디', value: editedInfo.username },
      { label: '비밀번호', value: '수정화면에서 변경하세요' },
      {
        label: '연락처',
        value: editedInfo.phone
          .replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      },
    ];
  }, [editedInfo]);

  const handleChange = <K extends keyof Info>(key: K, value: Info[K]) => {
    setEditedInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!originalInfo || !editedInfo) return;

    try {
      const changes = diff(originalInfo, editedInfo);
      await axiosInstance.patch('/api/user/protector/me', changes);
      navigate('/personal/care-my/info');
    } catch (err) {
      console.error('보호자 정보 수정 실패: ', err);
      toast.error('정보 수정에 실패했습니다.');
    }
  };

  // 디테일 필요
  // if (error) {
  //   return <div>{error}</div>;
  // }

  if (!originalInfo) {
    return <Loading />;
  }

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
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center justify-center"
          >
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
                          <button
                            type="button"
                            className="w-[200px] h-[40px] rounded-[8px] bg-[#08D485] text-[16px] text-white"
                            onClick={() => navigate('/personal/password-edit')}
                          >
                            수정
                          </button>
                        ) : label === '연락처' ? (
                          <input
                            className="w-[200px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
                            value={
                              isPhoneEditing
                                ? (editedInfo?.phone ?? '')
                                : formatPhone(editedInfo?.phone ?? '')
                            }
                            onFocus={() => setIsPhoneEditing(true)}
                            onBlur={() => setIsPhoneEditing(false)}
                            onChange={(e) =>
                              handleChange(
                                'phone',
                                normalizePhone(e.target.value) as Info['phone']
                              )
                            }
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
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
              type="submit"
              className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px] font-[pretendard] font-[400]"
            >
              저장
            </button>
          </form>
        </div>
      </Topbar>
    </div>
  );
};

export default CareInfoEdit;
