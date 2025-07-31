import axios from "axios";
import { CreateJobDTO } from "../../types/job";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useJobPost = () => {
  const postJob = async (jobData: CreateJobDTO) => {
    const response = await axios.post(`${baseURL}/api/job/posts`, jobData);
    return response.data;
  };

  return { postJob };
};
