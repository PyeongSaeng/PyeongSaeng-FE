import axiosInstance from '../../../shared/apis/axiosInstance';
import {
  SeniorSignupRequest,
  SendVerificationRequest,
  VerifyCodeRequest,
} from '../types/auth';

// 시니어 회원가입
export const signupSenior = async (data: SeniorSignupRequest) => {
  const response = await axiosInstance.post('/api/auth/signup/senior', data);
  return response.data;
};

// 인증번호 발송 - body로 phone 전송
export const sendVerificationCode = async (data: SendVerificationRequest) => {
  const response = await axiosInstance.post('/api/sms/send', {
    phone: data.phone
  });
  return response.data;
};

// 인증번호 확인
export const verifyCode = async (data: VerifyCodeRequest) => {
  const response = await axiosInstance.post('/api/sms/verify', data);
  return response.data;
};

// 아이디 중복 확인 - username을 query params로 전송
export const checkUsernameAvailability = async (username: string) => {
  const response = await axiosInstance.get(`/api/auth/check-username?username=${username}`);
  return response.data;
}; 