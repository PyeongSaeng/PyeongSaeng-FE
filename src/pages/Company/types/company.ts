// 사용자 관련 타입 정의
export interface IdFindResult {
  userName: string;
  userId: string;
}

// API 연동을 위한 아이디 찾기 요청/응답 타입
export interface IdFindRequest {
  name: string;
  phoneNumber: string;
  verificationCode: string;
}

export interface IdFindResponse {
  success: boolean;
  data?: IdFindResult;
  message?: string;
}
