import { useQuery } from "@tanstack/react-query";
import { apiGetRecommendations } from "../apis/jobapi";
import { JobRecommendation } from "../types/jobs";

// 1. 사용자 ID (string UUID 그대로 반환)
function getUserIdFromStorage(): number | undefined {
    const raw = localStorage.getItem("userId");
    if (!raw) return undefined;

    const id = Number(raw);
    return Number.isNaN(id) ? undefined : id;
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
        queryFn: () => apiGetRecommendations(userId!),
        enabled: Boolean(userId && token),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        select: (list) => [...list].sort((a, b) => a.distanceKm - b.distanceKm),
    });

    return {
        jobs: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}
