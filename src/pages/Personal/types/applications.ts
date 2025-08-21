// 신청 타입 공통 --------------------------------------------------------------
export type FieldType = 'TEXT' | 'IMAGE';

export interface ImageAnswerItem {
  keyName: string; // 업로드 후 저장 키
  originalFileName: string; // 사용자가 올린 파일명
}

export type FieldAnswerValue = string | ImageAnswerItem[];

export interface FieldAndAnswer {
  formFieldId: number; // 백엔드에서 내려준 필드 ID
  fieldType: FieldType;
  answer: FieldAnswerValue;
}

// ✅ 서버 스펙과 맞춘 상태값
export type ApplicationStatus = 'NON_STARTED' | 'DRAFT' | 'SUBMITTED';

// 요청/응답 DTO --------------------------------------------------------------
export interface ReqSubmitApplicationDirect {
  jobPostId: number;
  applicationStatus: ApplicationStatus;
  fieldAndAnswer: FieldAndAnswer[];
}

export interface ReqSubmitApplicationDelegate
  extends ReqSubmitApplicationDirect {
  seniorId: number; // 보호자 대리 제출 시 필수
}

export interface ResSubmitApplication {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    applicationId: number;
    jobPostId: number;
    applicationStatus: ApplicationStatus;
    createdAt: string;
    answers: Array<{
      fieldType: FieldType;
      formFieldId: number;
      formFieldName: string;
      answer: any;
    }>;
  };
}
