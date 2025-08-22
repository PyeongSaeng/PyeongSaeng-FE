import { useQuery } from '@tanstack/react-query';
import { getResult } from '../apis/jobapi';
import { FormFieldListResponse } from '../types/jobs';

export function useFormFields(jobPostId: number) {
  return useQuery({
    queryKey: ['formFields', jobPostId],
    queryFn: () =>
      getResult<FormFieldListResponse>(
        `/api/job/${jobPostId}/questions/direct`
      ),
    enabled: !!jobPostId,
    staleTime: 1000 * 60,
  });
}
