import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useJobDetail } from './hooks/useDetail';
import { useFormFields } from './hooks/useFormField';
import JobApplyExtendedForm from './JobApplyExtendedForm';
import JobApplyDefaultForm from './JobApplyDefaultForm';

const JobApplyPageTest = () => {
  const { jobId } = useParams();
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

  useEffect(() => {
    console.log('✅ jobId:', jobId, 'parsed:', id);
    console.log('📦 formData raw:', formData);
    console.log('📦 jobDetail raw:', jobDetail);
    console.error('❌ formError:', isErrorForm);
    console.error('❌ detailError:', isErrorDetail);
  }, [jobId, id, formData, jobDetail, isErrorForm, isErrorDetail]);

  if (isLoadingForm || isLoadingDetail) return <div>로딩 중...</div>;

  console.log('formData:', formData);
  console.log('jobDetail:', jobDetail);
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
