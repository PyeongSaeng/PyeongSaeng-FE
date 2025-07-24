import { useRef, useState } from 'react';
import { FiFolderPlus } from 'react-icons/fi';

interface Props {
  imageFile: File | null;
  onFileSelect: (file: File) => void;
}

export default function FileDropZone({ imageFile, onFileSelect }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <>
      <div
        className={`w-full rounded-lg border-1 ${dragging ? 'border-[#08D485] bg-blue-50' : 'border-[#08D485]'} p-4 flex flex-col items-center`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onPaste={handlePaste}
      >
        <label
          htmlFor="fileUpload"
          className="cursor-pointer flex items-center gap-2 text-[#08D485] text-[14px] font-semibold"
        >
          <FiFolderPlus size={20} />
          <span className="max-w-[220px] truncate">
            {imageFile ? imageFile.name : '이미지를 선택하세요.'}
          </span>
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <p className="text-[14px] text-center text-[#555] break-keep">
        클릭하여 파일을 선택, 복사 & 붙여넣기, 드래그 & 드롭해주세요
      </p>
    </>
  );
}
