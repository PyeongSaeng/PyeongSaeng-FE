import axiosInstance from '../../../shared/apis/axiosInstance';

export type FieldType = 'TEXT' | 'IMAGE';

export interface QuestionField {
  formFieldId: number;
  formField: string;
  fieldType: FieldType;
  answer?: any;
}

export interface ResGetQuestions {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    formFieldList: QuestionField[];
  };
}

/** 본인 작성용: GET /api/job/{jobPostId}/questions/direct */
export const getQuestionsDirect = async (jobPostId: number) => {
  const { data } = await axiosInstance.get<ResGetQuestions>(
    `/api/job/${jobPostId}/questions/direct`
  );
  return data.result.formFieldList;
};

// 서버가 자동 채우는 "기본 필드" 이름
const BASIC_FIELD_NAMES = new Set([
  '이름',
  '성함',
  '연락처',
  '전화번호',
  '주소',
]);

/** 추가 항목만 추출 */
export const pickExtraFields = (all: QuestionField[]): QuestionField[] =>
  all.filter((f) => !BASIC_FIELD_NAMES.has(f.formField.trim()));

/** 해당 항목에 이미 답변이 있는지 판별 */
export const isFieldAnswered = (f: QuestionField): boolean => {
  if (f.fieldType === 'TEXT') {
    return typeof f.answer === 'string' && f.answer.trim().length > 0;
  }
  if (f.fieldType === 'IMAGE') {
    return Array.isArray(f.answer) && f.answer.length > 0;
  }
  return !!f.answer;
};
