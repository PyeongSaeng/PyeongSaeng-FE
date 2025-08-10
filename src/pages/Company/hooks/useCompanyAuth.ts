import { useMutation } from '@tanstack/react-query';
import { 
  signupCompany, 
  checkCompanyUsername, 
  sendCompanyVerificationCode
} from '../apis/companyAuth';
import { CompanySigninRequest } from '../types/auth';

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

// SMS 인증번호 발송 hook
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
