import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  ReqSubmitApplicationDirect,
  ReqSubmitApplicationDelegate,
  ResSubmitApplication,
} from '../types/applications';

/** (간소 플로우) 신청 생성만: POST /api/applications/ensure?jobPostId= */
export const postApplicationsEnsure = async (jobPostId: number) => {
  await axiosInstance.post('/api/applications/ensure', null, {
    params: { jobPostId },
  });
};

/** 개인(본인) 제출/임시저장 */
export const postApplicationDirect = async (
  body: ReqSubmitApplicationDirect
): Promise<ResSubmitApplication['result']> => {
  const { data } = await axiosInstance.post<ResSubmitApplication>(
    '/api/applications/direct', 
  );
  return data.result;
};

/** 보호자 대리 제출/임시저장 */
export const postApplicationDelegate = async (
  body: ReqSubmitApplicationDelegate
): Promise<ResSubmitApplication['result']> => {
  const { data } = await axiosInstance.post<ResSubmitApplication>(
    '/api/applications/delegate',
    body
  );
  return data.result;
};
