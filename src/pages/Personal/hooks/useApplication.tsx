import { useMutation, useQuery } from "@tanstack/react-query";
import { apiEnsureApplication, apiGetMyApplications } from "../apis/jobapi";

// useEnsureApplication: 신청 생성 (작성 전 상태)
const useEnsureApplication = () => {
  return useMutation({
    mutationFn: apiEnsureApplication,
  });
};

// useGetMyApplications: 본인 신청 내역 조회
const useGetMyApplications = () => {
  return useQuery({
    queryKey: ["applications", "mine"],
    queryFn: apiGetMyApplications,
  });
};

// 이 파일에서 필요한 훅들을 모두 묶어 export
export const useApplication = () => {
  return {
    useEnsureApplication,
    useGetMyApplications,
  };
};
