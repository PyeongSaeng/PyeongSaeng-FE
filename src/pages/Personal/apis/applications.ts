import axiosInstance from '../../../shared/apis/axiosInstance';
import { ReqSubmitApplicationDirect } from '../types/applications';

/** (간소 플로우) 신청 생성만: POST /api/applications/ensure?jobPostId= */
export const postApplicationsEnsure = async (jobPostId: number) => {
  await axiosInstance.post('/api/applications/ensure', null, {
    params: { jobPostId },
  });
};

// postApplicationDirect 함수 추가
export const postApplicationDirect = async (
  body: ReqSubmitApplicationDirect
) => {
  const response = await axiosInstance.post('/api/applications/direct', body);
  return response.data;
};

/** 보호자 대리 제출/임시저장 */
export const postApplicationDelegate = async (body: any) => {
  const response = await axiosInstance.post('/api/applications/delegate', body);
  return response.data;
};
