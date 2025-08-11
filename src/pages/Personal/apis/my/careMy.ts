import axiosInstance from '../../../../shared/apis/axiosInstance';

// 보호자 기본정보 조회
export const getCareBasicInfo = async (endpoint: string) => {
  try {
    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} 실패`, err);
    throw err;
  }
};
