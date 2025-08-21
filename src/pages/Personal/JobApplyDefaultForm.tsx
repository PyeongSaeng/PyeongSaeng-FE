import { FormField } from "./types/jobs";

type Props = {
  formFields: FormField[];
};

const JobApplyDefaultForm = ({ formFields }: Props) => {
  return (
    <div>
      <h2>기본 질문 신청서</h2>
      {formFields.map((field) => (
        <div key={field.id}>
          <label>{field.fieldName}</label>
          {/* type에 따라 컴포넌트 다르게 렌더링 가능 */}
          <input type="text" className="border p-1" />
        </div>
      ))}
    </div>
  );
};

export default JobApplyDefaultForm;
