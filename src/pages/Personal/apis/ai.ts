import axiosInstance from '../../../shared/apis/axiosInstance';

export interface QAOption {
  question: string;
  option: string;
}

/** 키워드 추천 */
export interface ReqGenerateKeywords {
  answers: QAOption[];
  question: string;
}
export interface ResGenerateKeywords {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string[];
}

/** 문장(스캐폴드) 생성 */
export interface ReqGenerateAnswer {
  answers: QAOption[];
  question: string;
  selectedKeyword: string;
}
export interface ResGenerateAnswer {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

/** 스캐폴드 + 개인경험으로 최종 문장 생성 */
export interface ReqGenerateUpdatedAnswer {
  answers: QAOption[];
  question: string;
  selectedKeyword: string;
  extraInfo: string;
  scaffold: string;
}
export interface ResGenerateUpdatedAnswer {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

/* --- API 함수들 --- */
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

//export const postGenerateUpdatedAnswer = async (
// body: ReqGenerateUpdatedAnswer
//): Promise<ResGenerateUpdatedAnswer['result']> => {
// const { data } = await axiosInstance.post<ResGenerateUpdatedAnswer>(
// '/api/ai/updated-answers',
// body
//);
//return data.result;
//};
