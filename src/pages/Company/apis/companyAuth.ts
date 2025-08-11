import axiosInstance from '../../../shared/apis/axiosInstance';
import { CompanySigninRequest, CompanyLoginRequest } from '../types/auth';
import { IdFindRequest, ResetPasswordRequest, VerifyPasswordResetRequest } from '../types/findAccount';

// 기업 로그인
export const loginCompany = async (data: CompanyLoginRequest) => {
  const response = await axiosInstance.post('/api/companies/login', data);
  return response.data;
};

// 기업 회원가입
export const signupCompany = async (data: CompanySigninRequest) => {
  const response = await axiosInstance.post('/api/companies/sign-up', data);
  return response.data;
};

// 아이디 중복 확인
export const checkCompanyUsername = async (username: string) => {
  const response = await axiosInstance.get(`/api/companies/check-username?username=${username}`);
  return response.data;
};

// SMS 인증번호 발송
export const sendCompanyVerificationCode = async (phone: string) => {
  const response = await axiosInstance.post('/api/sms/send', {
    phone: phone
  });
  return response.data;
};

// 로그아웃 
export const logoutCompany = async () => {
  const response = await axiosInstance.post('/api/companies/logout');
  return response.data;
};

// 아이디 찾기 
export const findUsername = async (data: IdFindRequest) => {
  const response = await axiosInstance.post('/api/companies/find-username', {
    ownerName: data.ownerName,
    phone: data.phone,
    verificationCode: data.verificationCode
  });
  return response.data;
};

// 비밀번호 재설정 인증
export const verifyPasswordReset = async (data: VerifyPasswordResetRequest) => {
  const response = await axiosInstance.post('/api/companies/reset-password/verify', data);
  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await axiosInstance.post('/api/companies/reset-password', data);
  return response.data;
};