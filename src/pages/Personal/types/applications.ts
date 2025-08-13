export type FieldType = 'TEXT' | 'IMAGE';

export interface ImageAnswerItem {
  keyName: string; // 업로드 후 서버/S3 키
  originalFileName: string; // 사용자 파일명
}

export type FieldAnswerValue = string | ImageAnswerItem[];

export interface FieldAndAnswer {
  formFieldId: number; // 백엔드에서 내려준 해당 항목의 필드 ID
  fieldType: FieldType;
  answer: FieldAnswerValue;
}

export interface ReqSubmitApplicationDirect {
  jobPostId: number;
  applicationStatus: 'NON_STARTED' | 'DRAFT' | 'SUBMITTED';
  fieldAndAnswer: FieldAndAnswer[];
}
export interface ReqSubmitApplicationDelegate
  extends ReqSubmitApplicationDirect {
  seniorId: number;
}

export interface ResSubmitApplication {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    applicationId: number;
    jobPostId: number;
    applicationStatus: 'SUBMITTED' | 'DRAFT' | 'NON_STARTED';
    createdAt: string;
    answers: Array<{
      fieldType: FieldType;
      formFieldId: number;
      formFieldName: string;
      answer: any;
    }>;
  };
}
