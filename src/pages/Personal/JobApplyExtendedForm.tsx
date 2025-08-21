import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import { FormField } from './types/jobs';

// Step 상태 타입
type Step = 'text' | 'image' | 'done';

type Props = {
  formFields: FormField[];
  roadAddress: string;
  jobPostId: number;
};

const JobApplyExtendedForm = ({ formFields, roadAddress, jobPostId }: Props) => {
  const navigate = useNavigate();
  const additionalFields = useMemo(() => formFields.slice(4), [formFields]);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finalCertFileName, setFinalCertFileName] = useState('');

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const typeToStep = (t: FormField['fieldType']): Exclude<Step, 'done'> =>
    t === 'IMAGE' ? 'image' : 'text';

  const initialStep: Step =
    additionalFields.length === 0 ? 'done' : typeToStep(additionalFields[0].fieldType);

  const [step, setStep] = useState<Step>(initialStep);

  const currentField = additionalFields[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === additionalFields.length - 1;

  const handleTextChange = (value: string) => {
    if (!currentField) return;
    setAnswers((prev) => ({ ...prev, [currentField.id]: value }));
  };

  const handleImageAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentField) return;
    const file = e.target.files?.[0];
    if (file) {
      setAnswers((prev) => ({ ...prev, [currentField.id]: file.name }));
    }
  };

  const handleFinalCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFinalCertFileName(file.name);
  };

  const goPrev = () => {
    if (isFirst) return;
    const prevIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevIndex);
    setStep(typeToStep(additionalFields[prevIndex].fieldType));
  };

  const goNext = () => {
    if (!isLast) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setStep(typeToStep(additionalFields[nextIndex].fieldType));
    } else {
      setStep('done');
    }
  };

  const handleSubmit = () => {
    console.log('최종 제출 데이터:', {
      jobPostId,
      roadAddress,
      answers,
      finalCertFileName,
    });
    setSubmitted(true);
    setStep('done');
  };

  // -------------------- DONE 화면 --------------------
  if (step === 'done') {
    return (
      <Topbar>
        <div className="p-[13px]">
          <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
            신청서 작성
          </h2>
          <h2 className="text-[16px] text-[#747474] font-semibold mt-[8px]">
            {submitted ? '신청 완료되었습니다' : '신청 완료 전 마지막으로 신청서를 확인하세요'}
          </h2>

          <div className="mt-[40px] w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
            <p>{roadAddress}</p>
          </div>

          <div className="border p-4 mt-[24px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] ">
            {additionalFields.map((field) => (
              <div key={field.id} className="mb-3">
                <p className="font-medium">{field.fieldName}</p>
                <p className="text-[14px] break-words">
                  {answers[field.id] ?? <span className="text-gray-400">미작성</span>}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-[39px]">
            <label className="block mb-1 text-[14px] text-[#747474]">사회복지 자격증 이미지</label>
            <input
              type="file"
              onChange={handleFinalCertChange}  
              disabled={submitted}
            />
            {finalCertFileName && <p className="mt-2">{finalCertFileName}</p>}
          </div>

          {submitted ? (
            <button
              onClick={() => navigate('/')}
              className="w-full h-[45px] mt-[24px] text-[16px] bg-[#08D485] text-black rounded-[8px]"
            >
              홈으로
            </button>
          ) : (
            <div className="flex justify-between gap-[13px] mt-[24px]">
              <button
                onClick={() => {
                  if (additionalFields.length > 0) {
                    setCurrentStepIndex(additionalFields.length - 1);
                    setStep(typeToStep(additionalFields[additionalFields.length - 1].fieldType));
                  }
                }}
                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000]"
              >
                임시 저장
              </button>
              <button
                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
                onClick={handleSubmit}
              >
                제출
              </button>
            </div>
          )}
        </div>
      </Topbar>
    );
  }

  // -------------------- TEXT 화면 --------------------
  if (step === 'text') {
    return (
      <Topbar>
        <div className="p-[13px]">
          <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
            신청서 작성
          </h2>

          <div className="mt-[24px] w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
            {currentField?.fieldName}
          </div>

          <input
            type="text"
            className="mt-[16px] border p-2 w-full"
            value={currentField ? answers[currentField.id] || '' : ''}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="내용을 입력하세요"
          />

          <div className="flex justify-between gap-[13px] mt-[32px]">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000] disabled:opacity-40"
            >
              이전
            </button>
            <button
              onClick={goNext}
              className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
            >
              {isLast ? '다음' : '다음'}
            </button>
          </div>
        </div>
      </Topbar>
    );
  }

  // -------------------- IMAGE 화면 --------------------
  return (
    <Topbar>
      <div className="p-[13px]">
        <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
          신청서 작성
        </h2>
        <h3 className="text-[16px] text-[#747474] font-semibold mt-[8px]">
          증빙자료 사진 첨부가 필요합니다
        </h3>

        <div className="mt-[24px] w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
          {currentField?.fieldName}
        </div>

        <input
          type="file"
          className="mt-[16px] p-4 w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000] flex items-center justify-center"
          onChange={handleImageAnswerChange}
        />
        {currentField && answers[currentField.id] && (
          <p className="mt-2 text-[14px]">{answers[currentField.id]}</p>
        )}

        <div className="flex justify-between gap-[13px] mt-[255px]">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000] disabled:opacity-40"
          >
            이전
          </button>
          <button
            onClick={goNext}
            className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
          >
            {isLast ? '다음' : '다음'}
          </button>
        </div>
      </div>
    </Topbar>
  );
};

export default JobApplyExtendedForm;
