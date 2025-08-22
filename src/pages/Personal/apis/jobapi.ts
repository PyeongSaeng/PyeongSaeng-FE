import axios from 'axios';
import {
  ApiEnvelope,
  JobRecommendation,
  JobDetail,
  JobBookmarkResult,
  BookmarkedJobsResponse,
  JobTrendResponse,
  SearchJobRequest,
  SearchJobResponse,
} from '../types/jobs';
import axiosInstance from '../../../shared/apis/axiosInstance';

const baseURL = import.meta.env.VITE_API_BASE_URL;
// axios 인스턴스 생성
const http = axios.create({
  baseURL,
});
// 토큰 자동 포함
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = 'application/json';
  return config;
});

//맞춤 채용공고 추천
export const apiGetRecommendedJobs = (userId: number) => {
  return axiosInstance.get<ApiEnvelope<JobRecommendation[]>>(
    `/api/job/recommendations?userId=${userId}`
  );
};

// 일자리 상세조회
export async function apiGetJobDetail(jobPostId: number) {
  const { data } = await http.get<ApiEnvelope<JobDetail>>(
    `/api/job/posts/${jobPostId}`
  );
  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message ?? 'Failed to load job detail');
  }
  return data.result;
}

// 보호자용 일자리 상세조회 (이건 그대로 유지)
export async function apiGetProtectorJobDetail(
  seniorId: number,
  jobPostId: number
): Promise<JobDetail> {
  const res = await axiosInstance.get(
    `/api/job/protector/seniors/${seniorId}/posts/${jobPostId}`
  );
  return res.data.result;
}

// 일자리 저장토글
export const apiSaveBookmark = async (jobPostId: number) => {
  const res = await axiosInstance.post<ApiEnvelope<JobBookmarkResult>>(
    `/api/bookmarks/${jobPostId}`
  );
  return res.data.result;
};

// 일자리 저장
export const apiGetSavedJobs = async () => {
  const res = await axiosInstance.get<ApiEnvelope<BookmarkedJobsResponse>>(
    '/api/bookmarks/mine'
  );
  return res.data.result.bookmarkSummaryDTOList;
};

// 일자리 삭제
export const apiDeleteBookmark = async (jobPostId: number) => {
  const res = await axiosInstance.delete<ApiEnvelope<string>>(
    `/api/bookmarks/${jobPostId}`
  );
  return res.data.result;
};

// 요즘 뜨는 일자리 목록조회
export async function apiGetJobTrends(
  pageNumber: number = 1,
  token?: string
): Promise<JobTrendResponse> {
  const { data } = await axiosInstance.get<ApiEnvelope<JobTrendResponse>>(
    '/api/job/trend',
    {
      params: { pageNumber },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }
  );

  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message ?? 'Failed to load job trends');
  }

  return data.result;
}

// 일자리 검색
export const apiSearchJobs = (body: SearchJobRequest) => {
  return axiosInstance.post<ApiEnvelope<SearchJobResponse>>(
    '/api/jobs/search',
    body
  );
};

//신청서 폼 필드 타입 정의
export async function getResult<T>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  try {
    const res = await axiosInstance.get<ApiEnvelope<T>>(url, {
      params,
    });

    if (!res.data.isSuccess || !res.data.result) {
      console.error('getResult 실패:', res.data);
      throw new Error(res.data.message ?? 'API 요청 실패');
    }

    console.log('getResult 성공, result:', res.data.result);
    return res.data.result;
  } catch (error) {
    console.error('getResult 에러:', error);
    throw error;
  }
}

// jobapplicationapi.tsx에서 가져온 함수들 (호환성 유지)
export {
  apiEnsureApplication,
  apiGetMyApplications,
  apiDeleteApplication,
  apiGetProtectorApplications,
  type ApplicationItem,
} from './jobapplicationapi';
