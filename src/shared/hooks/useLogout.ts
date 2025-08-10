import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout as personalLogout } from '../../pages/Personal/apis/auth';
import { logoutCompany } from '../../pages/Company/apis/companyAuth';

export const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 현재 경로가 company로 시작하는지 확인
  const isCompanyRoute = location.pathname.startsWith('/company');

  return useMutation({
    mutationFn: async () => {
      if (isCompanyRoute) {
        // 기업 로그아웃 API 호출
        return await logoutCompany();
      } else {
        // 개인 로그아웃 API 호출
        return await personalLogout();
      }
    },
    onSuccess: () => {
      // 로컬스토리지 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      
      alert(`${isCompanyRoute ? '기업' : '개인'} 회원 로그아웃 성공`);
      
      // 각 로그인 페이지로 이동
      if (isCompanyRoute) {
        navigate('/company/login');
      } else {
        navigate('/personal/login');
      }
    },
    onError: (error: any) => {
      console.error(`${isCompanyRoute ? '기업' : '개인'} 회원 로그아웃 실패:`, error);
      
      // 에러가 발생해도 로컬스토리지는 정리하고 로그인 페이지로 이동
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      
      if (isCompanyRoute) {
        navigate('/company/login');
      } else {
        navigate('/personal/login');
      }
    },
  });
}; 