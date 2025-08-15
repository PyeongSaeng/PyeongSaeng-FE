//신청 여부에 따른 공고 정보 렌더링
import { useQueries } from '@tanstack/react-query';
import { apiGetJobDetail } from '../apis/jobapi';

export const useApplicationJobs = (jobPostIds: number[]) => {
  return useQueries({
    queries: jobPostIds.map((id) => ({
      queryKey: ['job', 'detail', id],
      queryFn: () => apiGetJobDetail(id),
      enabled: !!id,
      staleTime: 1000 * 60,
    })),
  });
};
