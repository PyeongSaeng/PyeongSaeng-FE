import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 시 accessToken 자동 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 저장 및 만료 처리 (28-42번째 줄 수정)
axiosInstance.interceptors.response.use(
  (response) => {
    // 로그인 성공 시 accessToken과 role 저장
    if (response.config.url?.includes('/auth/login')) {
      
      // result 안에 accessToken이 있는지 확인
      const accessToken = response.data.result?.accessToken || response.data.accessToken;
      const role = response.data.result?.role; 

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        console.error('accessToken을 찾을 수 없음:', response.data);
      }

      // role 저장 
      if (role) {
        localStorage.setItem('userRole', role);
      }
    }

    // OAuth 토큰 교환 시에도 동일하게 처리
    if (response.config.url?.includes('/token/exchange')) {
      const accessToken = response.data.result?.accessToken || response.data.accessToken;
      const role = response.data.result?.role; // 카카오 로그인도 role 저장
      
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (role) {
        localStorage.setItem('userRole', role);
      }
    }

    // 카카오 회원가입 성공 시에도 토큰 저장
    if (response.config.url?.includes('/auth/signup/kakao')) {
      const accessToken = response.data.result?.accessToken || response.data.accessToken;
      const role = response.data.result?.role; 
      
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        console.log('카카오 회원가입 Token 저장됨');
      }
      if (role) {
        localStorage.setItem('userRole', role);
        console.log('카카오 회원가입 Role 저장됨:', role);
      }
    }

    return response;
  },
  
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    console.error('[axiosInstance] 응답 에러:', error.response?.data);

    // accessToken 만료 에러 처리
    if (
      error.response?.status === 401 && 
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log('[axiosInstance] 토큰 재발급 시도...');
        
        // 토큰 갱신
        const response = await axiosInstance.post('/api/token/refresh', {});

        // 새 accessToken 저장
        const newAccessToken = response.data?.accessToken;
        
        if (!newAccessToken) {
          throw new Error('새 액세스 토큰을 받지 못했습니다.');
        }

        localStorage.setItem('accessToken', newAccessToken);
        console.log('[axiosInstance] 토큰 재발급 성공');

        // 원래 요청에 새 토큰 적용
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // 원래 요청 재시도
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error('[axiosInstance] 토큰 재발급 실패:', refreshError);

        // 모든 사용자 정보 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');

        // 로그인 페이지로 리다이렉트
        if (!window.location.pathname.includes('/login')) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.href = '/personal/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
