import { useQuery } from "@tanstack/react-query";
import { apiGetRecommendations } from "../apis/jobapi";
import { JobRecommendation } from "../types/jobs";

// 1. 사용자 ID
function getUserIdFromStorage(): number | undefined {
  const raw = localStorage.getItem("user");
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    const id = Number(parsed?.id);
    return Number.isNaN(id) ? undefined : id;
  } catch {
    return undefined;
  }
}

// 2. accessToken
function getTokenFromStorage(): string | null {
  return localStorage.getItem("accessToken");
}

// 3. 캐시 키
export const recommendedJobsKey = (userId?: number) =>
  ["job", "recommendations", userId] as const;

// 4. 훅
export function useRecommendedJobs() {
  const userId = getUserIdFromStorage();
  const token = getTokenFromStorage();

  const query = useQuery<JobRecommendation[]>({
    queryKey: recommendedJobsKey(userId),
    queryFn: () => apiGetRecommendations(userId!), // userId는 존재가 보장된 상태
    enabled: Boolean(userId && token),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    select: (list) => [...list].sort((a, b) => a.distanceKm - b.distanceKm),
  });

  return {
    jobs: query.data ?? [],     // UI에서 사용하기 쉽게 이름 붙임
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
