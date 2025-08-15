import { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';

interface Props {
  onFileUpload: (file: File) => void;
}

export default function EvidenceSection({ onFileUpload }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    onFileUpload(file);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 설명 */}
      <div className="w-full border border-[#08D485] rounded-lg px-4 py-3 text-center text-[#747474] text-[16px] font-medium">
        사회복지 자격증 첨부
      </div>

      <div
        className={`
          w-[300px] h-[45px]
          transition-colors
          ${dragging ? 'bg-green-50' : 'bg-white'}
        `}
      >
        <ImageUploadButton
          imageFile={imageFile}
          onFileSelect={handleFileSelect}
          className="text-[#000000] border-[#08D485] bg-[#08D485]"
          onDragStateChange={setDragging}
        />
      </div>
    </div>
  );
}
