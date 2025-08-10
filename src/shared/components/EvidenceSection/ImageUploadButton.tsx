import { useRef, useState } from 'react';
import { usePasteUpload } from '../../hooks/usePasteUpload';

interface Props {
  imageFile: File | null;
  onFileSelect: (file: File) => void;
  className?: string;
  onDragStateChange?: (dragging: boolean) => void;
  fallbackName?: string;          
}

export default function ImageUploadButton({
  imageFile,
  onFileSelect,
  className,
  onDragStateChange,
  fallbackName,                    
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const setDraggingState = (state: boolean) => {
    setDragging(state);
    onDragStateChange?.(state);
  };
  usePasteUpload(onFileSelect);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
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

  const displayName = imageFile?.name || fallbackName || '';

  return (
    <div
      role="button"
      aria-label="이미지 업로드"
      className={`
        w-full h-full flex flex-col items-center justify-center
        rounded-[8px] border transition-all duration-150 cursor-pointer
        ${dragging ? 'border-blue-400 bg-blue-50' : ''}
        ${className ?? ''}
      `}
      tabIndex={0}
      onClick={handleButtonClick}
      onDragOver={e => { e.preventDefault(); setDraggingState(true); }}
      onDragLeave={() => setDraggingState(false)}
      onDrop={handleDrop}
      onPaste={handlePaste}
      style={{ userSelect: 'none' }}
    >
      {displayName ? (
        <div className="flex flex-col items-center">
          <span className="text-[16px] font-bold text-[var(--main-blue)] truncate max-w-[150px]">
            {displayName}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-[16px] font-medium">이미지를 첨부하세요.</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
