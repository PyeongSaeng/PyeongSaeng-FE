import axiosInstance from '../../../shared/apis/axiosInstance';
import { ResUploadImage } from '../types/files';

// TODO: 실제 업로드 엔드포인트로 바꾸세요 (예: "/api/files/upload")
export const postUploadImage = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axiosInstance.post<ResUploadImage>(
    '/api/files/upload',
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data.result.keyName; // keyName 반환
};
