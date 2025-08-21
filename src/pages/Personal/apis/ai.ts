import axiosInstance from '../../../shared/apis/axiosInstance';

/** 선택형 QA */
export interface QAOption {
  question: string; // 예: "어디에서 일하는 것을 선호하시나요?"
  option: string; // 예: "실내"
}

/** ── 1) 키워드 추천 ───────────────────────────────────────── */
export interface ReqGenerateKeywords {
  answers: QAOption[]; // 선택형들
  question: string; // 메인 질문 (예: "지원 동기가 무엇인가요?")
}
export interface ResGenerateKeywords {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string[]; // 키워드 배열
}
export const postGenerateKeywords = async (
  body: ReqGenerateKeywords
): Promise<ResGenerateKeywords['result']> => {
  const { data } = await axiosInstance.post<ResGenerateKeywords>(
    '/api/ai/keywords',
    body
  );
  return data.result;
};

/** ── 2) 스캐폴드(초안) 생성 ──────────────────────────────── */
export interface ReqGenerateAnswer {
  answers: QAOption[];
  question: string;
  selectedKeyword: string;
}
export interface ResGenerateAnswer {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string; // 스캐폴드 문장
}
export const postGenerateAnswer = async (
  body: ReqGenerateAnswer
): Promise<ResGenerateAnswer['result']> => {
  const { data } = await axiosInstance.post<ResGenerateAnswer>(
    '/api/ai/answers',
    body
  );
  return data.result;
};

/** ── 3) 보강 문장(최종) 생성 ─────────────────────────────── */
export interface ReqGenerateUpdatedAnswer {
  answers: QAOption[]; // 선택형들
  question: string; // 메인 질문
  generatedAnswer: string; // 스캐폴드(기존 생성 문장)
  addedExperience: string; // 개인 경험 텍스트
}
export interface ResGenerateUpdatedAnswer {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string; // 최종 보강 문장
}
export const postGenerateUpdatedAnswer = async (
  body: ReqGenerateUpdatedAnswer
): Promise<ResGenerateUpdatedAnswer['result']> => {
  const { data } = await axiosInstance.post<ResGenerateUpdatedAnswer>(
    '/api/ai/updated-answers',
    body
  );
  return data.result;
};
