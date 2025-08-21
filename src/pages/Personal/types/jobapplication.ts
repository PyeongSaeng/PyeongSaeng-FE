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
  applicationStatus: 'NON_STARTED' | 'SUBMITTED';
  fieldAndAnswer: FieldAndAnswer[];
};
