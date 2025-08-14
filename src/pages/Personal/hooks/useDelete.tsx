import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteBookmark } from "../apis/jobapi";
import { savedJobsKey } from "./useShow";
import { BookmarkSummary } from "../types/jobs";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobPostId: number) => apiDeleteBookmark(jobPostId),

    onMutate: async (jobPostId) => {
      await queryClient.cancelQueries({ queryKey: savedJobsKey });

      const previous = queryClient.getQueryData<BookmarkSummary[]>(savedJobsKey);

      queryClient.setQueryData<BookmarkSummary[]>(savedJobsKey, (old) =>
        old?.filter((job) => job.jobPostDetailDTO.images[0].jobPostId !== jobPostId) ?? []
      );

      return { previous };
    },

    onError: (_err, _jobPostId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(savedJobsKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedJobsKey });
    },
  });
}
