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
