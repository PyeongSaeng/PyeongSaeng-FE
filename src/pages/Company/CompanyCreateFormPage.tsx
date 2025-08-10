import { useEffect, useMemo, useState } from "react";
import { BASE_FORM_FIELDS, JobDraft, JobPostFormField } from "./types/job";

interface Props {
  draft: JobDraft;
  onBack: () => void;
  onChangeFormFields?: (list: JobPostFormField[]) => void;
  onSubmit: () => void;            
  submitting?: boolean;            
}

const BASE_LABELS = ["성함", "연세", "거주지", "전화번호"];

export default function CompanyCreateFormPage({
  draft,
  onBack,
  onChangeFormFields,
  onSubmit,
  submitting = false,
}: Props) {
  const [fields, setFields] = useState<JobPostFormField[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [addType, setAddType] = useState<"TEXT" | "IMAGE" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // draft에 이미 저장해둔 formFieldList가 있다면, 그중 "기본 4개 이후"만 복구
  useEffect(() => {
    const all = (draft.formFieldList ?? BASE_FORM_FIELDS) as JobPostFormField[];
    const extra = all.slice(BASE_FORM_FIELDS.length).filter(f => !!f.fieldName);
    setFields(extra);
  }, [draft.formFieldList]);

  // 기본 + 추가 합치기
  const allFormFields = useMemo(
    () => [...BASE_FORM_FIELDS, ...fields],
    [fields]
  );

  // 부모에게 합쳐진 리스트 반영 (draft.formFieldList 갱신)
  useEffect(() => {
    onChangeFormFields?.(allFormFields);
  }, [allFormFields, onChangeFormFields]);

  const handleAddField = () => {
    const name = inputValue.trim();
    if (!name || !addType) return;
    const exists = allFormFields.some(f => f.fieldName === name);
    if (exists) {
      setError("이미 존재하는 질문 라벨입니다.");
      return;
    }

    const field: JobPostFormField = { fieldName: name, fieldType: addType };
    setFields(prev => [...prev, field]);

    setError(null);
    setInputValue("");
    setIsInputVisible(false);
    setAddType(null);
  };

  const handleRemoveField = (indexToRemove: number) => {
    setFields(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const nextIndex = BASE_LABELS.length + fields.length + 1;
  const canAdd = isInputVisible && inputValue.trim().length > 0;

  // 최종 제출 전 가벼운 검증(선택)
  const validateAndSubmit = () => {
    // (필요 시: 추가 항목 이름 길이/특수문자 제한 등 추가 가능)
    onSubmit();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 기본 항목 */}
      <div className="mx-[17px] mt-[2px]">
        {BASE_LABELS.map((label, idx) => (
          <div key={label} className="h-[29px] flex items-center gap-[22px] mt-[21px]">
            <span className="text-[24px] text-[#414141] w-6">{idx + 1}</span>
            <span className="text-[24px] text-[#414141]">{label}</span>
          </div>
        ))}

        {/* 추가된 항목 목록 */}
        {fields.map((field, idx) => (
          <div
            key={`${field.fieldName}-${idx}`}
            className="flex items-center gap-[22px] mt-[21px]"
          >
            <span className="text-[24px] text-[#414141] w-6">
              {BASE_LABELS.length + idx + 1}
            </span>
            <span className="text-[24px] text-[#414141] flex-1">{field.fieldName}</span>
            <button onClick={() => handleRemoveField(idx)}>
              <img src="/icons/close_icon.svg" alt="삭제" className="w-[24px] h-[24px]" />
            </button>
          </div>
        ))}

        {/* 입력창 (TEXT/IMAGE 공용) */}
        {isInputVisible && (
          <div className="flex flex-col gap-[6px] mt-[12px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[24px] text-medium">{nextIndex}</span>
              <input
                type="text"
                placeholder="여기에 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canAdd && handleAddField()}
                className="flex-1 w-[260px] px-[16px] h-[45px] border border-[#c2c2c2] rounded-[8px] text-[#000000] placeholder:text-[#c2c2c2] text-[16px] text-medium"
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="flex justify-end">
              <button
                disabled={!canAdd}
                onClick={handleAddField}
                className={`w-[84px] h-[45px] rounded-[8px] text-[16px] text-medium
                  ${canAdd ? "bg-[#0D29B7] text-[#f1f1f1]" : "bg-gray-200 text-gray-500 cursor-not-allowed"}
                `}
              >
                추가
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 추가 버튼들 */}
      <div className="mt-[35px] flex gap-[13px]">
        <button
          type="button"
          className="flex-1 w-[144px] h-[45px] border border-[#0D29B7] text-[#000000] rounded-[8px] text-[16px] font-medium"
          onClick={() => { setAddType("TEXT"); setIsInputVisible(true); }}
        >
          글자 답변 항목 추가
        </button>

        <button
          type="button"
          className="flex-1 w-[144px] h-[45px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium"
          onClick={() => { setAddType("IMAGE"); setIsInputVisible(true); }}
        >
          사진 답변 항목 추가
        </button>
      </div>

      {/* 하단 액션 */}
      <div className="mt-[24px] mb-[24px] flex gap-[13px] px-[17px]">
        <button
          onClick={onBack}
          className="flex-1 h-[45px] border border-[#0D29B7] rounded-[8px] text-[16px] font-medium text-[#000000] bg-white"
        >
          뒤로가기
        </button>
        <button
          onClick={validateAndSubmit}
          disabled={submitting}
          className={`flex-1 h-[45px] rounded-[8px] text-[16px] font-medium
            ${submitting ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#0D29B7] text-white"}
          `}
        >
          {submitting ? "올리는 중…" : "신청서 올리기"}
        </button>
      </div>
    </div>
  );
}
