// 일자리 post 요청 DTO
export interface CreateJobDTO {
  title: string;
  address: string;
  detailAddress: string;
  roadAddress: string;
  zipcode: string;
  hourlyWage?: number;
  monthlySalary?: number | null;
  yearSalary?: number | null;
  description: string;
  workingTime: string;
  deadline?: string;
  recruitCount: number;
  note?: string;
  jobPostImageList?: JobPostImage[];
  formFieldList: JobPostFormField[];
}
export interface JobPostImage {
  keyName?: string;
  originalFileName?: string;
}
export interface JobPostFormField {
  fieldName: string;
  fieldType: 'TEXT' | 'IMAGE';
}
export const BASE_FORM_FIELDS: JobPostFormField[] = [
  { fieldName: '성함', fieldType: 'TEXT' },
  { fieldName: '연세', fieldType: 'TEXT' },
  { fieldName: '거주지', fieldType: 'TEXT' },
  { fieldName: '전화번호', fieldType: 'TEXT' },
];
//////////////////////////////////////////////////////
//빈 데이터
export type JobDraft = Partial<CreateJobDTO>;

export const EMPTY_JOB_DRAFT: JobDraft = {
  title: "",
  address: "",
  detailAddress: "",
  roadAddress: "",
  zipcode: "",
  hourlyWage: undefined,
  monthlySalary: null,
  yearSalary: null,
  description: "",
  workingTime: "",
  deadline: "",
  recruitCount: 1,
  note: "",
  jobPostImageList: [],
  formFieldList: BASE_FORM_FIELDS,
} satisfies JobDraft;
//////////////////////////////////////////////////////
// 일자리 get DTO
export interface JobListDTO {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Result;
}
export interface Result {
  jobPostList: JobPostList[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}
export interface JobPostList {
  id: number;
  state: "RECRUITING" | "CLOSED" | string;
  title: string;
  images: Image[];
}
export interface Image {
  jobPostId: number;
  keyName: string;
  imageUrl: string;
  originalFileName: string;
}





