import { useState } from 'react';
import OptionButton from '../../shared/components/buttons/OptionButton';
import Topbar from '../../shared/components/topbar/Topbar';
import GreenButton from '../../shared/components/buttons/GreenButton';

const questions = [
  {
    id: 1,
    question: '지원 동기가 무엇인가요?',
    options: ['집이 가까워서', '일이 맘에 들어서', '경험이 있어서'],
  },
  {
    id: 2,
    question: '통근 수단이 무엇인가요?',
    options: ['도보', '자차', '대중교통', '택시', '기타'],
  },
  {
    id: 3,
    question: '통근 시간이 얼마나 되나요?',
    options: [
      '30분 이내',
      '30분 이상 1시간 미만',
      '1시간 이상 2시간 미만',
      '2시간 이상',
    ],
  },
  {
    id: 4,
    question: '야간 작업이 가능한가요?',
    options: ['YES', 'NO'],
  },
  {
    id: 5,
    question: '특별하게 원하는 파트가 있나요?',
    options: ['A', 'B', 'C', 'D'],
  },
];

const QuestionDetail = () => {
  const [selectedOptions, setISelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const handleOptionClick = (questionId: number, option: string) => {
    setISelectedOptions((prev) => {
      if (prev[questionId] === option) {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      }
      return { ...prev, [questionId]: option };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출 완료: ', selectedOptions);
  };

  return (
    <div>
      <Topbar>
        <form
          className="flex flex-col items-center justify-center pt-[25px] text-[#747474] gap-[26px]"
          onSubmit={handleSubmit}
        >
          <div className="h-[370px] overflow-y-scroll scrollbar-hide">
            {questions.map((q) => (
              <div className="pb-[30px]">
                <div className="flex justify-center pb-[22px] font-semibold">
                  Q{q.id}. {q.question}
                </div>
                <ul className="flex flex-col items-center">
                  {q.options.map((option) => (
                    <li className="mb-[17px]" key={q.id}>
                      <OptionButton
                        clicked={selectedOptions[q.id] === option}
                        onClick={() => handleOptionClick(q.id, option)}
                      >
                        {option}
                      </OptionButton>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <GreenButton>제출하기</GreenButton>
        </form>
      </Topbar>
    </div>
  );
};

export default QuestionDetail;
