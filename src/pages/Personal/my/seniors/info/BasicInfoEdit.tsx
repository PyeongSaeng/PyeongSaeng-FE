import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { Info } from '../../../types/userInfo';
import { getSeniorData } from '../../../apis/my/seniorMy';
import { JobTypeLabel, ExperiencePeriodLabel } from '../../../types/userInfo';
import {
  formatPhone,
  normalizePhone,
  diff,
} from '../../../../../shared/utils/userInfoUtils';
import Loading from '../../../../../shared/components/Loading';

type OutletContext = { setChanges: (changes: Partial<Info>) => void };

const BasicInfoEdit = () => {
  const navigate = useNavigate();
  const { setChanges } = useOutletContext<OutletContext>();
  const [originalInfo, setOriginalInfo] = useState<Info | null>(null);
  const [editedInfo, setEditedInfo] = useState<Info | null>(null);
  const [isPhoneEditing, setIsPhoneEditing] = useState<boolean>(false);
  const [isPostcodeOpen, setIsPostCodeOpen] = useState<boolean>(false);

  const handleRoadAddress = (data: any) => {
    handleChange('roadAddress', data.roadAddress);
    setIsPostCodeOpen(false);
  };

  useEffect(() => {
    getSeniorData('/api/user/senior/me')
      .then((data) => {
        const me = data.result as Info;
        setOriginalInfo(me);
        setEditedInfo(me);
      })
      .catch((err) => console.error('시니어 정보 조회 실패: ', err));
  }, []);

  // 뷰전용 데이터 로드
  const infoData = useMemo(() => {
    if (!editedInfo) return [];
    return [
      { label: '이름', value: editedInfo.name },
      { label: 'id', value: editedInfo.username },
      { label: '비밀번호', value: '' },
      { label: '나이', value: String(editedInfo.age) },
      { label: '연락처', value: formatPhone(editedInfo.phone) },
      { label: '거주지', value: editedInfo.roadAddress },
      { label: '상세주소', value: editedInfo.detailAddress },
      { label: '직무', value: JobTypeLabel[editedInfo.job] },
      {
        label: '기간',
        value: ExperiencePeriodLabel[editedInfo.experiencePeriod],
      },
    ];
  }, [editedInfo]);

  const handleChange = <K extends keyof Info>(key: K, value: Info[K]) => {
    setEditedInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  useEffect(() => {
    if (!originalInfo || !editedInfo) return;
    const changes = diff(originalInfo, editedInfo);
    setChanges(changes);
  }, [originalInfo, editedInfo, setChanges]);

  return !originalInfo ? (
    <Loading />
  ) : (
    <div className="flex flex-col justify-center items-center text-[16px] font-[Pretendard] font-[500]">
      <div className="py-[6px]">
        {infoData.map(({ label, value }) => (
          <div
            key={label}
            className="w-full flex justify-center text-black leading-[2.8]"
          >
            <span className="w-[140px] pl-[30px] flex justify-end items-center text-[18px] text-[#414141]">
              {label !== '상세주소' ? label : ''}
            </span>
            <span className="w-full flex justify-center items-center text-[#C2C2C2]">
              {
                // 비밀번호 수정버튼
                label === '비밀번호' ? (
                  <button
                    type="button"
                    className="w-[200px] h-[40px] rounded-[8px] bg-[#08D485] text-[16px] text-white"
                    onClick={() => navigate('/personal/password-edit')}
                  >
                    수정
                  </button>
                ) : // 나이
                label === '나이' ? (
                  `${value}세`
                ) : // 주소 검색
                label === '거주지' ? (
                  <div className="flex jusity-between gap-[4px]">
                    <input
                      className="w-[146px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px] focus:text-black"
                      value={editedInfo?.roadAddress}
                      onClick={() => setIsPostCodeOpen(true)}
                    />
                    <button
                      type="button"
                      className="w-[50px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[14px] font-[Pretendard JP]"
                      onClick={() => setIsPostCodeOpen(true)}
                    >
                      검색
                    </button>
                  </div>
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
                ) : label === '상세주소' ? (
                  <input
                    className="w-[200px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
                    value={editedInfo?.detailAddress ?? ''}
                    onChange={(e) =>
                      handleChange('detailAddress', e.target.value)
                    }
                  />
                ) : // 드롭다운메뉴 사용파트
                label === '직무' ? (
                  <select
                    className="w-[200px] h-[45px] border-[1.3px] border-[#E1E1E1] rounded-[8px] pl-[10px] focus:text-black focus:outline-black"
                    value={editedInfo?.job ?? ''}
                    onChange={(e) =>
                      handleChange('job', e.target.value as Info['job'])
                    }
                  >
                    <option value="HOUSEWIFE">주부</option>
                    <option value="EMPLOYEE">회사원</option>
                    <option value="PUBLIC_OFFICER">공무원</option>
                    <option value="PROFESSIONAL">전문직</option>
                    <option value="ARTIST">예술가</option>
                    <option value="BUSINESS_OWNER">사업가</option>
                    <option value="ECT">기타</option>
                  </select>
                ) : label === '기간' ? (
                  <select
                    className="w-[200px] h-[45px] border-[1.3px] border-[#E1E1E1] rounded-[8px] pl-[10px] focus:text-black focus:outline-black"
                    value={editedInfo?.experiencePeriod}
                    onChange={(e) =>
                      handleChange(
                        'experiencePeriod',
                        e.target.value as Info['experiencePeriod']
                      )
                    }
                  >
                    <option value="LESS_THAN_6_MONTHS">6개월 미만</option>
                    <option value="SIX_MONTHS_TO_1_YEAR">6개월~1년</option>
                    <option value="ONE_TO_THREE_YEARS">1~3년</option>
                    <option value="THREE_TO_FIVE_YEARS">3~5년</option>
                    <option value="FIVE_TO_TEN_YEARS">5~10년</option>
                    <option value="OVER_TEN_YEARS">10년 이상</option>
                  </select>
                ) : (
                  // 나머지 뷰 전용
                  value
                )
              }
            </span>
          </div>
        ))}
      </div>
      {isPostcodeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div
            className="bg-white p-4 rounded-lg shadow-lg
                 transition-all duration-300 ease-out
                 opacity-0 scale-95 animate-fadeIn"
          >
            <DaumPostcode onComplete={handleRoadAddress} autoClose />
            <button
              className="mt-[2px] px-[10px] py-[6px] bg-gray-300 rounded"
              onClick={() => setIsPostCodeOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoEdit;
