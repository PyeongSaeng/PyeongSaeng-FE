import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { Info, Question } from '../../../types/userInfo';
import { getSeniorData } from '../../../apis/my/seniorMy';
import Loading from '../../../../../shared/components/Loading';
import { Answer } from '../../../types/userInfo';

interface OutletContextType {
  setPatchObject: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const makePatchAnswerList = (object: any) => {
  const answerObject: Answer[] = [];
  object.map((ob: any) => {
    answerObject.push({
      questionId: ob.questionId,
      selectedOptionId: ob.selectedOptionId,
    });
  });
  return answerObject;
};

const ExtraInfoEdit = () => {
  const { setPatchObject } = useOutletContext<OutletContextType>();
  const [info, setInfo] = useState<Info>();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [, setOriginalAnswerList] = useState<Answer[]>([]);
  const [editAnswerList, setEditedAnswerList] = useState<Answer[]>([]);

  // 사용자 정보 조회
  useEffect(() => {
    setLoading(true);
    getSeniorData('/api/user/senior/me')
      .then((data) => setInfo(data.result))
      .catch((err) => console.error('시니어 기본 정보 조회 실패: ', err))
      .finally(() => setLoading(false));
  }, []);

  // 사용자 질문 리스트 패치
  useEffect(() => {
    setLoading(true);
    getSeniorData(`/api/seniors/${info?.id}/questions`)
      .then((data) => {
        setQuestionList(data.result);
        const filterData = makePatchAnswerList(data.result);
        setOriginalAnswerList(filterData);
        setEditedAnswerList(filterData);
      })
      .catch((err) => console.error('시니어 추가 정보 조회 실패: ', err))
      .finally(() => setLoading(false));
  }, [info]);

  useEffect(() => {
    setPatchObject(editAnswerList);
  }, [editAnswerList, setPatchObject]);

  return loading ? (
    <Loading />
  ) : (
    <div className="w-[302px] text-[16px] text-[#747474] mt-[10px]">
      <div className="h-[450px] overflow-y-scroll scrollbar-hide">
        {questionList.map((q, qIdx) => {
          const answerList = q.options;
          return (
            <div key={q.questionId} className="py-[8px]">
              <div className="pb-[4px]">{`Q${q.questionId}. ${q.question}`}</div>
              <div className="flex flex-wrap gap-[10px] ">
                {answerList.map((e) => (
                  <button
                    type="button"
                    key={e.optionId}
                    onClick={() => {
                      if (
                        editAnswerList[qIdx]?.selectedOptionId !== e.optionId
                      ) {
                        setEditedAnswerList((prev) => {
                          const newList = [...prev];
                          newList[qIdx] = {
                            ...newList[qIdx],
                            selectedOptionId: e.optionId,
                          };
                          return newList;
                        });
                      }
                    }}
                    className={clsx(
                      editAnswerList[qIdx]?.selectedOptionId === e.optionId
                        ? 'bg-[#ECF6F2]'
                        : '',
                      'min-w-[94px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] text-[14px]'
                    )}
                  >
                    {e.option}
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

export default ExtraInfoEdit;
