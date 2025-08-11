import axiosInstance from '../../../shared/apis/axiosInstance';
import { CompanySigninRequest, CompanyLoginRequest } from '../types/auth';

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