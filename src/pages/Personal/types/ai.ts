// 시니어 기본질문에 대한 선택지(문항+옵션)
export interface QAOption {
  question: string; // 예: "어디에서 일하는 것을 선호하시나요?"
  option: string; // 예: "실내"
}

// POST /api/ai/keywords
export interface ReqGenerateKeywords {
  answers: QAOption[];
  question: string; // 예: "지원 동기가 무엇인가요?"
}
export interface ResGenerateKeywords {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string[]; // 예시: ["경제적인 이유", "사람들과 어울리고 싶어서", ...]
}

export type Keywords = string[];

// POST /api/ai/answers
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
