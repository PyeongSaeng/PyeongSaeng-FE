import { useState } from "react";
import axios from "axios";
import { CreateJobDTO } from "../../../pages/Company/types/job";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useJobPost = (token: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postJob = async (jobData: CreateJobDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${baseURL}/api/job/posts`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "오류");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postJob, loading, error };
};
