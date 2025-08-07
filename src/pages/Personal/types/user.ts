// 사용자 관련 타입 정의
export interface IdFindResult {
  userName: string;
  userId: string;
}

// 아이디 찾기 요청
export interface IdFindRequest {
  name: string;
  phone: string;
  verificationCode: string;
}

export interface IdFindResponse {
  success: boolean;
  data?: IdFindResult;
  message?: string;
}

// 계정 찾기용 SMS 발송 요청
export interface AccountSMSRequest {
  phone: string;
} 