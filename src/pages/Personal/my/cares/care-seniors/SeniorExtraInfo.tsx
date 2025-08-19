import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import { Question, LinkedSenior } from '../../../types/userInfo';
import { getSeniorData } from '../../../apis/my/seniorMy';
import Loading from '../../../../../shared/components/Loading';

const SeniorExtraInfo = () => {
  const navigate = useNavigate();
  const { seniorId } = useParams<{ seniorId: string }>();
  const seniorIdNum = seniorId ? parseInt(seniorId, 10) : undefined;
  const [seniorData, setSeniorData] = useState<LinkedSenior>();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getSeniorData('/api/user/seniors')
      .then((data) => {
        const value = data.result.find(
          (d: LinkedSenior) => d.seniorId === seniorIdNum
        );
        setSeniorData(value);
      })
      .catch((err) => console.error('시니어 데이터 조회 에러: ', err))
      .finally(() => setLoading(false));
  }, [seniorIdNum]);

  useEffect(() => {
    setLoading(true);
    getSeniorData(`/api/seniors/${seniorIdNum}/questions`)
      .then((data) => setQuestionList(data.result))
      .catch((err) =>
        console.error('시니어 추가질문 답변 리스트 조회 에러: ', err)
      )
      .finally(() => setLoading(false));
  }, [seniorIdNum]);

  //   useEffect(() => {
  //     console.log(questionList);
  //   }, [questionList]);

  useEffect(() => {
    console.log(seniorData);
  }, [seniorData]);

  return (
    <div>
      <Topbar>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
              추가 정보 입력
            </div>
            <div className="flex justify-center items-center w-[309px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2] font-[Pretendard JP] font-[500] text-black text-[16px]">
              {seniorData?.seniorName} 님
            </div>
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
            <button
              type="button"
              className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px] font-[pretendard] font-[400]"
              onClick={() =>
                navigate(`/personal/care-my/senior/${seniorIdNum}/extra/edit`, {
                  state: { questionList: questionList },
                })
              }
            >
              수정
            </button>
          </div>
        )}
      </Topbar>
    </div>
  );
};

export default SeniorExtraInfo;
