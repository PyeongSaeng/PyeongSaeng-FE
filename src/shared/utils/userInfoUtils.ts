// 뷰모드일 때 전화번호 포멧팅 (010-0000-0000)
export const formatPhone = (v: string) =>
  v.replace(/\D/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

// 전화번호 원래대로 포멧팅 (01000000000)
export const normalizePhone = (v: string) => v.replace(/\D/g, '');

// 원래 데이터, 수정 데이터 비교 함수
export const diff = <T extends object>(prev: T, curr: T): Partial<T> => {
  const out: Partial<T> = {};
  (Object.keys(curr) as (keyof T)[]).forEach((k) => {
    if (!Object.is(prev[k], curr[k])) {
      out[k] = curr[k];
    }
  });
  return out;
};

// 요일로 바꾸기
export const getDayOfWeek = (dateString: string) => {
  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const date = new Date(dateString);
  return days[date.getDay()];
};

// 날짜 형식 바꾸기
export const formatDate = (dateString: string) => {
  const splitDate = dateString.split('-');
  const date = '~ ' + splitDate[1] + '/' + splitDate[2];

  return date;
};
