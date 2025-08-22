import { useQuery } from '@tanstack/react-query';
import { getResult } from '../apis/jobapi';
import { FormFieldListResponse } from '../types/jobs';

export function useFormFields(jobPostId: number, seniorId?: number) {
  const userRole = localStorage.getItem('userRole');

  const endpoint =
    userRole === 'PROTECTOR' && seniorId
      ? `/api/job/${jobPostId}/questions/delegate/${seniorId}`
      : `/api/job/${jobPostId}/questions/direct`;

  // 쿼리 키를 더 구체적으로 만들어서 캐시 충돌 방지
  const queryKey =
    userRole === 'PROTECTOR'
      ? ['formFields', 'delegate', jobPostId, seniorId, userRole]
      : ['formFields', 'direct', jobPostId, userRole];

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await getResult<FormFieldListResponse>(endpoint);
        return result;
      } catch (error) {
        console.error('formFields API 에러:', error);
        throw error;
      }
    },
    enabled:
      !!jobPostId &&
      (userRole === 'SENIOR' || (userRole === 'PROTECTOR' && !!seniorId)),
    staleTime: 1000 * 60,
    retry: false,
  });
}
