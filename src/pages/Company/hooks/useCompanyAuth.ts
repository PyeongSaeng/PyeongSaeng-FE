import { useMutation } from '@tanstack/react-query';
import {
  signupCompany,
  checkCompanyUsername,
  sendCompanyVerificationCode,
  loginCompany,
  findUsername,
  resetPassword,
  verifyPasswordReset,
} from '../apis/companyAuth';
import { CompanySigninRequest, CompanyLoginRequest } from '../types/auth';
import {
  IdFindRequest,
  VerifyPasswordResetRequest,
  ResetPasswordRequest,
} from '../types/findAccount';

// 기업 로그인
export const useCompanyLogin = () => {

  return useMutation({
    mutationFn: (data: CompanyLoginRequest) => loginCompany(data),
    onSuccess: (data) => {
      console.log('기업 로그인 성공:', data);
    },
    onError: (error: any) => {
      console.error('기업 로그인 실패:', error);
    },
  });
};

// 기업 회원가입 hook
export const useCompanySignup = () => {
  return useMutation({
    mutationFn: (data: CompanySigninRequest) => signupCompany(data),
    onSuccess: (data) => {
      console.log('기업 회원가입 성공:', data);
    },
    onError: (error: any) => {
      console.error('기업 회원가입 실패:', error);
    },
  });
};

// 아이디 중복 확인 hook
export const useCheckCompanyUsername = () => {
  return useMutation({
    mutationFn: (username: string) => checkCompanyUsername(username),
    onSuccess: (data) => {
      console.log('아이디 중복 확인 성공:', data);
    },
    onError: (error: any) => {
      console.error('아이디 중복 확인 실패:', error);
    },
  });
};

// SMS 인증번호 발송
export const useSendCompanyVerificationCode = () => {
  return useMutation({
    mutationFn: (phone: string) => sendCompanyVerificationCode(phone),
    onSuccess: (data) => {
      console.log('인증번호 발송 성공:', data);
    },
    onError: (error: any) => {
      console.error('인증번호 발송 실패:', error);
    },
  });
};

// 아이디 찾기 훅
export const useFindUsername = () => {
  return useMutation({
    mutationFn: (data: IdFindRequest) => findUsername(data),
    onSuccess: (data) => {
      console.log('아이디 찾기 성공:', data);
    },
    onError: (error) => {
      console.error('아이디 찾기 실패:', error);
    },
  });
};

// 비밀번호 재설정 인증 훅
export const useVerifyPasswordReset = () => {
  return useMutation({
    mutationFn: (data: VerifyPasswordResetRequest) => verifyPasswordReset(data),
    onSuccess: (data) => {
      console.log('비밀번호 재설정 인증 성공:', data);
    },
    onError: (error) => {
      console.error('비밀번호 재설정 인증 실패:', error);
    },
  });
};

// 비밀번호 재설정 훅
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
    onSuccess: (data) => {
      console.log('비밀번호 재설정 성공:', data);
    },
    onError: (error) => {
      console.error('비밀번호 재설정 실패:', error);
    },
  });
};
