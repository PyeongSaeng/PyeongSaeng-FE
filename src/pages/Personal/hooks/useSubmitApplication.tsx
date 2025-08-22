import { useMutation } from '@tanstack/react-query';
import { postApplicationDirect } from '../apis/applications';

export function useSubmitApplication() {
  return useMutation({
    mutationFn: (body: any) => postApplicationDirect(body),
  });
}
