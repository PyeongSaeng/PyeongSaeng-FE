import { useMutation } from '@tanstack/react-query';
import { PostApplicationDirectRequest } from '../types/jobapplication';
import { apiPostApplicationDirect } from '../apis/jobapplicationapi';

export function useSubmitApplication() {
  return useMutation({
    mutationFn: (body: PostApplicationDirectRequest) =>
      apiPostApplicationDirect(body),
  });
}
