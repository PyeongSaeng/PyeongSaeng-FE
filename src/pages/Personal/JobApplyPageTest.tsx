import { useParams, useLocation } from 'react-router-dom'; // useLocation 추가
import { useJobDetail } from './hooks/useDetail';
import { useFormFields } from './hooks/useFormField';
import JobApplyExtendedForm from './JobApplyExtendedForm';
import JobApplyDefaultForm from './JobApplyDefaultForm';

const JobApplyPageTest = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const id = Number(jobId);

  const {
    data: formData,
    isLoading: isLoadingForm,
    isError: isErrorForm,
  } = useFormFields(id);
  const {
    data: jobDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useJobDetail(id);

  if (isLoadingForm || isLoadingDetail) return <div>로딩 중...</div>;
  if (!formData || !jobDetail || isErrorForm || isErrorDetail)
    return <div>에러 발생</div>;

  const formFieldList = formData.formFieldList;
  const hasExtraQuestions = formFieldList.length > 4;

  const roadAddress = jobDetail.roadAddress ?? '주소 없음';

  return hasExtraQuestions ? (
    <JobApplyExtendedForm
      formFields={formFieldList}
      roadAddress={roadAddress}
      jobPostId={id}
      // location.state를 props로 전달
      isDraft={location.state?.isDraft || false}
      draftData={location.state?.draftData || null}
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
