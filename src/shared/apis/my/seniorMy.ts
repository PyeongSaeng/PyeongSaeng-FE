import axiosInstance from '../axiosInstance';

// 시니어 기본정보 조회
export const getSeniorBasicInfo = async (endpoint: string) => {
  try {
    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} 실패`, err);
    throw err;
  }
};
