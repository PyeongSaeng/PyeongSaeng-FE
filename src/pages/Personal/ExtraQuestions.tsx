import { useState } from 'react';
import OptionButton from '../../shared/components/option-button/OptionButton';
import Topbar from '../../shared/components/topbar/Topbar';

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
];

const ExtraQuestions = () => {
  const [selectedOptions, setISelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const handleOptionClick = (questionId: number, option: string) => {
    setISelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center justify-center pt-[25px] text-[#747474] gap-[26px]">
          <span className="text-[20px] font-semibold">질문 답변</span>
          <div className="text-[16px]">
            <span>부모님에 대한 정보를 입력해주세요</span>
            <span>정확한 일자리 추천과 신청서 작성에 도움을 줍니다</span>
          </div>
          <div className="h-[465px] overflow-y-scroll scrollbar-hide">
            {questions.map((q) => (
              <div>
                <div className="flex justify-center pb-[22px] font-semibold">
                  Q{q.id}. {q.question}
                </div>
                <ul className="flex flex-col items-center">
                  {q.options.map((option) => (
                    <li className="mb-[17px]">
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
        </div>
      </Topbar>
    </div>
  );
};

export default ExtraQuestions;
