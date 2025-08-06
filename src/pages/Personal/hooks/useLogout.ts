import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../apis/auth';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. 로컬스토리지에서 토큰 제거
      localStorage.removeItem('accessToken');
      
      // 2. 세션스토리지 정리
      sessionStorage.clear();
      
      // 3. 홈 페이지로 리다이렉트
      navigate('/', { replace: true });
      
      // 4. 성공 메시지
      alert('로그아웃되었습니다.');
    },
    onError: (error) => {
      console.error(' 로그아웃 실패:', error);
      
      // 에러가 발생해도 로컬 정리는 진행
      localStorage.removeItem('accessToken');
      sessionStorage.clear();
      navigate('/personal/login', { replace: true });
      
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    },
  });
};
