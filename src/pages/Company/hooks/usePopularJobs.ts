import { useState, useCallback } from 'react';
import axios from 'axios';
import type { JobListDTO } from '../types/job';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function usePopularJobs(token?: string) {
  const [jobs, setJobs] = useState<JobListDTO['result']['jobPostList']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  type Meta = Pick<
    JobListDTO['result'],
    'listSize' | 'totalPage' | 'totalElements' | 'isFirst' | 'isLast'
  >;
  const [meta, setMeta] = useState<Meta>({
    listSize: 0,
    totalPage: 0,
    totalElements: 0,
    isFirst: true,
    isLast: true,
  });

  const fetchPopular = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<JobListDTO>(
          `${baseURL}/api/job/companies/me/posts/popularity`,
          {
            params: { page },
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const r = res.data.result;
        setJobs(r.jobPostList ?? []);
        setMeta({
          listSize: r.listSize,
          totalPage: r.totalPage,
          totalElements: r.totalElements,
          isFirst: r.isFirst,
          isLast: r.isLast,
        });
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { jobs, meta, fetchPopular, loading, error };
}
