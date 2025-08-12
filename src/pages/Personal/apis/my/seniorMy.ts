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

// 전화번호로 시니어 조회
export const searchSeniorByPhone = async (requestBody: { phone: string }) => {
  try {
    const res = await axiosInstance.post(
      '/api/user/senior/search',
      requestBody
    );
    return res.data;
  } catch (err) {
    console.error(`POST ${'/api/user/senior/search'}: `, err);
    throw err;
  }
};

// 보호자-시니어 연결
export const connectSenior = async (requestBody: { seniorId: number }) => {
  try {
    const res = await axiosInstance.post(
      '/api/user/protector/connect-senior',
      requestBody
    );
    return res.data;
  } catch (err) {
    console.error(`POST ${'/api/user/protector/connect-senior'}: `, err);
    throw err;
  }
};
