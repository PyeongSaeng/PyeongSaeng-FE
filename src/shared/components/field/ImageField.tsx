import { toast } from 'react-toastify';
import { MdOutlineFileDownload } from 'react-icons/md';
import { ImageObject } from '../../../pages/Personal/types/userInfo';
import axiosInstance from '../../apis/axiosInstance';

interface ImageFieldProps {
  fieldName: string;
  answerContent: ImageObject;
}

const ImageField = ({ fieldName, answerContent }: ImageFieldProps) => {
  const handleViewFile = async (keyName: string) => {
    try {
      const res = await axiosInstance.get(
        `/api/s3/presigned/download/${keyName}`
      );
      window.open(res.data.result.url, '_blank');
    } catch (err) {
      console.error('첨부파일 다운로드 실패', err);
      toast.error('파일을 불러올 수 없습니다.');
    }
  };

  return (
    <div className="flex flex-col text-[14px] font-[Pretendard JP] font-[400]">
      <div className="flex items-center gap-[4px] mb-[4px]">
        <span className="text-[#747474]">{fieldName}</span>
        <span className="text-[#FF0004]">(필수)</span>
      </div>
      <div className="flex justify-center gap-[11px]">
        <div className="flex jusitfy-between items-center w-[297px] h-[45px] p-[12px] rounded-[8px] border-[1.3px] border-[#08D485]">
          <span className="truncate">{answerContent.originalFileName}</span>
          <MdOutlineFileDownload
            size={32}
            onClick={() => handleViewFile(answerContent.keyName)}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageField;
