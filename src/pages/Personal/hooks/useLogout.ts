import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../apis/auth';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log('로그아웃 성공:', data);
      
      // 모든 사용자 정보 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      sessionStorage.clear();
      
      navigate('/personal/login', { replace: true });
      alert('로그아웃되었습니다.');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      
      // 에러가 발생해도 로컬 정보는 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      sessionStorage.clear();
      
      navigate('/', { replace: true });
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    },
  });
};
