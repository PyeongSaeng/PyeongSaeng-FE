import { useQuery } from '@tanstack/react-query';
import { apiGetJobDetail, apiGetProtectorJobDetail } from '../apis/jobapi';

export const jobDetailKey = (jobPostId: number) =>
  ['job', 'detail', jobPostId] as const;

// useDetail 훅에서 사용자 역할에 따라 다른 API 사용
export function useJobDetail(jobPostId: number, seniorId?: number) {
  const userRole = localStorage.getItem('userRole');

  return useQuery({
    queryKey: ['jobDetail', jobPostId, seniorId, userRole],
    queryFn: async () => {
      if (userRole === 'PROTECTOR' && seniorId) {
        // 보호자인 경우 보호자용 API 사용
        return apiGetProtectorJobDetail(seniorId, jobPostId);
      } else if (userRole === 'SENIOR') {
        // 시니어인 경우 기존 API 사용
        return apiGetJobDetail(jobPostId);
      } else {
        throw new Error('권한이 없습니다');
      }
    },
    enabled:
      !!jobPostId &&
      (userRole === 'SENIOR' || (userRole === 'PROTECTOR' && !!seniorId)),
  });
}
