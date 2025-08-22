import { useQuery } from '@tanstack/react-query';
import { JobTrendResponse } from '../types/jobs';
import { apiGetJobTrends } from '../apis/jobapi';

export const trendJobsKey = (page = 1, token?: string) =>
  ['jobs', 'trend', page, token] as const;

export function useTrendJobs(page = 1) {
  return useQuery<JobTrendResponse>({
    queryKey: trendJobsKey(page),
    queryFn: () => apiGetJobTrends(page),
    staleTime: 60 * 1000,
  });
}
