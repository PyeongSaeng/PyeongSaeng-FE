import { useCallback, useEffect, useMemo, useState } from "react";
import { useJobPost } from "./useJobPost";
import { BASE_FORM_FIELDS, CreateJobDTO, EMPTY_JOB_DRAFT, JobDraft, JobPostFormField } from "../types/job";

type Step = 0 | 1 | 2;

export function useCompanyJobFlow(token: string) {
  const { postJob: createJob, loading: submitting } = useJobPost(token);
  const [step, setStep] = useState<Step>(0);
  const [draft, setDraft] = useState<JobDraft>(() => {
    const saved = localStorage.getItem("jobDraft");
    return saved ? JSON.parse(saved) : { ...EMPTY_JOB_DRAFT, formFieldList: BASE_FORM_FIELDS };
  });

  // 목록 새로고침 유도용 키(제출 완료 시 증가 → 리스트 섹션이 refetch)
  const [refreshKey, setRefreshKey] = useState(0);

  // draft patch
  const patchDraft = useCallback((patch: Partial<JobDraft>) => {
    setDraft(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem("jobDraft", JSON.stringify(next));
      return next;
    });
  }, []);

  // step 전환
  const toList = useCallback(() => setStep(0), []);
  const toStep1 = useCallback(() => setStep(1), []);
  const toStep2 = useCallback(() => setStep(2), []);

  // 브라우저 뒤로가기 제어
  useEffect(() => {
    if (step === 0) return;
    const href = location.pathname + location.search + location.hash;
    history.pushState(null, "", href);

    const onPop = (e: PopStateEvent) => {
      e.preventDefault();
      if (step === 2) {
        setStep(1);
        history.pushState(null, "", href);
        return;
      }
      if (step === 1) {
        const ok = confirm("채용공고 정보 입력을 취소할까요?\n작성 중인 내용은 저장되지 않을 수 있어요.");
        if (ok) {
          setDraft({ ...EMPTY_JOB_DRAFT, formFieldList: BASE_FORM_FIELDS });
          localStorage.removeItem("jobDraft");
          setStep(0);
        } else {
          history.pushState(null, "", href);
        }
      }
    };
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, [step]);

  // 최종 제출
  const submit = useCallback(async () => {
    // 필수값 빠른 체크
    const required: (keyof CreateJobDTO)[] = [
      "title","address","detailAddress","roadAddress","zipcode",
      "description","workingTime","recruitCount",
    ];
    for (const k of required) {
      if (!draft[k]) { alert(`필수값 누락: ${k}`); return; }
    }

    const formFieldList: JobPostFormField[] =
      (draft.formFieldList && draft.formFieldList.length > 0)
        ? draft.formFieldList as JobPostFormField[]
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
    alert("등록 완료!");

    // 초기화 + 리스트 리프레시
    setDraft({ ...EMPTY_JOB_DRAFT, formFieldList: BASE_FORM_FIELDS });
    localStorage.removeItem("jobDraft");
    setStep(0);
    setRefreshKey(k => k + 1);
  }, [createJob, draft]);

  // Step2에서 extra 필드만 다루기 편하게 제공(옵션)
  const baseCount = BASE_FORM_FIELDS.length;
  const extraFields = useMemo(
    () => (draft.formFieldList ?? BASE_FORM_FIELDS).slice(baseCount),
    [draft.formFieldList]
  );
  const setAllFormFields = useCallback((list: JobPostFormField[]) => {
    patchDraft({ formFieldList: list });
  }, [patchDraft]);

  return {
    step, toList, toStep1, toStep2,
    draft, patchDraft,
    submit, submitting,
    refreshKey,
    extraFields, setAllFormFields, baseCount,
  };
}
