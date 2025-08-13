import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  ReqSubmitApplicationDirect,
  ReqSubmitApplicationDelegate,
  ResSubmitApplication,
} from '../types/applications';

// 본인 직접 제출
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
