import axiosInstance from '../axiosInstance';

type seniorInfo = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    username: string;
    name: string;
    phone: string;
    age: number;
    roadAddress: string;
    detailAddress: string;
    job: string;
    experiencePeriod: string;
  };
};

export const getSeniorBasicInfo = async (endpoint: string) => {
  try {
    const res = await axiosInstance.get(endpoint);
    // console.log('res: ', res);
    console.log('res.data: ', res.data);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} 실패`, err);
    throw err; // 호출부에서 처리해줘야 함
  }
};
