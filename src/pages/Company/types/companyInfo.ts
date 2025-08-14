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
export interface JobPostImage {
  jobPostId: number;
  keyName: string;
  imageUrl: string;
  originalFileName: string;
}

// jobPostList의 단일 아이템 타입
// export interface JobPostListItem {
//   id: number;
//   state: JobPostState;
//   title: string;
//   images: JobPostImage[];
// }

// result 페이징 메타 + 리스트
export interface JobPostListResult {
  jobPostList: JobPostList;
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

// 전체 응답 타입
export interface JobPostListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: JobPostListResult;
}

export type JobPostList = {};
