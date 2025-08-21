import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { RepostJob } from '../types/companyInfo';
import axiosInstance from '../../../shared/apis/axiosInstance';

type Field = {
  fieldName: string;
  fieldType: string;
};

type ContextType = {
  jobData: RepostJob;
  setJobData: React.Dispatch<React.SetStateAction<RepostJob>>;
};

const RepostStep2 = () => {
  const { jobData, setJobData } = useOutletContext<ContextType>();

  const navigate = useNavigate();
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const [inputValue, setInputValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [fieldType, setFieldType] = useState<string>('');
  const [fieldError, setFieldError] = useState<string>('');

  // 필드 추가
  const handleAddField = (field: Field) => {
    const isFieldNameExist = jobData.formFieldList.find(
      (e) => e.fieldName === field.fieldName
    );

    if (isFieldNameExist) {
      setFieldError('이미 존재하는 라벨입니다.');
    } else {
      const newFormFieldList = [...jobData.formFieldList, field];
      setJobData((prev: any) =>
        prev
          ? { ...prev, formFieldList: newFormFieldList }
          : { ...jobData, formFieldList: newFormFieldList }
      );
      setFieldType('');
      setInputValue('');
    }
  };

  // 필드 제거
  const handleRemove = (fieldName: string) => {
    const newFormFieldList = jobData.formFieldList.filter(
      (e) => e.fieldName !== fieldName
    );
    setJobData((prev) =>
      prev
        ? { ...prev, formFieldList: newFormFieldList }
        : { ...jobData, formFieldList: newFormFieldList }
    );
  };

  // 제출
  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/api/job/posts/${jobPostId}`, jobData);
      navigate('/company/jobs/repost');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (inputValue !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValue]);

  return (
    <div>
      <div className="w-full h-full flex flex-col">
        <div className="mx-[17px] mt-[2px]">
          {jobData.formFieldList.length > 0 &&
            jobData.formFieldList.map((e, i) => {
              return (
                <NewField
                  key={e.fieldName}
                  index={i + 1}
                  field={e}
                  remove={handleRemove}
                />
              );
            })}
          {fieldType ? (
            <div className="w-[301px] flex flex-col gap-[6px] mt-[12px]">
              <div className="flex items-center gap-[18px]">
                <span className="text-[24px] text-medium">
                  {jobData.formFieldList.length + 1}
                </span>
                <div className="w-[272.48px] flex gap-[8px]">
                  <input
                    type="text"
                    placeholder={clsx(
                      fieldType === 'image'
                        ? '사진 답변 항목을 적어주세요'
                        : '글자 답변 항목을 적어주세요'
                    )}
                    className="flex-1 px-[16px] h-[45px] border-[1px] border-[#c2c2c2] rounded-[8px] text-[#000000] placeholder:text-[#c2c2c2] text-[16px] text-medium focus:outline-black"
                    value={inputValue}
                    onChange={(e) => {
                      const newInputValue = e.target.value;
                      if (
                        newInputValue.length > 0 &&
                        newInputValue[0] === ' '
                      ) {
                        toast.warning('맨 앞 공백은 입력할 수 없습니다');
                        return;
                      }
                      setInputValue(newInputValue);
                    }}
                  />
                  <button
                    type="button"
                    className={clsx(
                      isDisabled
                        ? 'bg-gray-200 text-gray-500 !cursor-not-allowed'
                        : 'bg-[#0D29B7] text-white',
                      'w-[50px] h-[45px] rounded-[8px] text-[14px]'
                    )}
                    onClick={() => {
                      const ob: Field = {
                        fieldName: inputValue.trim(),
                        fieldType: fieldType.toUpperCase(),
                      };
                      handleAddField(ob);
                    }}
                    disabled={isDisabled}
                  >
                    추가
                  </button>
                </div>
              </div>
              <p className="text-[12px] text-end text-red-500">{fieldError}</p>
            </div>
          ) : undefined}
        </div>
        <div className="mt-[35px] flex gap-[13px]">
          <button
            type="button"
            className="flex-1 w-[144px] h-[45px] border border-[#0D29B7] text-[#000000] rounded-[8px] text-[16px] font-medium"
            onClick={() => setFieldType('text')}
          >
            글자 답변 항목 추가
          </button>
          <button
            type="button"
            className="flex-1 w-[144px] h-[45px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium"
            onClick={() => setFieldType('image')}
          >
            사진 답변 항목 추가
          </button>
        </div>
        <div className="mt-[35px] flex gap-[13px]">
          <button
            type="button"
            className="flex-1 w-[144px] h-[45px] border border-[#0D29B7] text-[#000000] rounded-[8px] text-[16px] font-medium"
            onClick={() => navigate(`/company/jobs/repost/${jobPostId}/step1`)}
          >
            이전 단계로
          </button>
          <button
            type="button"
            className="flex-1 w-[144px] h-[45px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium"
            onClick={handleSubmit}
          >
            신청서 올리기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepostStep2;

interface NewFieldProps {
  index: number;
  field: Field;
  remove: (label: string) => void;
}

const NewField = ({ index, field, remove }: NewFieldProps) => {
  return (
    <div className="flex items-center gap-[22px] mt-[21px]">
      <span className="text-[24px] text-[#414141] w-6">{index}</span>
      <span className="text-[24px] text-[#414141] flex-1">
        {field.fieldName}
      </span>
      <IoClose size={27} onClick={() => remove(field.fieldName)} />
    </div>
  );
};
