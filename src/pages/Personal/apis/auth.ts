import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  SeniorSignupRequest,
  SendVerificationRequest,
  VerifyCodeRequest,
  LoginRequest,
  ProtectorSignupRequest,
} from '../types/auth';
import {
  IdFindRequest,
  AccountSMSRequest,
  VerifyPasswordResetRequest,
  ResetPasswordRequest,
} from '../types/user';

// 시니어 회원가입
export const signupSenior = async (data: SeniorSignupRequest) => {
  const response = await axiosInstance.post('/api/auth/signup/senior', data);
  return response.data;
};

// 보호자 회원가입
export const signupProtector = async (data: ProtectorSignupRequest) => {
  const response = await axiosInstance.post('/api/auth/signup/protector', data);
  return response.data;
};

// 인증번호 발송
export const sendVerificationCode = async (data: SendVerificationRequest) => {
  const response = await axiosInstance.post('/api/sms/send', {
    phone: data.phone,
  });
  return response.data;
};

// 인증번호 확인
export const verifyCode = async (data: VerifyCodeRequest) => {
  const response = await axiosInstance.post('/api/sms/verify', data);
  return response.data;
};

// 아이디 중복 확인
export const checkUsernameAvailability = async (username: string) => {
  const response = await axiosInstance.get(
    `/api/auth/check-username?username=${username}`
  );
  return response.data;
};

// 일반 로그인
export const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data;
};

// 카카오 OAuth 로그인 시작 (리다이렉트)
export const initKakaoLogin = () => {
  // 카카오 OAuth 인증 페이지로 리다이렉트
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
};

// 계정 찾기용 SMS 발송
export const sendAccountSMS = async (data: AccountSMSRequest) => {
  const response = await axiosInstance.post('/api/sms/send/account', {
    phone: data.phone,
  });
  return response.data;
};

// 아이디 찾기
export const findUsername = async (data: IdFindRequest) => {
  const response = await axiosInstance.post('/api/user/find-username', {
    name: data.name,
    phone: data.phone,
    verificationCode: data.verificationCode,
  });
  return response.data;
};

// 비밀번호 재설정 인증
export const verifyPasswordReset = async (data: VerifyPasswordResetRequest) => {
  const response = await axiosInstance.post(
    '/api/user/reset-password/verify',
    data
  );
  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await axiosInstance.post('/api/user/reset-password', data);
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};
