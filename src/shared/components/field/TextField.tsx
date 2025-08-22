import { formatPhone } from '../../utils/userInfoUtils';

interface TextFieldProps {
  fieldName: string;
  answerContent: string;
}

const TextField = ({ fieldName, answerContent }: TextFieldProps) => {
  return (
    <div className="flex flex-col justify-around w-[297px] h-auto rounded-[13px] px-[16px] py-[10px] border-[1.3px] border-[#08D485]">
      <span className="text-[16px] font-[600] pb-[12px]">{fieldName}</span>
      <div className="flex justify-between">
        <span>
          {fieldName === '전화번호'
            ? formatPhone(answerContent)
            : answerContent}
        </span>
      </div>
    </div>
  );
};

export default TextField;
