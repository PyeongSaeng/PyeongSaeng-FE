import axiosInstance from '../../../shared/apis/axiosInstance';
import { PostApplicationDirectRequest } from '../types/jobapplication';

// 신청서 제출버튼 시 사용하는 타입 정의
export const apiPostApplicationDirect = async (body: PostApplicationDirectRequest) => {
  const res = await axiosInstance.post('/api/applications/direct', body);
  return res.data;
};
