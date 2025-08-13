import axiosInstance from '../../../shared/apis/axiosInstance';

// 마감공고 조회
export const getCompanyData = async (endpoint: string) => {
  try {
    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} 실패`, err);
    throw err;
  }
};
