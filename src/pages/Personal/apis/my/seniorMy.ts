import axiosInstance from '../../../../shared/apis/axiosInstance';

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

// 연결된 시니어 목록 조회
export const getLinkedSeniorList = async (endpoint: string) => {
  try {
    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} 실패`, err);
    throw err;
  }
};
