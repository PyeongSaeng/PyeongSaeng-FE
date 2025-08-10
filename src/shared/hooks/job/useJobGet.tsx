import { useState, useCallback } from "react";
import axios from "axios";
import { JobListDTO } from "../../../pages/Company/types/job";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function useJobGet(token: string) {
  const [jobs, setJobs] = useState<JobListDTO["result"]["jobPostList"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // page, state 기본값(1, RECRUITING)으로 GET
  const fetchJobs = useCallback(
    async (page: number = 1, state: string = "RECRUITING") => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<JobListDTO>(
          `${baseURL}/api/job/companies/me/posts?page=${page}&state=${state}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(response.data.result.jobPostList ?? []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { jobs, fetchJobs, loading, error };
}
