import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  ReqGenerateKeywords,
  ResGenerateKeywords,
  ReqGenerateAnswer,
  ResGenerateAnswer,
} from '../types/ai';

export const postGenerateKeywords = async (
  body: ReqGenerateKeywords
): Promise<ResGenerateKeywords['result']> => {
  const { data } = await axiosInstance.post<ResGenerateKeywords>(
    '/api/ai/keywords',
    body
  );
  return data.result;
};

export const postGenerateAnswer = async (
  body: ReqGenerateAnswer
): Promise<ResGenerateAnswer['result']> => {
  const { data } = await axiosInstance.post<ResGenerateAnswer>(
    '/api/ai/answers',
    body
  );
  return data.result;
};
