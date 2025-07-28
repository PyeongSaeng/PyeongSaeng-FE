import { useRef, useState } from 'react';
import { usePasteUpload } from '../../hooks/usePasteUpload';

interface Props {
  imageFile: File | null;
  onFileSelect: (file: File) => void;
  className?: string;
  onDragStateChange?: (dragging: boolean) => void;
}

export default function ImageUploadButton({ imageFile, onFileSelect, className, onDragStateChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const setDraggingState = (state: boolean) => {
    setDragging(state);
    if (onDragStateChange) onDragStateChange(state);
  };
  usePasteUpload(onFileSelect);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
    setDragging(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const item = e.clipboardData.items?.[0];
    if (item?.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) onFileSelect(file);
    }
    setDraggingState(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`
        w-full h-full
        flex flex-col items-center justify-center
        rounded-[8px]
        border
        ${className ? className : ''}
        transition-all duration-150
        cursor-pointer
      `}
      tabIndex={0}
      onClick={handleButtonClick}
      onDragOver={e => {
        e.preventDefault();
        setDraggingState(true);
      }}
      onDragLeave={() => setDraggingState(false)}
      onDrop={handleDrop}
      onPaste={handlePaste}
      style={{
        userSelect: "none",
      }}
    >
      {/* 미리보기 또는 업로드 버튼 UI 추가한거임*/}
      {imageFile ? (
        <div className="flex flex-col items-center">
          <span className="text-[16px] font-medium text-gray-600 truncate max-w-[200px]">{imageFile.name}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center-2">
          <span className="text-[16px] font-medium">이미지를 첨부하세요.</span>
        </div>
      )}
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
