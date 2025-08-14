import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDeleteApplication, apiEnsureApplication, apiGetMyApplications, ApplicationItem } from "../apis/jobapi";

// 일자리 신청 버튼 post
const useEnsureApplication = () => {
  return useMutation({
    mutationFn: apiEnsureApplication,
  });
};

// 일자리 작성 여부 조회
const useGetMyApplications = () => {
  return useQuery({
    queryKey: ["applications", "mine"],
    queryFn: apiGetMyApplications,
  });
};
// 일자리 삭제 낙관적 업데이트
const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteApplication,
    onMutate: async (applicationId: number) => {
      await queryClient.cancelQueries({ queryKey: ["applications", "mine"] });

      const previous = queryClient.getQueryData<ApplicationItem[]>(["applications", "mine"]);

      queryClient.setQueryData<ApplicationItem[]>(["applications", "mine"], (old = []) =>
        old.filter((app) => app.applicationId !== applicationId)
      );

      return { previous };
    },
    onError: (_err, _applicationId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["applications", "mine"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications", "mine"] });
    },
  });
};


// 최종 export 부분
export const useApplication = () => {
  return {
    useEnsureApplication,
    useGetMyApplications,
    useDeleteApplication,
  };
};
