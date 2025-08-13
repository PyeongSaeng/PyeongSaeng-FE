// Presigned URL API 타입

export interface ReqPresignedUpload {
  fileName: string;
}
export interface ResPresignedUpload {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    keyName: string;
    url: string;
  };
}

export interface ReqPresignedDownload {
  keyName: string;
}
export interface ResPresignedDownload {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    url: string;
  };
}
