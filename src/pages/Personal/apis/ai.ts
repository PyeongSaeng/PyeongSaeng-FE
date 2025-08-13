import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  ReqGenerateKeywords,
  ResGenerateKeywords,
  ReqGenerateAnswer,
  ResGenerateAnswer,
} from '../types/ai';

// 키워드 추천 생성
export const postGenerateKeywords = async (
  body: ReqGenerateKeywords
): Promise<ResGenerateKeywords['result']> => {
  const { data } = await axiosInstance.post<ResGenerateKeywords>(
    '/api/ai/keywords',
    body
  );
  return data.result;
};

// 문장 자동 생성
export const postGenerateAnswer = async (
  body: ReqGenerateAnswer
): Promise<ResGenerateAnswer['result']> => {
  const { data } = await axiosInstance.post<ResGenerateAnswer>(
    '/api/ai/answers',
    body
  );
  return data.result;
};
