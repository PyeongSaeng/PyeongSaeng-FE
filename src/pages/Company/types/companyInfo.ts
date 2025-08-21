// 회사 정보 조회
export type CompanyInfo = {
  companyId: number;
  username: string;
  businessNo: string;
  companyName: string;
  ownerName: string;
  email: string | null;
  phone: string;
  status: string;
};

export type UpdateCompanyInfo = {
  companyName?: string;
  ownerName?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  passwordChangeRequested?: boolean;
};

// 회사구인공고 재업

// 이미지 타입
export type JobPostImage = {
  jobPostId: number;
  keyName: string;
  imageUrl: string;
  originalFileName: string;
};

// 목록 조회시 필요
export type JobPost = {
  id: string;
  state: string;
  title: string;
  roadAddress: string;
  description: string;
  images: JobPostImage[];
};

// 회사구인공고 리포스트

export type RepostImage = {
  keyName: string;
  originalFileName: string;
};

export type RepostFormField = {
  fieldName: string;
  fieldType: 'TEXT' | 'IMAGE';
};

export type RepostJob = {
  id: number;
  state: string;
  title: string;
  address?: string;
  detailAddress: string;
  roadAddress: string;
  zipcode: string;
  hourlyWage: number | null;
  monthlySalary: number | null;
  yearSalary: number | null;
  description: string;
  workingTime: string;
  deadline: string;
  recruitCount: number;
  note: string;
  jobPostImageList: JobPostImage[];
  formFieldList: RepostFormField[];
};
