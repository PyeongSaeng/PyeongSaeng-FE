import { useQuery } from "@tanstack/react-query";
import { apiGetProtectorApplications } from "../apis/jobapi";

export const protectorApplicationsKey = ["applications", "protector"];

export function useProtectorApplications() {
  return useQuery({
    queryKey: protectorApplicationsKey,
    queryFn: apiGetProtectorApplications,
    staleTime: 60 * 1000,
  });
}
