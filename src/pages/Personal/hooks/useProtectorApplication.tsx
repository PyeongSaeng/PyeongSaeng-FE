import { apiGetProtectorApplications } from '../apis/jobapi';
import { ProtectorApplicationItem } from '../types/jobs';

export function useProtectorApplications() {
  return useQuery<ProtectorApplicationItem[]>({
    queryKey: ['applications', 'protector'],
    queryFn: apiGetProtectorApplications,
    staleTime: 60 * 1000,
  });
}
