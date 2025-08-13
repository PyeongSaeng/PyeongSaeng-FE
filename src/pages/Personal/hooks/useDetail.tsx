import { useQuery } from "@tanstack/react-query";
import { apiGetJobDetail } from "../apis/jobapi";
import { JobDetail } from "../types/jobs";

export const jobDetailKey = (jobPostId: number) => ["job", "detail", jobPostId] as const;

export function useJobDetail(jobPostId: number) {
  return useQuery<JobDetail>({
    queryKey: jobDetailKey(jobPostId),
    queryFn: () => apiGetJobDetail(jobPostId),
    enabled: !!jobPostId,
    staleTime: 60 * 1000,
  });
}
