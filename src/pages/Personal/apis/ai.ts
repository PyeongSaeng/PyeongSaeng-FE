import axiosInstance from '../../../shared/apis/axiosInstance';
import type {
  GenerateKeywordsReq,
  GenerateKeywordsRes,
  GenerateAnswerReq,
  GenerateAnswerRes,
  UpdateAnswerReq,
  UpdateAnswerRes,
} from '../types/ai';

const RESOLVED_BASE =
  (axiosInstance.defaults.baseURL as string | undefined) ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  undefined;

// 실패 응답 방어 + result 언랩
const unwrap = <T>(data: any): T => {
  if (data && typeof data === 'object') {
    if (data.success === false) {
      // 백엔드가 공통 오류 포맷을 주는 경우
      const msg = data.message || '요청 처리 중 오류가 발생했습니다.';
      throw new Error(msg);
    }
    if ('result' in data) {
      return data.result as T;
    }
  }
  return data as T;
};

// 공통 post 헬퍼: baseURL은 있을 때만 덮어쓰기(프록시 사용 시 undefined 유지)
const post = <TReq, TRes>(url: string, body: TReq) =>
  axiosInstance.post<TRes>(
    url,
    body,
    RESOLVED_BASE ? { baseURL: RESOLVED_BASE } : undefined
  );

// 1) 키워드 생성
export const postGenerateKeywords = async (
  body: GenerateKeywordsReq
): Promise<GenerateKeywordsRes> => {
  const { data } = await post<GenerateKeywordsReq, GenerateKeywordsRes>(
    '/api/ai/keywords',
    body
  );
  return unwrap<GenerateKeywordsRes>(data);
};

// 2) 답변(틀) 생성
export const postGenerateAnswer = async (
  body: GenerateAnswerReq
): Promise<GenerateAnswerRes> => {
  const { data } = await post<GenerateAnswerReq, GenerateAnswerRes>(
    '/api/ai/answers',
    body
  );
  return unwrap<GenerateAnswerRes>(data);
};

// 3) 관련 경험 반영 → 최종 답변
export const postUpdateAnswer = async (
  body: UpdateAnswerReq
): Promise<UpdateAnswerRes> => {
  const { data } = await post<UpdateAnswerReq, UpdateAnswerRes>(
    '/api/ai/updated-answers',
    body
  );
  return unwrap<UpdateAnswerRes>(data);
};
