// 일자리 post 요청 DTO
export interface CreateJobDTO {
  title: string;
  address: string;
  detailAddress: string;
  roadAddress: string;
  zipcode: string;
  hourlyWage?: number;
  monthlySalary?: number;
  yearSalary?: number;
  description?: string;
  workingTime?: string;
  deadline?: string;
  recruitCount?: number;
  note?: string;
  keyName?: string[];
}
//////////////////////////////////////////////////////
// 일자리 get 요청 타입 이걸로 가져다 쓰면됨
export interface JobPost {
  jobPostId: number;    //jobPostId!!로 변경
  title: string;
  imageUrl: string;     
  companyName: string;
  address: string;
  deadline: string;     // "2025-08-31"
  createdAt: string;    // "2025-07-25T10:00:00"
}
//전체 일자리 get 요정
export interface JobListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    jobPostList: JobPost[];
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  }
}
