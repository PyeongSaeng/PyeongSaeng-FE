// 사용자 관련 타입 정의
export interface IdFindResult {
  userName: string;
  userId: string;
}

// 아이디 찾기 요청
export interface IdFindRequest {
  ownerName: string;
  phone: string;
  verificationCode: string;
}

export interface IdFindResponse {
  success: boolean;
  data?: IdFindResult;
  message?: string;
}

// 비밀번호 재설정 인증 요청
export interface VerifyPasswordResetRequest {
  username: string;
  phone: string;
  verificationCode: string;
}

// 비밀번호 재설정 요청
export interface ResetPasswordRequest {
  username: string;
  newPassword: string;
}
