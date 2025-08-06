import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../shared/apis/axiosInstance';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      console.log('=== 카카오 콜백 처리 시작 ===');
      console.log('🔍 현재 전체 URL:', window.location.href);
      console.log('🔍 모든 URL 파라미터:', Object.fromEntries(searchParams));

      // URL 파라미터 추출
      const code = searchParams.get('code');
      const isFirstLogin = searchParams.get('isFirstLogin');
      const kakaoId = searchParams.get('kakaoId');
      const nickname = searchParams.get('nickname');

      // 두 가지 카카오 콜백 상황 처리
      if (code) {
        // 기존 방식: code를 이용한 토큰 교환
        await handleCodeExchange(code, isFirstLogin);
      } else if (kakaoId) {
        // 새로운 방식: kakaoId와 nickname을 이용한 회원가입
        await handleKakaoSignup(kakaoId, nickname);
      } else {
        console.error('유효한 파라미터가 없습니다.');
        alert('카카오 로그인 중 문제가 발생했습니다. (파라미터 없음)');
        navigate('/personal/login', { replace: true });
      }
    };

    // 기존 code 방식 처리
    const handleCodeExchange = async (
      code: string,
      isFirstLogin: string | null
    ) => {
      console.log('📝 카카오 인증 코드:', code);
      console.log('🆕 최초 로그인 여부:', isFirstLogin);

      try {
        console.log('🚀 토큰 교환 API 호출 시작...');
        console.log('📤 요청 데이터:', { code });

        // axiosInstance가 자동으로 토큰 저장 처리
        const response = await axiosInstance.post('/api/token/exchange', {
          code: code,
        });

        console.log('🎉 카카오 토큰 교환 성공!');
        console.log('📦 응답 데이터:', response.data);

        // localStorage에 토큰이 저장되었는지 확인
        const savedToken = localStorage.getItem('accessToken');
        console.log('💾 저장된 토큰:', savedToken ? '✅ 존재' : '❌ 없음');

        if (isFirstLogin === 'true') {
          alert('카카오 회원가입이 완료되었습니다! 🎉');
        } else {
          alert('카카오 로그인 성공! 👋');
        }

        console.log('🏠 메인 페이지로 이동...');
        navigate('/', { replace: true });
      } catch (error: any) {
        console.error('카카오 로그인 실패', error);
        alert('카카오 로그인 실패');
        navigate('/personal/login', { replace: true });
      }
    };

    // KakaoId 직접 방식 (현재 실제 동작)
    const handleKakaoSignup = async (
      kakaoId: string,
      nickname: string | null
    ) => {
      console.log(
        '👤 카카오 정보 받음 - kakaoId:',
        kakaoId,
        'nickname:',
        nickname
      );

      // API 호출 대신 회원가입 페이지로 이동하면서 카카오 정보 전달
      navigate('/personal/join/senior', {
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
      </div>
    </div>
  );
};

export default KakaoCallback;
