import Topbar from "../../shared/components/topbar/Topbar";
import { FormField } from "./types/jobs";

type Props = {
    formFields: FormField[];
    roadAddress: string;
};

const JobApplyExtendedForm = ({ formFields }: Props) => {
    return (
        <Topbar>
            <div>
                <h2>추가 질문 포함 신청서</h2>
                {formFields.map((field) => (
                    <div key={field.id}>
                        <label>{field.fieldName}</label>
                        {field.fieldType === 'TEXT' && <input type="text" className="border p-1" />}
                        {field.fieldType === 'IMAGE' && <input type="file" />}
                        {/* CHOICE 타입 등은 나중에 확장 가능 */}
                    </div>
                ))}
            </div>
        </Topbar>
    );
};

export default JobApplyExtendedForm;
