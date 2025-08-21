import axiosInstance from '../../../shared/apis/axiosInstance';

/**
 * 보호자가 시니어 대신 작성할 때 질문/필드 조회
 * GET /api/job/{jobPostId}/questions/delegate/{seniorId}
 * 반환은 getQuestionsDirect와 동일한 배열 형태로 정규화
 */
export const getQuestionsDelegate = async (
  jobPostId: number,
  seniorId: number
) => {
  const { data } = await axiosInstance.get(
    `/api/job/${jobPostId}/questions/delegate/${seniorId}`
  );
  // 스웨거 예시가 result.formFieldList라면 아래와 같이 정규화
  return data?.result?.formFieldList ?? data?.result ?? data;
};
