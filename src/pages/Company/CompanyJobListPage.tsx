import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import CompanyCreateJobPage from './CompanyCreateJobPage';
import CompanyCreateFormPage from './CompanyCreateFormPage';
import {
  EMPTY_JOB_DRAFT,
  BASE_FORM_FIELDS,
  JobDraft,
  CreateJobDTO,
  JobPostFormField,
} from './types/job';
import { useJobGet } from './hooks/useJobGet';
import { useJobDelete } from './hooks/useJobDelete';
import { useJobPost } from './hooks/useJobPost';

type Step = 0 | 1 | 2; // 0=리스트, 1=기본정보, 2=폼 필드

export default function CompanyJobListPage() {
  const token = localStorage.getItem('accessToken') ?? '';
  const navigate = useNavigate();
  const location = useLocation();

  // --- 목록 API (조회/삭제) ---
  const { jobs, loading, fetchJobs } = useJobGet(token);
  const { mutate: deleteJob, isPending: deleting } = useJobDelete(token);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // --- 생성 API (제출) ---
  const {
    postJob: createJob,
    loading: submitting,
    error: submitError,
  } = useJobPost(token);

  // --- 페이지 흐름 상태 ---
  const [step, setStep] = useState<Step>(0);
  const [draft, setDraft] = useState<JobDraft>(() => {
    // 새로고침 복구(선택): 있으면 사용, 없으면 기본
    const saved = localStorage.getItem('jobDraft');
    return saved
      ? JSON.parse(saved)
      : { ...EMPTY_JOB_DRAFT, formFieldList: BASE_FORM_FIELDS };
  });
  const patchDraft = useCallback((patch: Partial<JobDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem('jobDraft', JSON.stringify(next)); // 선택적: 자동 저장
      return next;
    });
  }, []);

  // --- 뒤로가기(popstate) 제어: Step2 → Step1, Step1 → 확인 후 Step0 ---
  useEffect(() => {
    if (step === 0) return;
    const href =
      window.location.pathname + window.location.search + window.location.hash;
    history.pushState(null, '', href);

    const onPopState = (e: PopStateEvent) => {
      e.preventDefault();

      if (step === 2) {
        setStep(1);
        history.pushState(null, '', href);
        return;
      }

      if (step === 1) {
        const ok = confirm(
          '채용공고 정보 입력을 취소하시겠습니까?\n작성 중인 내용은 저장되지 않을 수 있습니다.'
        );
        if (ok) {
          setDraft({ ...EMPTY_JOB_DRAFT, formFieldList: BASE_FORM_FIELDS });
          localStorage.removeItem('jobDraft');
          setStep(0);
          navigate('.', { replace: true });
        } else {
          history.pushState(null, '', href);
        }
        return;
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [step, navigate, location.key]);

  // 리스트 재조회: 리스트로 돌아오면 refetch
  useEffect(() => {
    if (step === 0) fetchJobs();
  }, [step, fetchJobs]);

  // --- 삭제 ---
  const handleDelete = (id: number) => {
    if (!confirm('이 공고를 삭제할까요?')) return;
    setDeletingId(id);
    deleteJob(id, {
      onError: () => setDeletingId(null),
      onSettled: () => {
        setDeletingId(null);
        fetchJobs();
      },
    });
  };

  // --- 최종 제출 ---
  const handleSubmit = async () => {
    try {
      const required: (keyof CreateJobDTO)[] = [
        'title',
        'address',
        'detailAddress',
        'roadAddress',
        'zipcode',
        'description',
        'workingTime',
        'recruitCount',
      ];
      for (const k of required) {
        if (!draft.title) {
          draft.title = '기본 제목'; // 테스트용
        }
        if (!draft[k]) {
          alert(`필수값 누락: ${k}`);
          return;
        }
      }

      const formFieldList: JobPostFormField[] =
        draft.formFieldList && draft.formFieldList.length > 0
          ? (draft.formFieldList as JobPostFormField[])
          : BASE_FORM_FIELDS;

      const payload: CreateJobDTO = {
        title: draft.title!,
        address: draft.address!,
        detailAddress: draft.detailAddress!,
        roadAddress: draft.roadAddress!,
        zipcode: draft.zipcode!,
        description: draft.description!,
        workingTime: draft.workingTime!,
        recruitCount: draft.recruitCount!,
        hourlyWage: draft.hourlyWage,
        monthlySalary: draft.monthlySalary ?? null,
        yearSalary: draft.yearSalary ?? null,
        deadline: draft.deadline,
        note: draft.note,
        jobPostImageList: draft.jobPostImageList,
        formFieldList,
      };

      await createJob(payload);
      alert('등록 완료!');

      // 초기화 & 리스트로
      setDraft({ ...EMPTY_JOB_DRAFT, formFieldList: BASE_FORM_FIELDS });
      localStorage.removeItem('jobDraft');
      setStep(0);
      fetchJobs();
    } catch {
      alert(submitError ?? '등록에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };
  const handleChangeFormFields = useCallback(
    (list: JobPostFormField[]) => {
      patchDraft({ formFieldList: list });
    },
    [patchDraft]
  );
  return (
    <div>
      <Topbar>
        <div className="w-full h-full">
          {/* 타이틀 */}
          <div className="mt-[17px] flex flex-col items-center">
            <p className="text-[20px] font-semibold text-[#747474]">
              신청서 입력
            </p>
            <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[12px]" />
          </div>

          {/* Step 0: 리스트 + 새 신청서 추가 */}
          {step === 0 && (
            <div className="flex flex-col items-center">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-[11px] text-[20px] mt-[11px] text-[#747474] font-semibold"
              >
                <img
                  src="/icons/plus_icon.svg"
                  alt="추가"
                  className="w-[24px] h-[24px]"
                />
                새 신청서 추가
              </button>

              <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[10px]" />

              <div className="overflow-y-auto max-h-[500px] mb-[36px] w-full flex flex-col items-center scrollbar-hide">
                {loading && <div>로딩중...</div>}

                {!loading && jobs.length === 0 && (
                  <div className="text-center text-[16px] text-[#A0A0A0] font-semibold py-10">
                    채용중인 공고가 없습니다.
                  </div>
                )}

                {jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="mt-[31px] flex flex-col items-center"
                  >
                    {/* 제목 */}
                    <div className="font-400 text-[16px] text-[#000000]">
                      {job.roadAddress}
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

                    {/* 액션 */}
                    <div className="w-full flex gap-[13px] mt-[16px] items-center justify-center">
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deleting && deletingId === job.id}
                        className={`w-[144px] h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
                                                ${
                                                  deleting &&
                                                  deletingId === job.id
                                                    ? 'border-[#cccccc] bg-[#f5f5f5] text-[#9e9e9e] cursor-not-allowed'
                                                    : 'border-[#0D29B7] bg-white text-black hover:bg-[#DBDFF4]'
                                                }`}
                      >
                        {deleting && deletingId === job.id
                          ? '삭제 중…'
                          : '삭제'}
                      </button>

                      <button className="w-[144px] h-[45px] border-[1.3px] border-[#0D29B7] rounded-[8px] bg-[#0D29B7] text-[16px] font-medium text-white">
                        수정
                      </button>
                    </div>

                    {/* 구분선 */}
                    {index !== jobs.length - 1 && (
                      <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[37px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: 기본 정보 입력 */}
          {step === 1 && (
            <CompanyCreateJobPage
              draft={draft}
              onChangeDraft={patchDraft}
              onNext={() => setStep(2)}
            />
          )}

          {/* Step 2: 폼 필드 빌더 + 최종 제출 */}
          {step === 2 && (
            <CompanyCreateFormPage
              draft={draft}
              onBack={() => setStep(1)}
              onChangeFormFields={handleChangeFormFields}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          )}
        </div>
      </Topbar>
    </div>
  );
}
