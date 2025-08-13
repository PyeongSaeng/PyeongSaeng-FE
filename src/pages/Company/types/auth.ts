// 로그인
export interface CompanyLoginRequest {
  username: string;
  password: string;
}

// 회원가입
export interface CompanySigninRequest {
  businessNo: string;      // 사업자 등록 번호
  username: string;       
  password: string;        
  companyName: string;     // 기업명
  ownerName: string;       // 사업자명
  phone: string;          
  verificationCode: string; 
}

export interface CompanySigninState extends CompanySigninRequest {
  passwordConfirm: string; // 비밀번호 확인 
  isIdAvailable: boolean;  // 아이디 중복 확인 결과
}