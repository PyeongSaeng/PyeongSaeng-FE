import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { qk } from '../../../shared/apis/querykeys';

type CompanyJob = { id: number; title: string };
const baseURL = import.meta.env.VITE_API_BASE_URL;

export function useJobDelete(token: string) {
  const qc = useQueryClient();

  // 훅 내부에서 API 호출 함수 정의
  const deleteJobPost = async (jobPostId: number) => {
    const { data } = await axios.delete(
      `${baseURL}/api/job/posts/${jobPostId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  };

  return useMutation({
    mutationFn: deleteJobPost,

    onMutate: async (jobPostId) => {
      await qc.cancelQueries({ queryKey: qk.companyJobPosts });
      const previous = qc.getQueryData<CompanyJob[]>(qk.companyJobPosts);

      qc.setQueryData<CompanyJob[]>(qk.companyJobPosts, (old) =>
        (old ?? []).filter((j) => j.id !== jobPostId)
      );

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(qk.companyJobPosts, ctx.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.companyJobPosts });
    },
  });
}
