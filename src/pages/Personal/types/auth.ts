export type Gender = 'MALE' | 'FEMALE';

export type Job =
  | 'HOUSEWIFE'
  | 'EMPLOYEE'
  | 'PUBLIC_OFFICER'
  | 'PROFESSIONAL'
  | 'ARTIST'
  | 'BUSINESS_OWNER'
  | 'ETC';

export type ExperiencePeriod =
  | 'LESS_THAN_6_MONTHS'
  | 'SIX_MONTHS_TO_1_YEAR'
  | 'ONE_TO_THREE_YEARS'
  | 'THREE_TO_FIVE_YEARS'
  | 'FIVE_TO_TEN_YEARS'
  | 'OVER_TEN_YEARS';

// 프로필
export interface BaseSignupInfo {
  username: string;
  password: string;
  name: string;
  age: number;
  gender: Gender;
}

// 주소 정보
export interface AddressInfo {
  zipcode: string;
  roadAddress: string;
  detailAddress?: string;
}

// 보호자 연결 여부
export interface ProtectorConnectionInfo {
  protectorId: number | null; // null이면 독립 가입
  relation?: string; // protectorId가 있을 때만 필수
}

export interface ProfileInfo {
  job: Job;
  experiencePeriod: ExperiencePeriod;
}

// 시니어
export interface SeniorSignupRequest
  extends BaseSignupInfo,
    ProfileInfo,
    AddressInfo,
    ProtectorConnectionInfo {
  phoneNum: string;
  providerType: string | null;
  providerUserId: number | null;
}

// 보호자
export interface ProtectorSignupRequest {
  username: string;
  password: string;
  name: string;
  phone: string;
  providerType: string | null;
  providerUserId: number | null;
}

// 인증 번호 발송
export interface SendVerificationRequest {
  phone: string;
}

// 인증 번호 확인
export interface VerifyCodeRequest {
  phone: string;
  verificationCode: string;
}

// 일반 로그인
export interface LoginRequest {
  username: string;
  password: string;
}
