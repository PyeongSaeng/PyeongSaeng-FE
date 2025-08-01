import { useState } from "react";
import axios from "axios";

type PresignedUploadResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    keyName: string;
    url: string;
  }
};

export function useImageUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<{ keyName: string; url: string } | null> => {
    setLoading(true);
    setError(null);
    try {
      const presignedRes = await axios.post<PresignedUploadResponse>(
        "/api/s3/presigned/upload",
        { fileName: file.name }
      );

      const { url, keyName } = presignedRes.data.result;

      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setLoading(false);
      return { keyName, url };
    } catch (e: any) {
      setLoading(false);
      setError(e?.message || "이미지 업로드 실패");
      return null;
    }
  };

  return { uploadImage, loading, error };
}
