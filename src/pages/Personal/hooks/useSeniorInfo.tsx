import { useState, useEffect } from 'react';
import { getSeniorData } from '../apis/my/seniorMy';
import { Info, Question } from '../types/userInfo';

/**
 * 시니어 기본 정보와 추가 질문들을 조회하는 공통 훅
 * BasicInfo.tsx, ExtraInfo.tsx, JobApplyExtendedForm.tsx에서 사용하던 중복 로직을 통합
 */
export const useSeniorInfo = () => {
  const [seniorInfo, setSeniorInfo] = useState<Info | null>(null);
  const [seniorQuestions, setSeniorQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSeniorData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 보호자인 경우 API 호출하지 않음
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'PROTECTOR') {
          setIsLoading(false);
          return;
        }

        // 1. 시니어 기본 정보 조회
        const basicInfoResponse = await getSeniorData('/api/user/senior/me');

        if (!isMounted) return;

        setSeniorInfo(basicInfoResponse.result);

        // 2. 추가 질문들 조회
        if (basicInfoResponse.result?.id) {
          const questionsResponse = await getSeniorData(
            `/api/seniors/${basicInfoResponse.result.id}/questions`
          );

          if (!isMounted) return;

          setSeniorQuestions(questionsResponse.result || []);
        }
      } catch (err) {
        if (!isMounted) return;

        console.error('시니어 정보 조회 에러:', err);
        setError(
          err instanceof Error
            ? err.message
            : '시니어 정보 조회에 실패했습니다.'
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSeniorData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    seniorInfo,
    seniorQuestions,
    isLoading,
    error,

    refetch: () => {
      setIsLoading(true);
      setError(null);
      setSeniorInfo(null);
      setSeniorQuestions([]);
    },
  };
};
