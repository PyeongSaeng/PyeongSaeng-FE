import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import FormTitleSection from '../../shared/components/FormTitleSection';
import JobInfoSection from '../../shared/components/JobInfoSection';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import QuestionWriteFormSection from '../../shared/components/QuestionWriteFormSection';
import EvidenceSection from '../../shared/components/EvidenceSection';
import NextButton from '../../shared/components/NextButton';
import TwoButtonGroup from '../../shared/components/TwoButtonGroup';

import {
  postGenerateKeywords,
  postGenerateAnswer,
  postUpdateAnswer,
} from './apis/ai';

export default function JobApplyPage() {
  const navigate = useNavigate();
  const hasExtraQuestions = true;

  // 31(choice) → 32(scaffold) → 33(final) → evidence → complete
  const [step, setStep] = useState<
    'basic' | 'choice' | 'scaffold' | 'final' | 'evidence' | 'complete'
  >(hasExtraQuestions ? 'choice' : 'basic');

  // 31
  const [selected, setSelected] = useState('');
  const questionId = 1;

  // 32
  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [isLoadingScaffold, setIsLoadingScaffold] = useState(false);
  const [scaffoldError, setScaffoldError] = useState<string | null>(null);

  // 33
  const [finalText, setFinalText] = useState('');

  // 파일 업로드
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  // 예시 인적정보
  const info = useMemo(
    () => ({
      name: '김순자',
      gender: '여성',
      age: '63세',
      phone: '010-1234-5678',
      idNumber: '610908-******',
      address: '대지로 49 203동',
    }),
    []
  );

  // 새로고침 이탈 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (step !== 'complete') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step]);

  // 31 → 32 : 즉시 화면 전환 + AI 호출
  const handleChoiceSubmit = async () => {
    if (!selected.trim()) return alert('답변을 선택해 주세요.');
    setStep('scaffold');
    setIsLoadingScaffold(true);
    setScaffoldError(null);
    setScaffoldText('');

    try {
      // 1) 키워드
      const kw = await postGenerateKeywords({ questionId, selected });
      const picked = kw.keywords?.[0] ?? selected;

      // 2) 답변(틀)
      const ans = await postGenerateAnswer({ questionId, keywords: [picked] });
      setScaffoldText(ans.answer);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ?? 'AI 생성 중 오류가 발생했습니다.';
      setScaffoldError(msg);
    } finally {
      setIsLoadingScaffold(false);
    }
  };

  // 32 → 33 : 사용자 경험 반영
  const handleAiCompose = async () => {
    try {
      const res = await postUpdateAnswer({
        questionId,
        updatedInfo: personalInput.trim(),
      });
      setFinalText(res.answer);
      setStep('final');
    } catch (e: any) {
      alert(
        e?.response?.data?.message ?? '최종 문장 생성 중 오류가 발생했어요.'
      );
    }
  };

  const handleGoHome = () => navigate('/personal');

  return (
    <div className="pt-[10px] h-[740px] flex flex-col">
      <Topbar />
      <div className="flex justify-center overflow-y-auto flex-1 pb-6">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
          <FormTitleSection
            title="신청서 작성"
            description={
              step === 'basic'
                ? '신청서에 추가할 항목이 없습니다.\n제출하시겠습니까?'
                : step === 'choice'
                  ? '신청서에 추가할 항목이 있습니다.\n다음 질문에 답해 주세요.'
                  : step === 'scaffold'
                    ? 'AI가 신청서의 틀을 잡았습니다.\n관련된 경험을 직접 입력해주세요.'
                    : step === 'final'
                      ? '아래 완성본을 확인·수정해주세요.'
                      : step === 'complete'
                        ? '신청 완료되었습니다.'
                        : ''
            }
          />

          {/* 완료 */}
          {step === 'complete' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />

              {/* 추가항목이 있을 때만 완성본 미리보기 노출 */}
              {hasExtraQuestions && !!finalText && (
                <div className="w-full border border-[#08D485] rounded-lg p-4 mt-4">
                  <h3 className="text-[16px] font-semibold mb-2">지원동기</h3>
                  <p className="text-[14px] text-[#333] whitespace-pre-wrap">
                    {finalText}
                  </p>
                </div>
              )}

              {/* 추가항목이 있을 때만 업로드 노출 */}
              {hasExtraQuestions && (
                <div className="w-full mt-4">
                  <label className="text-[14px] font-medium text-[#888] mb-1 block">
                    사회복지 자격증 이미지{' '}
                    <span className="text-red-500">(필수)</span>
                  </label>
                  <div className="flex w-full h-[4.5rem] items-center">
                    <div className="flex items-center flex-1 border border-[#08D485] rounded-lg pl-4 pr-2 bg-white overflow-hidden h-full">
                      <span
                        className="flex-1 text-[14px] text-[#333] font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ minWidth: 0 }}
                      >
                        {uploadedImageFile?.name ?? '이미지 없음'}
                      </span>
                      {uploadedImageFile && (
                        <button
                          type="button"
                          className="text-[20px] text-[#333] ml-2 shrink-0"
                          onClick={() => setUploadedImageFile(null)}
                        >
                          <img
                            src="/icons/close_icon.svg"
                            alt="삭제"
                            className="w-[24px] h-[24px]"
                          />
                        </button>
                      )}
                    </div>
                    <label className="ml-2 h-full cursor-pointer shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0])
                            setUploadedImageFile(e.target.files[0]);
                        }}
                      />
                      <div className="h-full px-8 flex items-center justify-center bg-[#08D485] text-white text-[14px] font-semibold rounded-lg">
                        검색
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* 버튼 */}
              <div className="w-full pb-10">
                <NextButton onClick={handleGoHome}>
                  {hasExtraQuestions ? '홈으로 이동' : '홈으로'}
                </NextButton>
              </div>
            </>
          )}

          {/* 29: 추가항목 없음 → 확인/제출 */}
          {step === 'basic' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() => setStep('complete')}
              />
            </>
          )}

          {/* 31: 선택 */}
          {step === 'choice' && (
            <div className="w-full flex flex-col gap-4">
              <MotivationChoiceSection
                question="Q1. 지원 동기가 무엇인가요?"
                choices={[
                  '경제적으로 도움을 얻으려고',
                  '사람들과 만나려고',
                  '사회에 도움이 되려고',
                  '직접 입력',
                ]}
                selected={selected}
                onSelect={setSelected}
              />
              <NextButton onClick={handleChoiceSubmit}>제출하기</NextButton>
            </div>
          )}

          {/* 32: AI 틀 + 경험 입력 */}
          {step === 'scaffold' && (
            <div className="w-full flex flex-col">
              <QuestionWriteFormSection
                title="지원동기"
                inputValue={
                  isLoadingScaffold
                    ? 'AI가 틀을 작성 중입니다...'
                    : scaffoldError
                      ? `[오류] ${scaffoldError}`
                      : scaffoldText
                }
                onChange={() => {}}
                readOnly
              />

              <QuestionWriteFormSection
                title="관련된 경험을 입력해주세요"
                inputValue={personalInput}
                onChange={setPersonalInput}
                placeholder="여기에 입력해주세요"
                readOnly={false}
                className="mb-0"
              />

              <NextButton
                onClick={handleAiCompose}
                disabled={isLoadingScaffold || !scaffoldText.trim()}
              >
                AI 자동 작성
              </NextButton>
            </div>
          )}

          {/* 33: 완성본 수정 */}
          {step === 'final' && (
            <>
              <QuestionWriteFormSection
                title="지원동기(완성본)"
                inputValue={finalText}
                onChange={setFinalText}
                placeholder="여기서 수정할 수 있어요"
                readOnly={false}
              />

              <TwoButtonGroup
                leftLabel="임시저장"
                rightLabel="다음"
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() => setStep('evidence')}
              />
            </>
          )}

          {/* 증빙자료 */}
          {step === 'evidence' && (
            <EvidenceSection
              onSave={() => navigate('/personal/jobs/drafts')}
              onSubmit={() => setStep('complete')}
              onFileUpload={setUploadedImageFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
