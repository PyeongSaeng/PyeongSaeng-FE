import axiosInstance from '../../../shared/apis/axiosInstance';

export type FieldType = 'TEXT' | 'IMAGE';

export interface QuestionField {
  formFieldId: number;
  formField: string | null;
  fieldType: FieldType;
  answer?: unknown;
}

export interface ResGetQuestions {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { formFieldList: QuestionField[] };
}

export const getQuestionsDirect = async (jobPostId: number) => {
  const { data } = await axiosInstance.get<ResGetQuestions>(
    `/api/job/${jobPostId}/questions/direct`
  );
  return data.result?.formFieldList ?? [];
};

const normalize = (s: string) =>
  s
    .replace(/\s+/g, '')
    .replace(/[^\p{Letter}\p{Number}]/gu, '')
    .toLowerCase();

const BASIC_FIELD_NAMES = new Set(
  [
    '이름',
    '성함',
    '연락처',
    '전화번호',
    '주소',
    '휴대폰',
    '휴대전화',
    '주민등록번호',
  ].map(normalize)
);

export const pickExtraFields = (all: QuestionField[]): QuestionField[] =>
  all.filter((f) => {
    const name = (f.formField ?? '').trim();
    if (!name) return true;
    return !BASIC_FIELD_NAMES.has(normalize(name));
  });

export const isFieldAnswered = (f: QuestionField): boolean => {
  if (f.fieldType === 'TEXT') {
    return typeof f.answer === 'string' && f.answer.trim().length > 0;
  }
  if (f.fieldType === 'IMAGE') {
    return Array.isArray(f.answer) && f.answer.length > 0;
  }
  return !!f.answer;
};
