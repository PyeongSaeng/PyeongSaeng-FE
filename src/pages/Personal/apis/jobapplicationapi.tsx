import axiosInstance from '../../../shared/apis/axiosInstance';
import { PostApplicationDirectRequest } from '../types/jobapplication';
import { ApiEnvelope, ProtectorApplicationItem } from '../types/jobs';

// ===== 지원서 제출 관련 =====

// 신청서 직접 제출
export const apiPostApplicationDirect = async (
  body: PostApplicationDirectRequest
) => {
  const res = await axiosInstance.post('/api/applications/direct', body);
  return res.data;
};

// 보호자가 대리 신청서 제출
export const apiPostApplicationDelegate = async (
  body: PostApplicationDirectRequest
) => {
  const res = await axiosInstance.post('/api/applications/delegate', body);
  return res.data;
};

// 지원서 임시저장/제출 (PUT)
export const apiPutApplication = async (
  applicationId: number,
  body: PostApplicationDirectRequest
) => {
  const res = await axiosInstance.put(
    `/api/applications/${applicationId}`,
    body
  );
  return res.data;
};

// ===== 지원서 관리 관련 =====

// 일자리 신청 (ensure)
export const apiEnsureApplication = async (jobPostId: number) => {
  const res = await axiosInstance.post('/api/applications/ensure', null, {
    params: { jobPostId },
  });
  return res.data.result;
};

// 일자리 신청상태 목록
export type ApplicationItem = {
  applicationId: number;
  jobPostId: number;
  applicationStatus:
    | 'NON_STARTED'
    | 'DRAFT'
    | 'SUBMITTED'
    | 'APPROVED'
    | 'REJECTED';
};

export const apiGetMyApplications = async (): Promise<ApplicationItem[]> => {
  const res = await axiosInstance.get<ApiEnvelope<ApplicationItem[]>>(
    '/api/applications/mine'
  );
  return res.data.result;
};

// 일자리 신청 삭제
export const apiDeleteApplication = async (applicationId: number) => {
  const res = await axiosInstance.delete(`/api/applications/${applicationId}`);
  return res.data.result;
};

// 일자리 신청[보호자]
export async function apiGetProtectorApplications(): Promise<
  ProtectorApplicationItem[]
> {
  const res = await axiosInstance.get<ApiEnvelope<ProtectorApplicationItem[]>>(
    '/api/applications/protector'
  );
  return res.data.result ?? [];
}

// ===== 질문 조회 관련 =====

// 채용공고 질문 목록 조회 (유저가 직접 신청할 때)
export const apiGetJobQuestionsDirect = async (jobPostId: number) => {
  const res = await axiosInstance.get(`/api/job/${jobPostId}/questions/direct`);
  return res.data;
};

// 채용공고 질문 목록 조회 (보호자가 대리 신청할 때)
export const apiGetJobQuestionsDelegate = async (jobPostId: number) => {
  const res = await axiosInstance.get(
    `/api/job/${jobPostId}/questions/delegate`
  );
  return res.data;
};
