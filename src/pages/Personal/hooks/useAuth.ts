import { useMutation } from '@tanstack/react-query';
import {
  signupSenior,
  sendVerificationCode,
  verifyCode,
  checkUsernameAvailability,
  login,
  signupProtector,
} from '../apis/auth';
import {
  SeniorSignupRequest,
  SendVerificationRequest,
  VerifyCodeRequest,
  LoginRequest,
  ProtectorSignupRequest,
} from '../types/auth';

// 시니어 회원가입 훅
export const useSeniorSignup = () => {
  return useMutation({
    mutationFn: (data: SeniorSignupRequest) => signupSenior(data),
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

// 보호자 회원가입 훅
export const useProtectorSignup = () => {
  return useMutation({
    mutationFn: (data: ProtectorSignupRequest) => signupProtector(data),
    onSuccess: (data) => {
      console.log('보호자 회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('보호자 회원가입 실패:', error);
    },
  });
};

// 인증번호 발송 훅
export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: (data: SendVerificationRequest) => sendVerificationCode(data),
    onSuccess: (data) => {
      console.log('인증번호 발송 성공:', data);
    },
    onError: (error) => {
      console.error('인증번호 발송 실패:', error);
    },
  });
};

// 인증번호 확인 훅
export const useVerifyCode = () => {
  return useMutation({
    mutationFn: (data: VerifyCodeRequest) => verifyCode(data),
    onSuccess: (data) => {
      console.log('인증번호 확인 성공:', data);
    },
    onError: (error) => {
      console.error('인증번호 확인 실패:', error);
    },
  });
};

// 아이디 중복 확인 훅
export const useCheckUsername = () => {
  return useMutation({
    mutationFn: (username: string) => checkUsernameAvailability(username),
    onSuccess: (data) => {
      console.log('아이디 확인 결과:', data);
    },
    onError: (error) => {
      console.error('아이디 확인 실패:', error);
    },
  });
}; 

// 일반 로그인 훅
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data)
  })
};

