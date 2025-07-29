export interface Application {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  address: string;
  experience: string;
  status: string;
  result: string;
}

export interface ApplicationGroup {
  title: string;
  applications: Application[];
}

export const applicationGroups: ApplicationGroup[] = [
  {
    title: '근무지 + 근무 내용',
    applications: [
      {
        id: '101',
        name: '김영희',
        age: '66',
        gender: '여',
        phone: '010-OOOO-OOOO',
        address: '수지구 대지로 49 203동 105호',
        experience: '주부/10년 이상',
        status: '마감',
        result: '',
      },
    ],
  },
  {
    title: '죽전도서관 사서 업무',
    applications: [
      {
        id: '102',
        name: '이말덕',
        age: '72',
        gender: '여',
        phone: '010-OOOO-OOOO',
        address: '죽전로 22 101동 202호',
        experience: '요양보호사/5년',
        status: '진행중',
        result: '',
      },
      {
        id: '103',
        name: '이말숙',
        age: '72',
        gender: '여',
        phone: '010-OOOO-OOOO',
        address: '죽전로 22 101동 202호',
        experience: '요양보호사/5년',
        status: '진행중',
        result: '',
      },
    ],
  },
];
