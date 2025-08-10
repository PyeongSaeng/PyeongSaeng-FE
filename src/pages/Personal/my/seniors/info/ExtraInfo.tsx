import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { getSeniorBasicInfo } from '../../../../../shared/apis/my/seniorMy';

const questions = [
  'Q1. 하루에 몇 시간 정도 일하고 싶으신가요?',
  'Q2. 어디에서 일하는 것을 선호하시나요?',
  'Q3. 일할 때 어떤 환경이 편하신가요?',
  'Q4. 어떤 일을 할 때 가장 보람을 느끼시나요?',
  'Q5. 질문',
];

const options = [
  ['1시간 내외', '2시간 내외', '3시간 내외', '3시간 초과'],
  ['실내', '실외'],
  ['혼자서', '여럿이'],
  ['환경 미화', '실내 청소', '조리', '아동 보호', '교육/강사'],
  ['A', 'B', 'C'],
];

interface OutletContextType {
  answers: (string | null)[];
}

const ExtraInfo = () => {
  const { answers } = useOutletContext<OutletContextType>();
  const [info, setInfo] = useState();
  const [error, setError] = useState();

  // api 구현 안됨 + 시니어 아이디 넣기
  useEffect(() => {
    getSeniorBasicInfo(`/api/seniors/${18}/questions`)
      .then((data) => setInfo(data))
      .catch((err) => setError(err?.message ?? '정보를 불러오지 못했습니다'));
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div className="w-[302px] text-[16px] text-[#747474] mt-[10px]">
      <div className="h-[450px] overflow-y-scroll scrollbar-hide">
        {questions.map((q, index) => {
          const answerList = options[index];
          return (
            <div key={q} className="py-[8px]">
              <div className="pb-[4px]">{q}</div>
              <div className="flex flex-wrap gap-[10px] ">
                {answerList.map((e) => (
                  <button
                    type="button"
                    key={e}
                    className={clsx(
                      answers[index] === e ? 'bg-[#ECF6F2]' : '',
                      'min-w-[94px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] text-[14px]'
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtraInfo;
