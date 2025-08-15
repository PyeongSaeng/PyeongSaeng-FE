import { useQuery } from '@tanstack/react-query';
import { ProtectorApplicationItem } from '../types/jobs';
import { apiGetProtectorApplications } from '../apis/jobapi';

export const useProtectorApplications = () => {
  return useQuery<ProtectorApplicationItem[]>({
    queryKey: ['applications', 'protector'],
    queryFn: apiGetProtectorApplications,
  });
};
