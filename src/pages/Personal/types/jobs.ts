export type ApiEnvelope<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type JobRecommendation = {
  jobPostId: number;
  workplaceName: string;
  description: string;
  imageUrl: string;
  distanceKm: number;
};
