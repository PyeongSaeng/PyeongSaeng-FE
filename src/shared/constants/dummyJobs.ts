export interface JobType {
    jobId: number;
    name: string;
    image: string;
    details: string;
}
export const dummyJobs: JobType[] = [
    {
        jobId: 1,
        name: "죽전1동 행정복지센터 미화원",
        image: "/icons/popular-dummy1.png",
        details: "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
    },
    {
        jobId: 2,
        name: "죽전2동 행정복지센터 미화원",
        image: "/icons/popular-dummy1.png",
        details: "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
    },
    {
        jobId: 3,
        name: "죽전3동 행정복지센터 미화원",
        image: "/icons/popular-dummy1.png",
        details:
            "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
    },
    {
        jobId: 4,
        name: "죽전4동 행정복지센터 미화원",
        image: "/icons/popular-dummy1.png",
        details:
            "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
    },
];