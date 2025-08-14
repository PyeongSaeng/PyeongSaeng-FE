import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  ReqSubmitApplicationDirect,
  ReqSubmitApplicationDelegate,
  ResSubmitApplication,
} from '../types/applications';

/** (간소 플로우) 신청 생성만: POST /api/applications/ensure?jobPostId= */
export const postApplicationsEnsure = async (jobPostId: number) => {
  // 스웨거가 query로 받으므로 params 사용
  await axiosInstance.post('/api/applications/ensure', null, {
    params: { jobPostId },
  });
};

// 본인 직접 제출 (최종 or 임시저장)
export const postApplicationDirect = async (
  body: ReqSubmitApplicationDirect
): Promise<ResSubmitApplication['result']> => {
  const { data } = await axiosInstance.post<ResSubmitApplication>(
    '/api/applications/direct',
    body
  );
  return data.result;
};

// 대리 제출(필요 시)
export const postApplicationDelegate = async (
  body: ReqSubmitApplicationDelegate
): Promise<ResSubmitApplication['result']> => {
  const { data } = await axiosInstance.post<ResSubmitApplication>(
    '/api/applications/delegate',
    body
  );
  return data.result;
};
