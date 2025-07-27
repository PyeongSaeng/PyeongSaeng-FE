declare global {
  interface Window {
    daum?: {
      Postcode: any;
    };
  }
}
import React from 'react';
import { useState, useEffect } from 'react';
import SignUpHeader from '../SignUpHeader';
import NextButton from '../NextButton';

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
  address: string;
  detailAddress: string;
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

  // 주소
  useEffect(() => {
    if (!window.daum?.Postcode) {
      const script = document.createElement('script');
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleAddressSearch = () => {
    if (window.daum?.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setState((s) => ({ ...s, address: data.address }));
        },
      }).open();
    } else {
      alert(
        '주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.'
      );
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full pt-8 px-[3.3rem] ${jobOpen || periodOpen ? 'pb-[19.3rem]' : 'pb-[8rem]'}`}
    >
      <SignUpHeader title="구직자 정보 입력" />
      <div className="w-[29.4rem] flex flex-col items-center gap-[1rem]">
        <div className="text-[#747474] text-[1.6rem] font-semibold mb-6">
          어르신의 구직에 사용할 정보를 입력해주세요
        </div>
        <input
          className={`${inputClass} ${state.age ? 'text-black' : 'text-[#c2c2c2]'}`}
          placeholder="어르신의 연세를 입력해주세요"
          value={state.age}
          onChange={(e) => setState((s) => ({ ...s, age: e.target.value }))}
        />
        <div className="flex gap-2 w-full mb-3">
          <button
            className={`${genderBtnClass} ${state.gender === '여성' ? 'border-[#08D485] text-[#08D485]' : 'text-[#c2c2c2]'}`}
            onClick={() => setState((s) => ({ ...s, gender: '여성' }))}
          >
            여성
          </button>
          <button
            className={`${genderBtnClass} ${state.gender === '남성' ? 'border-[#08D485] text-[#08D485]' : 'text-[#c2c2c2]'}`}
            onClick={() => setState((s) => ({ ...s, gender: '남성' }))}
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
            className={`${selectClass} w-[18.7rem] mb-0 ${state.address ? 'text-black' : 'text-[#c2c2c2]'}`}
            placeholder="거주지를 입력해주세요"
            value={state.address}
            onChange={(e) =>
              setState((s) => ({ ...s, address: e.target.value }))
            }
          />
          <button
            className="bg-[#08D485] w-[10rem] text-black rounded-[8px] py-[1.2rem] text-[1.6rem] font-medium h-[4.5rem]"
            type="button"
            onClick={handleAddressSearch}
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
          <div className="flex-1 relative">
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
          <div className="flex-1 relative">
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
        <NextButton className="!mt-[1.4rem]" onClick={onNext}>
          다음
        </NextButton>
      </div>
    </div>
  );
};

export default CareStep4;
