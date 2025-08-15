import axiosInstance from '../../../shared/apis/axiosInstance';
import type {
  ResPresignedUpload,
  ReqPresignedDownload,
  ResPresignedDownload,
} from '../types/files';

export const postPresignedUpload = async (
  fileName: string,
  contentType: string,
  size: number
) => {
  const { data } = await axiosInstance.post<ResPresignedUpload>(
    '/api/s3/presigned/upload',
    { fileName, contentType, size }
  );
  return data.result; // { keyName, url }
};

export const putFileToS3 = async (presignedUrl: string, file: File) => {
  const contentType = file.type || 'application/octet-stream';
  const res = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: file,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`S3 업로드 실패 (${res.status}): ${text}`);
  }
};

export const getPresignedDownload = async (keyName: string) => {
  const { data } = await axiosInstance.get<ResPresignedDownload>(
    '/api/s3/presigned/download',
    { params: { keyName } as ReqPresignedDownload }
  );
  return data.result.url;
};

export const uploadFileAndGetKey = async (file: File): Promise<string> => {
  const ct = file.type || 'application/octet-stream';
  const { keyName, url } = await postPresignedUpload(file.name, ct, file.size);
  await putFileToS3(url, file);
  return keyName;
};
