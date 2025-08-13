//일자리 추천 관련 타입 정의
export type ApiEnvelope<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

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
