import { useState, useCallback } from "react";
import axios from "axios";
import { JobPost, JobListResponse } from "../../../pages/Company/types/job";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function useJobGet() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<JobListResponse>(`${baseURL}/api/job/posts`);
      setJobs(response.data.result.jobPostList);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, fetchJobs, loading, error };
}
