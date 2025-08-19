import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import Loading from '../../../../../shared/components/Loading';
import { Question, Answer } from '../../../types/userInfo';
import axiosInstance from '../../../../../shared/apis/axiosInstance';
import { getSeniorData } from '../../../apis/my/seniorMy';
import { LinkedSenior } from '../../../types/userInfo';

const makeOriginalPatchObject = (questionList: Question[]) => {
  return questionList.map((q) => ({
    questionId: q.questionId,
    selectedOptionId: q.selectedOptionId ? q.selectedOptionId : null,
  }));
};

const SeniorExtraInfoEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionList } = location.state || {};
  const { seniorId } = useParams<{ seniorId: string }>();
  const seniorIdNum = seniorId ? parseInt(seniorId, 10) : undefined;
  const [seniorData, setSeniorData] = useState<LinkedSenior>();
  const [, setOriginalquestionArr] = useState<Answer[]>();
  const [patchArr, setPatchArr] = useState<Answer[]>([]);
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
    if (questionList) {
      const value = makeOriginalPatchObject(questionList);
      setOriginalquestionArr(value);
      setPatchArr(value);
    }
  }, [questionList]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const unselected = patchArr.filter((p) => !p.selectedOptionId);
      if (unselected.length > 0) {
        toast(
          `아직 선택하지 않은 질문: ${unselected.map((p) => p.questionId).join(', ')}`
        );
        return;
      }

      const res = await axiosInstance.put(
        `/api/seniors/${seniorData?.seniorId}/answers`,
        {
          answers: patchArr,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error('추가 질문 수정 에러: ', err);
    } finally {
      setLoading(false);
      navigate(`/personal/care-my/senior/${seniorIdNum}/extra`);
    }
  };

  return (
    <div>
      <Topbar>
        {loading ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center"
          >
            <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
              추가 정보 입력
            </div>
            <div className="flex justify-center items-center w-[309px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] bg-[#ECF6F2] font-[Pretendard JP] font-[500] text-black text-[16px]">
              {seniorData?.seniorName} 님
            </div>
            <div className="w-[302px] text-[16px] text-[#747474] mt-[10px]">
              <div className="h-[450px] overflow-y-scroll scrollbar-hide">
                {questionList &&
                  questionList?.map((q: any) => {
                    const answerList = q.options;
                    return (
                      <div key={q.questionId} className="py-[8px]">
                        <div className="pb-[4px]">
                          {`Q${q.questionId}. ${q.question}`}
                        </div>
                        <div className="flex flex-wrap gap-[10px] ">
                          {answerList.map((e: any) => {
                            return (
                              <button
                                type="button"
                                key={e.optionId}
                                className={clsx(
                                  patchArr?.find(
                                    (p) => q.questionId === p.questionId
                                  )?.selectedOptionId === e.optionId
                                    ? 'bg-[#ECF6F2]'
                                    : '',
                                  'min-w-[94px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485] text-[14px]'
                                )}
                                onClick={() => {
                                  setPatchArr((prev) => {
                                    return prev.map((p) =>
                                      p.questionId === q.questionId
                                        ? { ...p, selectedOptionId: e.optionId }
                                        : p
                                    );
                                  });
                                }}
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
              type="submit"
              className="w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px] font-[pretendard] font-[400]"
            >
              저장
            </button>
          </form>
        )}
      </Topbar>
    </div>
  );
};

export default SeniorExtraInfoEdit;
