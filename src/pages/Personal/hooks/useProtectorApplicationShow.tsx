import { useQueries } from '@tanstack/react-query';
import { apiGetProtectorJobDetail } from '../apis/jobapi';

export function useProtectorApplicationJobs(
  apps: { seniorId: number; jobPostId: number }[]
) {
  return useQueries({
    queries: apps.map(({ seniorId, jobPostId }) => ({
      queryKey: ['protector', 'jobDetail', seniorId, jobPostId],
      queryFn: () => apiGetProtectorJobDetail(seniorId, jobPostId),
      enabled: !!seniorId && !!jobPostId,
      staleTime: 60 * 1000,
    })),
  });
}
