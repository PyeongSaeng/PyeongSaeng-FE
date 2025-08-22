// 신청서 제출버튼 시 사용하는 타입 정의
export type TextAnswer = {
  formFieldId: number;
  fieldType: 'TEXT' | 'IMAGE';
  answer: string;
};

export type ImageAnswer = {
  formFieldId: number;
  fieldType: 'IMAGE';
  answer: {
    keyName: string;
    originalFileName: string;
  }[];
};

export type FieldAndAnswer = TextAnswer | ImageAnswer;

export type PostApplicationDirectRequest = {
  jobPostId: number;
  applicationStatus:
    | 'NON_STARTED'
    | 'DRAFT'
    | 'SUBMITTED'
    | 'APPROVED'
    | 'REJECTED';
  fieldAndAnswer: FieldAndAnswer[];
};

// 질문 목록 조회 응답 타입 추가
export interface QuestionResponse {
  isSuccess: boolean;
  message: string;
  result: {
    formFieldList: FormField[];
  };
}

export interface FormField {
  id: number;
  fieldName: string;
  fieldType: 'TEXT' | 'IMAGE';
  required: boolean;
  answer?: string;
}
