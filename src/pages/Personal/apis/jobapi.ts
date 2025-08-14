import axios from "axios";
import { ApiEnvelope, JobRecommendation, JobDetail, JobBookmarkResult, BookmarkedJobsResponse } from "../types/jobs";
import axiosInstance from "../../../shared/apis/axiosInstance";

const baseURL = import.meta.env.VITE_API_BASE_URL;
// axios 인스턴스 생성
const http = axios.create({
  baseURL,
});
// 토큰 자동 포함 
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
});
//공통 GET helper
async function getResult<T>(url: string, params?: Record<string, any>) {
  const { data } = await http.get<ApiEnvelope<T>>(url, { params });
  return data.result;
}
//맞춤 채용공고 추천
export function apiGetRecommendations(userId: number) {
  return getResult<JobRecommendation[]>("/api/job/recommendations", { userId });
}
// 일자리 상세조회
export async function apiGetJobDetail(jobPostId: number) {
  const { data } = await http.get<ApiEnvelope<JobDetail>>(`/api/job/posts/${jobPostId}`);
  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message ?? "Failed to load job detail");
  }
  return data.result;
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
    "/api/bookmarks/mine"
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

