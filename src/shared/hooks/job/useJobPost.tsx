import axios from "axios";
import { CreateJobDTO } from "../../types/job";

export const useJobPost = () => {
  const postJob = async (jobData: CreateJobDTO) => {
    const response = await axios.post("/api/job/posts", jobData);
    return response.data;
  };

  return { postJob };
};
