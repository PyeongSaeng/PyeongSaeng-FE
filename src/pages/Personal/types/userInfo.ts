// 시니어
export type Info = {
  id: number;
  username: string;
  name: string;
  phone: string;
  age: number;
  password: string;
  roadAddress: string;
  detailAddress: string;
  job: JobType;
  experiencePeriod: ExperiencePeriodType;
};

export enum JobType {
  HOUSEWIFE = 'HOUSEWIFE',
  EMPLOYEE = 'EMPLOYEE',
  PUBLIC_OFFICER = 'PUBLIC_OFFICER',
  PROFESSIONAL = 'PROFESSIONAL',
  ARTIST = 'ARTIST',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  ETC = 'ETC',
}

// 화면에 보여줄 글씨 매핑
export const JobTypeLabel: Record<JobType, string> = {
  [JobType.HOUSEWIFE]: '주부',
  [JobType.EMPLOYEE]: '회사원',
  [JobType.PUBLIC_OFFICER]: '공무원',
  [JobType.PROFESSIONAL]: '전문직',
  [JobType.ARTIST]: '예술가',
  [JobType.BUSINESS_OWNER]: '사업가',
  [JobType.ETC]: '기타',
};

export enum ExperiencePeriodType {
  LESS_THAN_6_MONTHS = 'LESS_THAN_6_MONTHS',
  SIX_MONTHS_TO_1_YEAR = 'SIX_MONTHS_TO_1_YEAR',
  ONE_TO_THREE_YEARS = 'ONE_TO_THREE_YEARS',
  THREE_TO_FIVE_YEARS = 'THREE_TO_FIVE_YEARS',
  FIVE_TO_TEN_YEARS = 'FIVE_TO_TEN_YEARS',
  OVER_TEN_YEARS = 'OVER_TEN_YEARS',
}

export const ExperiencePeriodLabel: Record<ExperiencePeriodType, string> = {
  [ExperiencePeriodType.LESS_THAN_6_MONTHS]: '6개월 이하',
  [ExperiencePeriodType.SIX_MONTHS_TO_1_YEAR]: '6개월 이상 1년 미만',
  [ExperiencePeriodType.ONE_TO_THREE_YEARS]: '1년 이상 3년 미만',
  [ExperiencePeriodType.THREE_TO_FIVE_YEARS]: '3년 이상 5년 미만',
  [ExperiencePeriodType.FIVE_TO_TEN_YEARS]: '5년 이상 10년 미만',
  [ExperiencePeriodType.OVER_TEN_YEARS]: '10년 이상',
};

export interface updateSeniorData {
  phone?: string;
  roadAddress?: string;
  detailAddress?: string;
  job?: string;
  experiencePeriod?: string;
  passwordChangeRequest?: boolean;
  currentPassword?: string;
  newPassword?: string;
}

// 보호자
export type CareInfo = {
  id: number;
  username: string;
  name: string;
  phone: string;
};

export type LinkedSenior = {
  seniorId: number;
  seniorName: string;
  seniorPhone: string;
};

export type Image = {
  imageId: number;
  keyName: string;
  imageUrl: string;
  originalFileName: string;
};

export enum applicationStatus {
  SUBMITTED = '미정',
  APPROVED = '합격',
  REJECTED = '불합',
}

export type ApplicationType = {
  applicationId: number;
  title: string;
  deadline: string;
  applicationStatus: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  images: Image[];
};

export type ApplicationDetail = {
  title: string;
  address: string;
  detailAddress: string;
  roadAddress: string;
  zipcode: string;
  hourlyWage: number | null;
  yearSalary: number | null;
  description: string;
  workingTime: string;
  deadline: string;
  recruitCount: number;
  note: string;
  images: Image[];
  travelTime: string;
};

// 공통

// 비밀번호 변경
export type passwordUpdate = {
  passwordChangeRequested: boolean;
  currentPassword: string;
  newPassword: string;
};
