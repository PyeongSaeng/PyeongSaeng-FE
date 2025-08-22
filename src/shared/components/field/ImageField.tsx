import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineFileDownload } from 'react-icons/md';
import { ImageObject } from '../../../pages/Personal/types/userInfo';
import axiosInstance from '../../apis/axiosInstance';

interface ImageFieldProps {
  fieldName: string;
  answerContent: ImageObject[];
}

const ImageField = ({ fieldName, answerContent }: ImageFieldProps) => {
  const handleViewFile = async (keyName: string) => {
    try {
      const res = await axiosInstance.get(
        `/api/s3/presigned/download?keyName=${encodeURIComponent(keyName)}`
      );
      window.open(res.data.result.url, '_blank');
    } catch (err) {
      console.error('첨부파일 다운로드 실패', err);
      toast.error('파일을 불러올 수 없습니다.');
    }
  };

  useEffect(() => {
    console.log('답: ', answerContent);
  }, [answerContent]);

  return (
    <div className="flex flex-col text-[14px] font-[Pretendard JP] font-[400]">
      <div className="flex items-center gap-[4px] mb-[4px]">
        <span className="text-[#747474]">{fieldName}</span>
        <span className="text-[#FF0004]">(필수)</span>
      </div>
      <div className="flex justify-center gap-[11px]">
        <div className="flex self-between items-center gap-[10px] w-[297px] h-[45px] p-[12px] rounded-[8px] border-[1.3px] border-[#08D485]">
          <div className="truncate">{answerContent[0].originalFileName}</div>
          <MdOutlineFileDownload
            size={32}
            onClick={() => handleViewFile(answerContent[0].keyName)}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageField;
