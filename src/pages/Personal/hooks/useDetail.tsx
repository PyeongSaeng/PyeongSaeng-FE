import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiGetJobDetail } from "../apis/jobapi";
import { JobDetail } from "../types/jobs";

export const jobDetailKey = (jobPostId: number) => ["job", "detail", jobPostId] as const;

export function useJobDetail(jobPostId: number) {
  const isValid = Number.isFinite(jobPostId) && jobPostId > 0;

  return useQuery<JobDetail>({
    queryKey: jobDetailKey(jobPostId),
    queryFn: () => apiGetJobDetail(jobPostId),
    enabled: isValid, 
    staleTime: 60_000,
    retry: (count, err) => {
      if (axios.isAxiosError(err)) {
        const s = err.response?.status;
        if (s && [400, 401, 403, 404, 405].includes(s)) return false;
      }
      return count < 1;
    },
  });
}
