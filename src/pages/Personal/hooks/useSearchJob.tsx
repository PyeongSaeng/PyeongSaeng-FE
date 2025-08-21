import { useQuery } from '@tanstack/react-query';
import { apiSearchJobs } from '../apis/jobapi';
import { SearchJobResponse } from '../types/jobs';

export const useSearchJobs = (keyword: string, enabled: boolean = false) => {
  return useQuery<SearchJobResponse>({
    queryKey: ['jobs', 'search', keyword],
    queryFn: () =>
      apiSearchJobs({
        keyword,
        sort: 'DISTANCE_ASC',
        searchAfter: null,
        size: 10,
      }).then((res) => res.data.result),
    enabled,
    staleTime: 60 * 1000,
  });
};
