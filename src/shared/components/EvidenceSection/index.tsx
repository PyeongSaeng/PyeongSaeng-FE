import { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import TwoButtonGroup from '../TwoButtonGroup';

interface Props {
  onSave: () => void;
  onSubmit: () => void;
  onFileUpload: (file: File) => void;
}

export default function EvidenceSection({
  onSave,
  onSubmit,
  onFileUpload,
}: Props) {
  const [showUpload, setShowUpload] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    onFileUpload(file); // 파일 선택 시도 반영
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 설명 */}
      <div className="w-full border border-[#08D485] rounded-lg px-4 py-3 text-center text-[#747474] text-[16px] font-medium">
        사회복지 자격증 첨부
      </div>

      <div>
        <p className="text-[16px] text-[#747474] font-semibold">
          증빙자료 사진 첨부가 필요합니다
        </p>
        <p className="text-[14px] text-[#747474]">
          사회복지 자격증 이미지 <span className="text-red-500">(필수)</span>
        </p>
      </div>

      <button
        type="button"
        className="w-full h-[4.5rem] rounded-lg bg-[#08D485] text-black text-[16px] font-medium"
        onClick={() => setShowUpload(true)}
      >
        이미지를 첨부하세요
      </button>

      {showUpload && (
        <ImageUploadButton imageFile={imageFile} onFileSelect={handleFileSelect} />
      )}

      <TwoButtonGroup
        leftLabel="저장"
        rightLabel="제출"
        onLeftClick={onSave}
        onRightClick={onSubmit}
      />
    </div>
  );
}
