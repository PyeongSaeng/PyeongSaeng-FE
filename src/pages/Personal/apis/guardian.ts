import axiosInstance from '../../../shared/apis/axiosInstance';

export type SeniorLite = {
  id?: number;
  seniorId?: number;
  name?: string;
  roadAddress?: string;
  detailAddress?: string;
  phone?: string;
};

/** 시니어 본인 계정이면 성공, 아니라면 4xx */
export const getMySenior = async () => {
  const { data } = await axiosInstance.get('/api/user/senior/me');
  return data?.result ?? data;
};

/** 보호자-연결된 시니어 목록 */
export const getConnectedSeniors = async (): Promise<SeniorLite[]> => {
  const { data } = await axiosInstance.get('/api/user/seniors');
  return data?.result ?? data ?? [];
};

/** 쿼리의 seniorId가 있으면 해당 시니어, 없으면 첫 번째 */
export const pickSenior = (list: SeniorLite[], wantedId?: number | null) => {
  if (!Array.isArray(list) || list.length === 0) return null;
  if (wantedId) {
    const found = list.find(
      (s) => s.id === wantedId || s.seniorId === wantedId
    );
    if (found) return found;
  }
  return list[0];
};
