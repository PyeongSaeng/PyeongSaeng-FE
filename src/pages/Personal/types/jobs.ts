//API 응답의 공통 래퍼
export type ApiEnvelope<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};
//일자리 추천 관련 타입 정의
export type JobRecommendation = {
  jobPostId: number;
  workplaceName: string;
  description: string;
  imageUrl: string;
  distanceKm: number;
};
// 일자리 상세조회 타입 정의
export type JobImage = {
  jobPostId: number;
  name: string;
  imageUrl: string;
};

export type JobDetail = {
  title: string;
  address: string;
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
  images: JobImage[];
  travelTime: string;
};
// 일자리 저장토글 타입 정의
export type JobBookmarkResult = {
  bookmarkId: number;
  updated: boolean;
};
// 일자리 저장 타입 정의 (최하위 -> 최상위)
export type BookmarkImage = {
  jobPostId: number;
  keyName: string;
  imageUrl: string;
  originalFileName: string;
};
export type JobPostDetailDTO = {
  title: string;
  address: string;
  detailAddress: string;
  roadAddress: string;
  zipcode: string;
  hourlyWage: number;
  monthlySalary: number | null;
  yearSalary: number | null;
  description: string;
  workingTime: string;
  deadline: string;
  recruitCount: number;
  note: string;
  images: BookmarkImage[];
  travelTime: string;
};
export type BookmarkSummary = {
  bookmarkId: number;
  jobPostDetailDTO: JobPostDetailDTO;
};
export type BookmarkedJobsResponse = {
  bookmarkSummaryDTOList: BookmarkSummary[];
};

// 보호자 신청함 타입 정의
export type ProtectorApplicationItem = {
  applicationId: number;
  seniorId: number;
  jobPostId: number;
  seniorName: string;
  applicationStatus:
    | 'NON_STARTED'
    | 'DRAFT'
    | 'SUBMITTED'
    | 'APPROVED'
    | 'REJECTED';
};
export type ProtectorApplicationResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ProtectorApplicationItem[];
};
// 요즘 뜨는 일자리 목록조희
export type JobTrendItem = {
  id: number;
  title: string;
  description: string;
  address: string;
  images: {
    jobPostId: number;
    keyName: string;
    imageUrl: string;
    originalFileName: string;
  }[];
};

export type JobTrendResponse = {
  jobPostList: JobTrendItem[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};
//// 일자리 검색
// 검색 요청 바디
export type SearchJobRequest = {
  keyword: string;
  sort?: 'DISTANCE_ASC' | 'POPULARITY_DESC';
  searchAfter?: number[] | null;
  size?: number;
};
// 검색 응답 아이템
export type SearchJobItem = {
  id: number;
  title: string;
  address: string;
  imageUrl: string;
  displayApplicationCount: number;
};
// 검색 응답 전체 타입
export type SearchJobResponse = {
  results: SearchJobItem[];
  searchAfter: number[];
  totalCount: number;
  hasNext: boolean;
};