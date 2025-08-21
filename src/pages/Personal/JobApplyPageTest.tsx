import { useParams } from 'react-router-dom';
import { useFormFields } from './hooks/useFormField';
import JobApplyExtendedForm from './JobApplyExtendedForm';
import JobApplyDefaultForm from './JobApplyDefaultForm';

const JobApplyPageTest = () => {
  const { jobId } = useParams();
  const id = Number(jobId);

  const { data, isLoading, isError } = useFormFields(id);

  if (isLoading) return <div className="p-4">로딩 중입니다...</div>;
  if (isError || !data) return <div className="p-4">에러가 발생했습니다.</div>;

  const formFieldList = data.formFieldList;
  const hasExtraQuestions = formFieldList.length > 4;

  return (
    <>
      {hasExtraQuestions ? (
        <JobApplyExtendedForm formFields={formFieldList} />
      ) : (
        <JobApplyDefaultForm formFields={formFieldList} />
      )}
    </>
  );
};

export default JobApplyPageTest;
