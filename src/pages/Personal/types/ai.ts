// 질문에 대한 키워드 생성 요청/응답
export interface GenerateKeywordsReq {
  questionId: number; // 서버 명세에 맞게 숫자/문자 타입 조정
  selected: string; // 31 화면에서 사용자가 고른 선택지
}

export interface GenerateKeywordsRes {
  keywords: string[]; // 명세에 맞게 이름/구조 조정 (result로 감싸면 변경)
}

// 키워드 기반 답변(틀) 생성 요청/응답
export interface GenerateAnswerReq {
  questionId: number;
  keywords: string[]; // 선택된(또는 추천된) 키워드들
}

export interface GenerateAnswerRes {
  answer: string; // AI가 만들어 준 '틀'
}

// 사용자 경험 반영한 최종 답변 업데이트
export interface UpdateAnswerReq {
  questionId: number;
  updatedInfo: string; // 32 화면의 "관련된 경험" 입력값
}

export interface UpdateAnswerRes {
  answer: string; // 최종 합성된 답변
}
