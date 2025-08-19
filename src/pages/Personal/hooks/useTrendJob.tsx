import { useQuery } from '@tanstack/react-query';
import { JobTrendResponse } from '../types/jobs';
import { apiGetJobTrends } from '../apis/jobapi';

export const trendJobsKey = (page = 1, token?: string) =>
  ['jobs', 'trend', page, token] as const;

export function useTrendJobs(page = 1, token?: string) {
  return useQuery<JobTrendResponse>({
    queryKey: trendJobsKey(page, token),
    queryFn: () => apiGetJobTrends(page, token),
    staleTime: 60 * 1000,
  });
}
