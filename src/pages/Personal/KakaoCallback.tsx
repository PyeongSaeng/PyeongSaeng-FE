import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../shared/apis/axiosInstance';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      // URL 파라미터 추출
      const code = searchParams.get('code');
      const isFirstLogin = searchParams.get('isFirstLogin');
      const kakaoId = searchParams.get('kakaoId');
      const nickname = searchParams.get('nickname');

      // 두 가지 케이스로 구분 처리
      if (code) {
        // 기존 회원 로그인: isFirstLogin=false
        console.log('기존 회원 로그인 처리');
        await handleExistingUserLogin(code, isFirstLogin);
      } else if (kakaoId) {
        // 신규 회원 가입
        console.log('신규 회원 가입 처리');
        await handleNewUserSignup(kakaoId, nickname);
      } else {
        console.error('유효한 파라미터가 없습니다.');
        alert('카카오 로그인 중 문제가 발생했습니다.');
        navigate('/personal/login', { replace: true });
      }
    };

    // 기존 회원 로그인 처리 (토큰 교환)
    const handleExistingUserLogin = async (
      code: string,
      isFirstLogin: string | null
    ) => {
      console.log('카카오 인증 코드:', code);
      console.log('최초 로그인 여부:', isFirstLogin);

      try {
        await axiosInstance.post('/api/token/exchange', { code });

        // localStorage에 토큰과 role이 저장되었는지 확인
        const savedToken = localStorage.getItem('accessToken');
        const savedRole = localStorage.getItem('userRole');
        console.log('저장된 토큰:', savedToken ? '존재' : '없음');
        console.log('저장된 역할:', savedRole || '없음');

        alert('카카오 로그인 성공! 메인 페이지로 이동합니다.');
        navigate('/', { replace: true });
      } catch (error: any) {
        console.error('카카오 로그인 실패:', error);
        console.error('에러 응답 내용:', error.response?.data);
        alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/personal/login', { replace: true });
      }
    };

    // 신규 회원 가입 처리 (회원가입 페이지로 이동)
    const handleNewUserSignup = async (
      kakaoId: string,
      nickname: string | null
    ) => {
      console.log('카카오 신규 가입 정보:', { kakaoId, nickname });

      // 가입 유형 선택 페이지로 이동
      navigate('/personal/join', {
        state: {
          fromKakao: true,
          kakaoId: kakaoId,
          nickname: nickname || '',
          providerType: 'KAKAO',
        },
        replace: true,
      });
    };

    handleKakaoCallback();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">카카오 로그인 처리 중...</p>
        <p className="text-sm text-gray-400 mt-2">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
};

export default KakaoCallback;
