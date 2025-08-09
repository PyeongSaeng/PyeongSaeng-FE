import { useEffect, useState } from "react";
import { useJobGet } from "../../shared/hooks/job/useJobGet";
import Topbar from "../../shared/components/topbar/Topbar"
import CompanyCreateJobPage from "./CompanyCreateJobPage";
import CompanyCreateFormPage from "./CompanyCreateFormPage";
import { useJobDelete } from "../../shared/hooks/job/useJobDelete";

const CompanyJobListPage = () => {

    const [step, setStep] = useState(0);
    const token = localStorage.getItem("accessToken") ?? "";
    const { jobs, loading, error, fetchJobs } = useJobGet(token);
    const { mutate: deleteJob, isPending } = useJobDelete(token);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm("이 공고를 삭제할까요?")) return;
        setDeletingId(id);

        deleteJob(id, {
            // 실패하면 버튼 상태 복구
            onError: () => setDeletingId(null),
            // 성공/실패 관계없이 목록 재동기화
            onSettled: () => {
                setDeletingId(null);
                fetchJobs(); // 목록 새로고침 (useJobGet이 쿼리 무효화/갱신을 내부에서 안하면 이걸로 보완)
            },
        });
    };


    useEffect(() => {
        if (step === 0) fetchJobs();
    }, [step, fetchJobs]);

    return (
        <div>
            <Topbar>
                <div className="w-full h-full">
                    {/* title부분 */}
                    <div className="mt-[17px] flex flex-col items-center">
                        <p className="text-[20px] font-semibold text-[#747474]">
                            신청서 입력
                        </p>
                        <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[12px]" />
                    </div>
                    {/* 신청서 입력 버튼 */}
                    <div>
                        {step === 0 && (
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-[11px] text-[20px] mt-[11px] text-[#747474] font-semibold"
                                >
                                    <img
                                        src="/icons/plus_icon.svg"
                                        alt="추가"
                                        className="w-[24px] h-[24px] cursor-pointer"
                                    />
                                    새 신청서 추가
                                </button>
                                <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[10px]" />
                                <div className="overflow-y-auto max-h-[500px] mb-[36px] w-full flex flex-col items-center scrollbar-hide">
                                    {loading && <div>로딩중...</div>}
                                    {!loading && jobs.length === 0 && (
                                        <div className="text-center text-[16px] text-[#A0A0A0] font-semibold py-10">
                                            채용중인 공고가 없습니다!
                                        </div>
                                    )}
                                    {/* 에러 처리 보류
                                    {error && ()}
                                     */}
                                    {/* 스트롤 영역 */}
                                    {jobs.map((job, index) => (
                                        <div
                                            key={job.id}
                                            className="mt-[31px] flex flex-col items-center"
                                        >
                                            {/* 제목 */}
                                            <div className="font-400 text-[16px] text-[#000000]">
                                                {job.title}
                                            </div>
                                            {/* 이미지 */}
                                            {job.images && job.images.length > 0 ? (
                                                <img
                                                    src={job.images[0].imageUrl}
                                                    alt={job.images[0].originalFileName}
                                                    className="w-[292px] h-[168px] object-cover rounded-[10px] border-[1.3px] border-[#A0A0A0]"
                                                />
                                            ) : (
                                                <div className="w-[292px] h-[168px] text-[13px] bg-gray-100 rounded-[10px] border-[#A0A0A0] flex items-center justify-center text-gray-400">
                                                    이미지 없음
                                                </div>
                                            )}
                                            <div className="w-full flex gap-[13px] mt-[16px] items-center justify-center">
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    disabled={isPending && deletingId === job.id}
                                                    className={`w-[144px] h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
                                                    ${isPending && deletingId === job.id
                                                            ? "border-[#cccccc] bg-[#f5f5f5] text-[#9e9e9e] cursor-not-allowed"
                                                            : "border-[#0D29B7] bg-white text-black hover:bg-[#DBDFF4]"}`}
                                                >
                                                    {isPending && deletingId === job.id ? "삭제 중…" : "삭제"}
                                                </button>
                                                <button
                                                    className="w-[144px] h-[45px] border-[1.3px] border-[#0D29B7] rounded-[8px] bg-[#0D29B7] text-[16px] font-medium text-white">
                                                    수정
                                                </button>
                                            </div>
                                            {index !== jobs.length - 1 && (
                                                <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[37px]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* step === 1 : 기본 정보 입력 */}
                        {step === 1 && <CompanyCreateJobPage onNext={() => setStep(2)} />}

                        {/* step === 2 : 추가 문항 입력 */}
                        {step === 2 && <CompanyCreateFormPage onBack={() => setStep(0)} />}
                    </div>
                </div>
            </Topbar>
        </div>
    )
}

export default CompanyJobListPage
