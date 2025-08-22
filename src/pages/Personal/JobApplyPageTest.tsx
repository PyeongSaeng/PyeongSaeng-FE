import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // useLocation 추가
import { useQueryClient } from '@tanstack/react-query';
import { useJobDetail } from './hooks/useDetail';
import { useFormFields } from './hooks/useFormField';
import JobApplyExtendedForm from './JobApplyExtendedForm';
import JobApplyDefaultForm from './JobApplyDefaultForm';

const JobApplyPageTest = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const id = Number(jobId);

  const userRole = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  // 보호자인 경우 연결된 시니어 목록 조회
  const [selectedSeniorId, setSelectedSeniorId] = useState<number | null>(null);
  const [connectedSeniors, setConnectedSeniors] = useState<any[]>([]);
  const [isLoadingSeniors, setIsLoadingSeniors] = useState(false);

  // 연결된 시니어 목록 조회
  useEffect(() => {
    if (userRole === 'PROTECTOR' && accessToken) {
      setIsLoadingSeniors(true);

      fetch('/api/user/seniors', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setConnectedSeniors(data.result || []);

          // 첫 번째 시니어를 기본 선택
          if (data.result && data.result.length > 0) {
            const firstSenior = data.result[0];
            setSelectedSeniorId(firstSenior.seniorId);
          }
        })
        .catch((err) => console.error('시니어 목록 조회 실패:', err))
        .finally(() => {
          setIsLoadingSeniors(false);
        });
    }
  }, [userRole, accessToken]);

  const {
    data: formData,
    isLoading: isLoadingForm,
    isError: isErrorForm,
    error: formError,
    isFetching: isFetchingForm,
    status: formStatus,
  } = useFormFields(id, selectedSeniorId || undefined);

  const {
    data: jobDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    error: detailError,
    isFetching: isFetchingDetail,
    status: detailStatus,
  } = useJobDetail(id, selectedSeniorId || undefined);

  if (isLoadingForm || isLoadingDetail) return <div>로딩 중...</div>;

  // 에러 상태 상세 표시
  if (isErrorForm || isErrorDetail) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">에러 발생</h2>

        {isErrorForm && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <h3 className="font-medium text-red-800">폼 필드 조회 에러:</h3>
            <p className="text-red-600 text-sm mt-1">
              {formError?.message || '폼 필드를 불러올 수 없습니다.'}
            </p>
            <details className="mt-2 text-xs text-gray-600">
              <summary>상세 에러 정보</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                {JSON.stringify(formError, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {isErrorDetail && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <h3 className="font-medium text-red-800">
              채용공고 상세 조회 에러:
            </h3>
            <p className="text-red-600 text-sm mt-1">
              {detailError?.message || '채용공고 정보를 불러올 수 없습니다.'}
            </p>
            <details className="mt-2 text-xs text-gray-600">
              <summary>상세 에러 정보</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                {JSON.stringify(detailError, null, 2)}
              </pre>
            </details>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800 text-sm">
            <strong>현재 상태:</strong> {userRole || '역할 미확인'} 계정으로
            로그인됨
          </p>
        </div>
      </div>
    );
  }

  if (!formData || !jobDetail) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-600">
          데이터 없음
        </h2>
        <p className="text-gray-600">
          폼 데이터: {formData ? '있음' : '없음'}
          <br />
          채용공고 데이터: {jobDetail ? '있음' : '없음'}
        </p>
      </div>
    );
  }

  // JobApplyPageTest에서 시니어 정보를 props로 전달
  const selectedSenior = connectedSeniors.find(
    (s) => s.seniorId === selectedSeniorId
  );

  const formFieldList = formData.formFieldList;
  const hasExtraQuestions = formFieldList.length > 4;

  const roadAddress = jobDetail.roadAddress ?? '주소 없음';

  return hasExtraQuestions ? (
    <JobApplyExtendedForm
      formFields={formFieldList}
      roadAddress={roadAddress}
      jobPostId={id}
      isDraft={location.state?.isDraft || false}
      draftData={location.state?.draftData || null}
      // 보호자인 경우 시니어 정보 전달
      seniorInfo={userRole === 'PROTECTOR' ? selectedSenior : undefined}
      userRole={userRole || undefined}
    />
  ) : (
    <JobApplyDefaultForm
      formFields={formFieldList}
      roadAddress={roadAddress}
      jobPostId={id}
    />
  );
};

export default JobApplyPageTest;
