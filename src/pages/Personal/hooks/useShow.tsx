import { useQuery } from '@tanstack/react-query';
import { apiGetSavedJobs } from '../apis/jobapi';
import { BookmarkSummary } from '../types/jobs';

export const savedJobsKey = ['jobs', 'saved'] as const;

export function useShow() {
  return useQuery<BookmarkSummary[]>({
    queryKey: savedJobsKey,
    queryFn: apiGetSavedJobs,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
