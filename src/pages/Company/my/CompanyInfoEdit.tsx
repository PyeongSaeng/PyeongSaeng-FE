import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Topbar from '../../../shared/components/topbar/Topbar';
import { CompanyInfo as Info } from '../types/companyInfo';
import { getCompanyData } from '../apis/companyMy';
import axiosInstance from '../../../shared/apis/axiosInstance';

const onlyDigits = (v: string) => (v ?? '').replace(/[^0-9]/g, '');
const fmtPhone = (d: string) =>
  d.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

const sanitizeInfo = (info: Info): Info => ({
  ...info,
  phone: onlyDigits(String(info.phone)),
  businessNo: onlyDigits(String(info.businessNo)),
});

const CompanyInfoEdit = () => {
  const navigate = useNavigate();
  const [originalInfo, setOriginalInfo] = useState<Info | null>(null);
  const [editedInfo, setEditedInfo] = useState<Info | null>(null);

  // ref
  const ownerNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const businessRef = useRef<HTMLInputElement>(null);

  // 정보 조회
  useEffect(() => {
    getCompanyData('/api/companies/profile')
      .then((data) => {
        const me = sanitizeInfo(data.result as Info);
        setOriginalInfo(me);
        setEditedInfo(me);
      })
      .catch((err) => console.error('기업 정보 조회 에러: ', err));
  }, []);

  const handleChange = <K extends keyof Info>(key: K, value: Info[K]) => {
    setEditedInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  // 뷰 전용
  const infoData = useMemo(() => {
    if (!editedInfo) return [];
    return [
      {
        label: '사업자명',
        key: 'ownerName' as const,
        value: editedInfo.ownerName,
        ref: ownerNameRef,
      },
      {
        label: '사업자 전화번호',
        key: 'phone' as const,
        value: editedInfo.phone,
        ref: phoneRef,
      },
      {
        label: '기업명',
        key: 'companyName' as const,
        value: editedInfo.companyName,
        ref: companyNameRef,
      },
      {
        label: '사업자 등록 번호',
        key: 'businessNo' as const,
        value: editedInfo.businessNo,
        ref: businessRef,
      },
      {
        label: '사업자 아이디',
        key: 'username' as const,
        value: editedInfo.username,
      },
      { label: '비밀번호', key: null as any, value: '수정화면에서 변경하세요' },
    ];
  }, [editedInfo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!originalInfo || !editedInfo) return;

    // 유효성 검사
    if (!editedInfo.ownerName) {
      toast.warning('사업자명을 입력해주세요.');
      ownerNameRef.current?.focus();
      return;
    }
    if (!editedInfo.phone) {
      toast.warning('전화번호를 입력해주세요.');
      phoneRef.current?.focus();
      return;
    }
    if (!editedInfo.companyName) {
      toast.warning('기업명을 입력해주세요.');
      companyNameRef.current?.focus();
      return;
    }
    if (!editedInfo.businessNo) {
      toast.warning('사업자등록번호를 입력해주세요.');
      businessRef.current?.focus();
      return;
    }

    try {
      const changes: Partial<Info> = {};
      (Object.keys(editedInfo) as (keyof Info)[]).forEach((k) => {
        if (editedInfo[k] !== originalInfo[k]) {
          (changes as any)[k] = editedInfo[k];
        }
      });

      if (Object.keys(changes).length === 0) {
        navigate('/company/my/info');
        return;
      }

      await axiosInstance.patch('/api/companies/profile', changes);
      navigate('/company/my/info');
    } catch (err) {
      console.error('기업 정보 수정 실패: ', err);
      toast.error('정보 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            기업 정보
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="h-[466px]">
              <div className="h-full flex flex-col justify-start items-center text-[16px] font-[Pretendard] font-[500] font-semibold">
                <div className="py-[6px]">
                  {infoData.map(({ label, key, value, ref }) => (
                    <div
                      key={label}
                      className="w-full flex justify-center text-black leading-[4.4]"
                    >
                      {label === '사업자 등록 번호' ? (
                        <EditInfoRow
                          label={label}
                          value={String(value)}
                          onChange={(next) =>
                            handleChange(
                              'businessNo',
                              onlyDigits(next) as Info['businessNo']
                            )
                          }
                          inputRef={ref as React.RefObject<HTMLInputElement>}
                        />
                      ) : (
                        <EditInfoCol
                          label={label}
                          value={value}
                          name={key ?? undefined}
                          onChange={handleChange}
                          inputRef={ref as React.RefObject<HTMLInputElement>}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-[294px] h-[45px] rounded-[8px] bg-[#0D29B7] text-white text-[16px] font-[pretendard] font-[400] mt-[10px]"
            >
              저장
            </button>
          </form>
        </div>
      </Topbar>
    </div>
  );
};

export default CompanyInfoEdit;

type FieldKey = keyof Info;

interface EditInfoProps<T> {
  label: string;
  value: T;
  inputRef?: React.RefObject<HTMLInputElement>;
}

type EditInfoColProps = EditInfoProps<number | string> & {
  name?: FieldKey;
  onChange?: <K extends FieldKey>(key: K, value: Info[K]) => void;
};

const EditInfoCol = ({
  label,
  value,
  name,
  onChange,
  inputRef,
}: EditInfoColProps) => {
  const navigate = useNavigate();
  const labelSplit = label.split(' ');

  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState('');

  useEffect(() => {
    if (label !== '사업자 전화번호') return;
    const raw = onlyDigits(String(value ?? ''));
    setPhoneDisplay(isPhoneFocused ? raw : fmtPhone(raw));
  }, [label, value, isPhoneFocused]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!name || !onChange) return;
    const raw = e.target.value;

    if (label === '사업자 전화번호') {
      const digits = onlyDigits(raw);
      setPhoneDisplay(digits);
      onChange(name as 'phone', digits as Info['phone']);
    } else {
      onChange(name as any, raw as any);
    }
  };

  const isReadonlyId = label === '사업자 아이디';
  const isPassword = label === '비밀번호';
  const isPhone = label === '사업자 전화번호';

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
        {isPassword ? (
          <button
            type="button"
            className="flex justify-center items-center w-[226px] h-[45px] rounded-[8px] bg-[#0D29B7] text-[16px] text-white font-[Pretendard JP] font-[500] font-medium"
            onClick={() => navigate('/company/password-edit')}
          >
            수정
          </button>
        ) : isReadonlyId ? (
          <span className="text-black">{String(value ?? '')}</span>
        ) : (
          <input
            ref={inputRef}
            className="w-[228px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
            value={isPhone ? phoneDisplay : String(value ?? '')}
            onChange={handleInput}
            onFocus={() => {
              if (isPhone) setIsPhoneFocused(true);
            }}
            onBlur={() => {
              if (isPhone) {
                setIsPhoneFocused(false);
                setPhoneDisplay(fmtPhone(onlyDigits(phoneDisplay)));
              }
            }}
            inputMode={isPhone ? 'numeric' : undefined}
            maxLength={isPhone ? 13 : undefined}
          />
        )}
      </span>
    </div>
  );
};

interface EditInfoRowProps {
  label: string;
  value: string;
  onChange: (next: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const EditInfoRow = ({
  label,
  value,
  onChange,
  inputRef,
}: EditInfoRowProps) => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    const digits = onlyDigits(value || '');
    setA(digits.slice(0, 3));
    setB(digits.slice(3, 5));
    setC(digits.slice(5, 10));
    initialized.current = true;
  }, [value]);

  const onA = (v: string) => {
    const vv = onlyDigits(v).slice(0, 3);
    setA(vv);
    onChange(vv + b + c);
  };
  const onB = (v: string) => {
    const vv = onlyDigits(v).slice(0, 2);
    setB(vv);
    onChange(a + vv + c);
  };
  const onC = (v: string) => {
    const vv = onlyDigits(v).slice(0, 5);
    setC(vv);
    onChange(a + b + vv);
  };

  return (
    <div className="w-full h-[90px] px-[33px]">
      <div className="text-[16px] text-[#747474] leading-[1.4]">{label}</div>
      <div className="text-[#C2C2C2] flex justify-between items-center h-[58px]">
        <input
          ref={inputRef}
          className="w-[66px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
          value={a}
          onChange={(e) => onA(e.target.value)}
          inputMode="numeric"
          maxLength={3}
        />
        <span>-</span>
        <input
          className="w-[66px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
          value={b}
          onChange={(e) => onB(e.target.value)}
          inputMode="numeric"
          maxLength={2}
        />
        <span>-</span>
        <input
          className="w-[121px] h-[45px] text-center border-[1px] border-[#E1E1E1] rounded-[8px] focus:text-black focus:outline-black"
          value={c}
          onChange={(e) => onC(e.target.value)}
          inputMode="numeric"
          maxLength={5}
        />
      </div>
    </div>
  );
};
