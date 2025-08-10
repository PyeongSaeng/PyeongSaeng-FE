import axiosInstance from '../axiosInstance';
import { updateSeniorData } from '../../../pages/Personal/types/userInfo';

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

// 시니어 기본정보 수정
export const updateSeniorBasicInfo = async (
  endpoint: string,
  updateData: updateSeniorData
) => {
  try {
    const res = await axiosInstance.patch(endpoint, updateData);
  } catch (err) {
    console.error(`PATCH ${endpoint} 실패`, err);
    throw err;
  }
};
