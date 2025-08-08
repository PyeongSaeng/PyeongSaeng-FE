import axiosInstance from '../axiosInstance';

export const getSeniorBasicInfo = async (endpoint: string) => {
  try {
    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} 실패`, err);
    throw err;
  }
};
