import axiosInstance from '../../../shared/apis/axiosInstance';

// 회사가 쓴 채용 공고 목록
export async function getMyJobPosts(
  params: { page?: number; state?: 'RECRUITING' | 'CLOSED' } = {}
) {
  const { page = 1, state = 'RECRUITING' } = params;
  const { data } = await axiosInstance.get('/api/job/companies/me/posts', {
    params: { page, state },
  });
  return data.result as {
    jobPostList: Array<{
      id: number;
      state: 'RECRUITING' | 'CLOSED';
      title: string;
      roadAddress: string;
      description: string;
      images: {
        jobPostId: number;
        keyName: string;
        imageUrl: string;
        originalFileName: string;
      }[];
    }>;
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
}

//  특정 공고의 지원서 목록
export async function getApplications(params: {
  jobPostId: number;
  page?: number;
}) {
  const { jobPostId, page = 1 } = params;
  const { data } = await axiosInstance.get('/api/applications', {
    params: { jobPostId, page },
  });
  return data.result as {
    applicationList: Array<{
      applicationId: number;
      applicantName: string;
      applicantStatus: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
    }>;
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
}

// 지원서 상세
export async function getApplicationDetails(applicationId: number) {
  const { data } = await axiosInstance.get(
    `/api/applications/${applicationId}/details`
  );
  return data.result as {
    questionAndAnswerList: Array<
      | { fieldName: string; fieldType: 'TEXT'; answerContent: string }
      | {
          fieldName: string;
          fieldType: 'IMAGE';
          answerContent: Array<{ keyName: string; originalFileName: string }>;
        }
    >;
    postState: 'ACTIVE' | 'INACTIVE';
    applicationState: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  };
}

//  지원서 합불 변경

export async function patchApplicationStatus(
  applicationId: number,
  status: 'APPROVED' | 'REJECTED'
) {
  const { data } = await axiosInstance.patch(
    `/api/applications/${applicationId}/state`,
    {
      applicationState: status,
      applicationStatus: status,
    }
  );
  return data.result as {
    applicationId: number;
    status: 'APPROVED' | 'REJECTED';
  };
}
