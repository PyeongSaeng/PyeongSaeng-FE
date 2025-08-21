import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getSeniorData } from '../../../apis/my/seniorMy';
import { Info, Question } from '../../../types/userInfo';
import Loading from '../../../../../shared/components/Loading';

const ExtraInfo = () => {
  const [info, setInfo] = useState<Info>();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 시니어 데이터 조회
  useEffect(() => {
    setLoading(true);
    getSeniorData('/api/user/senior/me')
      .then((data) => setInfo(data.result))
      .catch((err) => console.error('시니어 기본 정보 조회 실패: ', err))
      .finally(() => setLoading(false));
  }, []);

  // 시니어 추가질문 정보 조회
  useEffect(() => {
    if (!info?.id) return;

    setLoading(true);
    getSeniorData(`/api/seniors/${info?.id}/questions`)
      .then((data) => {
        setQuestionList(data.result);
      })
      .catch((err) => console.error('시니어 추가 정보 조회 실패: ', err))
      .finally(() => setLoading(false));
  }, [info]);

  return loading ? (
    <Loading />
  ) : (
    <div className="w-[302px] text-[16px] text-[#747474] mt-[10px]">
      <div className="h-[450px] overflow-y-scroll scrollbar-hide">
        {questionList &&
          questionList?.map((q) => {
            const answerList = q.options;
            return (
              <div key={q.questionId} className="py-[8px]">
                <div className="pb-[4px]">
                  {`Q${q.questionId}. ${q.question}`}
                </div>
                <div className="flex flex-wrap gap-[10px] ">
                  {answerList.map((e) => {
                    return (
                      <button
                        type="button"
                        key={e.optionId}
                        className={clsx(
                          q.selectedOptionId === e.optionId
                            ? 'bg-[#ECF6F2]'
                            : '',
                          'min-w-[94px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] text-[14px]'
                        )}
                      >
                        {e.option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExtraInfo;

// answers[index] === e ?
