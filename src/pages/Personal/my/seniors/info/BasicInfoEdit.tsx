import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from '../../../types/userInfo';
import { getSeniorBasicInfo } from '../../../../../shared/apis/info/seniorInfo';
import { JobTypeLabel, ExperiencePeriodLabel } from '../../../types/userInfo';
import axiosInstance from '../../../../../shared/apis/axiosInstance';

// 나중에 유틸로 옮기기
const formatPhone = (v: string) =>
  v.replace(/\D/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
const normalizePhone = (v: string) => v.replace(/\D/g, '');

const BasicInfoEdit = () => {
  const navigate = useNavigate();
  const [originalInfo, setOriginalInfo] = useState<Info | null>(null);
  const [editedInfo, setEditedInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string | null>();
  const [isPhoneEditing, setIsPhoneEditing] = useState<boolean>(false);

  useEffect(() => {
    getSeniorBasicInfo('/api/user/senior/me')
      .then((data) => {
        const me = data.result as Info;
        setOriginalInfo(me);
        setEditedInfo(me);
      })
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
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

  function handleChange<K extends keyof Info>(key: K, value: Info[K]) {
    setEditedInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function diff<T extends object>(prev: T, curr: T): Partial<T> {
    const out: Partial<T> = {};
    (Object.keys(curr) as (keyof T)[]).forEach((k) => {
      if (!Object.is(curr[k], prev[k])) {
        out[k] = curr[k]; // 타입 안전
      }
    });
    return out;
  }

  // 사용
  function handleSave() {
    if (!originalInfo || !editedInfo) return;
    const changes = diff(originalInfo, editedInfo);
    if (Object.keys(changes).length === 0) return;

    axiosInstance
      .patch('/api/user/senior/me', changes)
      .then(() => alert('저장 완료'))
      .catch(() => alert('저장 실패'));
  }

  // 주소 검색 기능 구현 필요
  return (
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
                    onClick={() =>
                      navigate('/personal/my/info/basic/edit/password')
                    }
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
                      className="w-[146px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px]"
                      value={
                        editedInfo?.roadAddress ?? ''
                        // .length > 9 ? value.slice(0, 9) + '...' : value
                      }
                      onChange={(e) =>
                        handleChange('roadAddress', e.target.value)
                      }
                    />
                    <button className="w-[50px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[14px] font-[Pretendard JP]">
                      검색
                    </button>
                  </div>
                ) : label === '연락처' ? (
                  <input
                    className="w-[200px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px]"
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
                    className="w-[200px] h-[45px] px-[10px] py-[4px] text-center border-[1.3px] border-[#E1E1E1] rounded-[8px]"
                    value={editedInfo?.detailAddress ?? ''}
                    onChange={(e) =>
                      handleChange('detailAddress', e.target.value)
                    }
                  />
                ) : // 드롭다운메뉴 사용파트
                label === '직무' ? (
                  <select
                    className="w-[200px] h-[45px] border-[1.3px] border-[#E1E1E1] rounded-[8px] pl-[10px]"
                    value={editedInfo?.phone ?? ''}
                    onChange={(e) =>
                      handleChange('job', e.target.value as Info['job'])
                    }
                  >
                    <option value="주부">주부</option>
                    <option value="자영업">회사원</option>
                    <option value="직장인">공무원</option>
                    <option value="전문직">전문직</option>
                    <option value="예술가">예술가</option>
                    <option value="사업가">사업가</option>
                    <option value="기타">기타</option>
                  </select>
                ) : label === '기간' ? (
                  <select
                    className="w-[200px] h-[45px] border-[1.3px] border-[#E1E1E1] rounded-[8px] pl-[10px]"
                    value={editedInfo?.experiencePeriod}
                    onChange={(e) =>
                      handleChange(
                        'experiencePeriod',
                        e.target.value as Info['experiencePeriod']
                      )
                    }
                  >
                    <option value="6개월 미만">6개월 미만</option>
                    <option value="6개월~1년">6개월~1년</option>
                    <option value="1~3년">1~3년</option>
                    <option value="3~5년">3~5년</option>
                    <option value="5~10년">5~10년</option>
                    <option value="10년 이상">10년 이상</option>
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
    </div>
  );
};

export default BasicInfoEdit;
