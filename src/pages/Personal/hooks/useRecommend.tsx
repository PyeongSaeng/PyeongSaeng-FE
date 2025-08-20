import { useQuery } from '@tanstack/react-query';
import { apiGetRecommendedJobs } from '../apis/jobapi';
import { JobRecommendation } from '../types/jobs';

export const useRecommendedJobs = (userId: number, enabled: boolean = true) => {
  return useQuery<JobRecommendation[]>({
    queryKey: ['jobs', 'recommended', userId],
    queryFn: () => apiGetRecommendedJobs(userId).then(res => res.data.result),
    enabled: enabled && !!userId, 
    staleTime: 60 * 1000, 
  });
};
