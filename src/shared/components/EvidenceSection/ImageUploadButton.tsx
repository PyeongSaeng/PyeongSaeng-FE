import { useEffect, useRef, useState } from 'react';
import { usePasteUpload } from '../../hooks/usePasteUpload';

interface Props {
  imageFile: File | null;
  onFileSelect: (file: File) => void;
  className?: string;
  onDragStateChange?: (dragging: boolean) => void;
  fallbackName?: string;

  // 리뷰/완료에서 쓰는 보기 전용 모드
  readOnly?: boolean;
  onClear?: () => void;
}

export default function ImageUploadButton({
  imageFile,
  onFileSelect,
  className,
  onDragStateChange,
  fallbackName,
  readOnly = false,
  onClear,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(''); // 초기값 명시
  const setDraggingState = (state: boolean) => {
    setDragging(state);
    onDragStateChange?.(state);
  };
  usePasteUpload(onFileSelect);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

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

  // 보기 전용 모드
  if (readOnly) {
    return (
      <div
        className={`w-full border border-emerald-300 rounded-lg p-4 ${className ?? ''}`}
      >
        <h3 className="text-[16px] font-semibold mb-2">자격증 이미지</h3>
        {imageFile || displayName ? (
          <div className="flex items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-md border overflow-hidden">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={displayName || 'uploaded'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-medium truncate">
                {displayName || '이미지'}
              </div>
              <div className="text-[12px] text-gray-500 mt-1">
                첨부한 이미지가 맞는지 확인해 주세요.
              </div>
            </div>
            {onClear && (
              <button
                className="text-xs px-3 py-2 rounded border"
                onClick={onClear}
              >
                다시 첨부
              </button>
            )}
          </div>
        ) : (
          <div className="text-[13px] text-gray-600">
            첨부된 파일이 없습니다.
          </div>
        )}
      </div>
    );
  }

  // 업로드 모드
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
      onDragOver={(e) => {
        e.preventDefault();
        setDraggingState(true);
      }}
      onDragLeave={() => setDraggingState(false)}
      onDrop={handleDrop}
      onPaste={handlePaste}
      style={{ userSelect: 'none' }}
    >
      {previewUrl || displayName ? (
        <div className="flex items-center gap-3">
          <div className="w-[24px] h-[24px] rounded border overflow-hidden">
            {previewUrl && (
              <img
                src={previewUrl}
                alt={displayName || 'uploaded'}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="text-[16px] font-bold text-[var(--main-blue)] truncate max-w-[150px]">
            {displayName || '이미지를 첨부하세요.'}
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
