import axiosInstance from '../../../shared/apis/axiosInstance';

import type {
  ReqPresignedUpload,
  ResPresignedUpload,
  ReqPresignedDownload,
  ResPresignedDownload,
} from '../types/files';

/** 업로드용 Presigned URL 발급 */
export const postPresignedUpload = async (fileName: string) => {
  const { data } = await axiosInstance.post<ResPresignedUpload>(
    '/api/s3/presigned/upload',
    { fileName } as ReqPresignedUpload
  );
  // { keyName, url }
  return data.result;
};

/** 실제 파일 PUT 업로드 */
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

/** 다운로드용 Presigned URL 발급 */
export const getPresignedDownload = async (keyName: string) => {
  const { data } = await axiosInstance.get<ResPresignedDownload>(
    '/api/s3/presigned/download',
    { params: { keyName } as ReqPresignedDownload }
  );
  return data.result.url;
};

/** 헬퍼: 파일 하나 업로드 → keyName 반환 */
export const uploadFileAndGetKey = async (file: File): Promise<string> => {
  const { keyName, url } = await postPresignedUpload(file.name);
  await putFileToS3(url, file);
  return keyName;
};
