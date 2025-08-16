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

export type JobPost = {
  id: string;
  state: string;
  title: string;
  roadAddress: string;
  description: string;
  images: JobPostImage[];
};
