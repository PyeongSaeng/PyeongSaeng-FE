import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiSaveBookmark } from "../apis/jobapi"; 
import { JobBookmarkResult } from "../types/jobs"; 

export function useSaveToggle(jobPostId: number) {
  const queryClient = useQueryClient();

  return useMutation<JobBookmarkResult, Error>({
    mutationFn: () => apiSaveBookmark(jobPostId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs", "saved"],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["job", "detail", jobPostId],
      });
    },

    onError: (error) => {
      console.error("저장 실패:", error.message);
    },
  });
}
