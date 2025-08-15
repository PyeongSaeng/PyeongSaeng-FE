import React from 'react';
import { useState, useRef } from 'react';
import SignUpHeader from '../SignUpHeader';
import NextButton from '../NextButton';
import useClickOutside from '../../../../hooks/useClickOutside';
import useAddressSearch from '../../../../hooks/useAddressSearch';

const inputClass =
  'w-full h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] mb-3 bg-white placeholder-[#c2c2c2] text-[1.6rem] font-medium';
const selectClass =
  'h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] px-[1.6rem] py-[1.3rem] text-[#c2c2c2] text-[1.6rem] font-medium';

const genderBtnClass =
  'flex-1 h-[4.5rem] border border-[#E1E1E1] rounded-[0.8rem] text-[1.6rem] font-medium flex items-center justify-center mb-3';

const dropdownBoxClass =
  'w-[20rem] bg-white border border-[#E1E1E1] rounded-[1rem] p-0 mb-8 flex items-center justify-between cursor-pointer';
const dropdownOptionClass =
  'w-full text-[#c2c2c2] text-[1.6rem] py-2 px-4 text-left hover:bg-[#F6F6F6] cursor-pointer font-medium not-italic leading-normal';

const jobOptions = [
  '주부',
  '회사원',
  '공무원',
  '전문직',
  '예술가',
  '사업가',
  '기타',
];
const periodOptions = [
  '6개월 미만',
  '6개월 ~ 1년',
  '1년 ~ 3년',
  '3년 ~ 5년',
  '5년 ~ 10년',
  '10년 이상',
];

type Step4State = {
  type: string;
  age: string;
  gender: string;
  phone: string;
  detailAddress: string;
  zipcode: string;
  roadAddress: string;
  job: string;
  period: string;
};

type CareStep4Props = {
  state: Step4State;
  setState: React.Dispatch<React.SetStateAction<Step4State>>;
  onNext: () => void;
};

const CareStep4 = ({ state, setState, onNext }: CareStep4Props) => {
  const [jobOpen, setJobOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);

  // 드롭다운 ref
  const jobDropdownRef = useRef<HTMLDivElement>(null);
  const periodDropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭으로 드롭다운 닫기
  useClickOutside([jobDropdownRef], () => setJobOpen(false));
  useClickOutside([periodDropdownRef], () => setPeriodOpen(false));

  // 주소 검색 훅
  const { openAddressSearch } = useAddressSearch({
    onComplete: (data) => {
      setState((s) => ({
        ...s,
        zipcode: data.zonecode,
        roadAddress: data.roadAddress,
      }));
    },
  });

  const handleNext = () => {
    if (
      !state.age ||
      !state.gender ||
      !state.phone ||
      !state.roadAddress ||
      !state.job ||
      !state.period ||
      !state.detailAddress
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    onNext();
  };

  return (
    <div
      className={`flex flex-col items-center w-full px-[3.3rem] pb-[10rem] ${jobOpen || periodOpen ? 'pb-[19.3rem]' : 'pb-[8rem]'}`}
    >
      <SignUpHeader title="구직자 정보 입력" />
      <div className="w-[29.4rem] flex flex-col items-center gap-[1rem]">
        <div className="text-[#747474] text-[1.6rem] font-semibold mb-6">
          어르신의 구직에 사용할 정보를 입력해주세요
        </div>
        <input
          className={`${inputClass} ${state.age ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="어르신의 연세를 입력해주세요"
          value={state.age || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d+$/.test(value)) {
              setState((s) => ({ ...s, age: value }));
            }
          }}
          type="number"
          min="1"
          max="120"
          autoComplete="off"
        />
        <div className="flex gap-2 w-full mb-3">
          <button
            className={`${genderBtnClass} ${state.gender === 'FEMALE' ? 'border-[#08D485] text-[#08D485]' : 'text-[#c2c2c2]'}`}
            onClick={() => setState((s) => ({ ...s, gender: 'FEMALE' }))}
          >
            여성
          </button>
          <button
            className={`${genderBtnClass} ${state.gender === 'MALE' ? 'border-[#08D485] text-[#08D485]' : 'text-[#c2c2c2]'}`}
            onClick={() => setState((s) => ({ ...s, gender: 'MALE' }))}
          >
            남성
          </button>
        </div>
        <input
          className={`${inputClass} ${state.phone ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="전화번호를 입력해주세요"
          value={state.phone}
          onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
        />
        <div className="flex w-full gap-[0.5rem] mb-3">
          <input
            className={`${selectClass} w-[18.7rem] mb-0 ${state.roadAddress ? 'text-black' : 'text-[#c2c2c2]'}`}
            placeholder="거주지를 입력해주세요"
            value={state.roadAddress}
            readOnly
          />
          <button
            className="bg-[#08D485] w-[10rem] text-black rounded-[8px] py-[1.2rem] text-[1.6rem] font-medium h-[4.5rem]"
            type="button"
            onClick={openAddressSearch}
          >
            주소 찾기
          </button>
        </div>
        <input
          className={`${inputClass} ${state.detailAddress ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="상세주소를 입력해주세요"
          value={state.detailAddress}
          onChange={(e) =>
            setState((s) => ({ ...s, detailAddress: e.target.value }))
          }
        />
        <div className="w-full text-left text-[#747474] font-semibold text-[1.6rem] mt-[1.4rem] mb-[1.4rem]">
          경력 사항
        </div>
        <div className="flex gap-[6.5rem] w-full mb-3">
          <div className="w-[4.5rem] text-[#747474] text-[1.6rem] mt-[1rem]">
            직무
          </div>
          <div className="flex-1 relative" ref={jobDropdownRef}>
            <div
              className={`${dropdownBoxClass} h-[4.5rem] ${jobOpen ? '' : ''}`}
              onClick={() => setJobOpen((open) => !open)}
            >
              <div
                className={`py-2 px-4 font-medium not-italic text-[1.6rem] leading-normal ${state.job ? 'text-black' : 'text-[#c2c2c2]'}`}
              >
                {state.job || '직무를 선택하세요'}
              </div>
              <svg
                className={`w-6 h-6 mr-4 transition-transform duration-200 ${jobOpen ? 'rotate-180' : ''}`}
                style={{ color: '#D0D0D0' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {jobOpen && (
              <div
                className="absolute left-0 right-0 top-[4.5rem] z-10 bg-white border border-[#E1E1E1] rounded-[1rem] w-[20rem] h-[23.7rem] p-[1.3rem] px-[3.3rem] flex flex-col overflow-y-auto"
                style={{ fontWeight: 500 }}
              >
                {jobOptions.map((option) => (
                  <div
                    key={option}
                    className={dropdownOptionClass}
                    style={{ fontWeight: 500 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setState((s) => ({ ...s, job: option }));
                      setJobOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-[6.5rem] w-full">
          <div className="w-[4.5rem] text-[#747474] text-[1.6rem] mt-[1rem]">
            기간
          </div>
          <div className="flex-1 relative" ref={periodDropdownRef}>
            <div
              className={`${dropdownBoxClass} h-[4.5rem] ${periodOpen ? '' : ''}`}
              onClick={() => setPeriodOpen((open) => !open)}
            >
              <div
                className={`py-2 px-4 font-medium not-italic text-[1.6rem] leading-normal ${state.period ? 'text-black' : 'text-[#c2c2c2]'}`}
              >
                {state.period || '기간을 선택하세요'}
              </div>
              <svg
                className={`w-6 h-6 mr-4 transition-transform duration-200 ${periodOpen ? 'rotate-180' : ''}`}
                style={{ color: '#D0D0D0' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {periodOpen && (
              <div
                className="absolute left-0 right-0 top-[4.5rem] z-10 bg-white border border-[#E1E1E1] rounded-[1rem] w-[20rem] h-[23.7rem] p-[1.3rem] px-[3.3rem] flex flex-col overflow-y-auto"
                style={{ fontWeight: 500 }}
              >
                {periodOptions.map((option) => (
                  <div
                    key={option}
                    className={dropdownOptionClass}
                    style={{ fontWeight: 500 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setState((s) => ({ ...s, period: option }));
                      setPeriodOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <NextButton className="!mt-[1.4rem]" onClick={handleNext}>
          다음
        </NextButton>
      </div>
    </div>
  );
};

export default CareStep4;
