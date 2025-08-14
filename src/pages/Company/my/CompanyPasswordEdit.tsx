import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import Topbar from '../../../shared/components/topbar/Topbar';
import axiosInstance from '../../../shared/apis/axiosInstance';
import { UpdateCompanyInfo } from '../types/companyInfo';

const CompanyPasswordEdit = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const isMatch = newPassword === confirmPassword;
  const isFilled =
    currentPassword.trim() && newPassword.trim() && confirmPassword.trim();
  const canSubmit = !!isFilled && isMatch && !submitting;

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;
    setSubmitting(true);

    try {
      const changes: UpdateCompanyInfo = {
        passwordChangeRequested: true,
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      };
      console.log(changes);

      await axiosInstance.patch('/api/companies/profile', changes);
      navigate('/company/password-edit/done');
    } catch (err) {
      console.error('비밀번호 변경 실패', err);
      const error = err as AxiosError<{ message?: string }>;
      if (error.response?.status === 400) {
        alert('현재 비밀번호가 올바르지 않습니다');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Topbar>
        <div className="flex flex-col items-center text-[16px]">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
            기업정보
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-[16px] pt-[24px] pb-[50px]">
              <span className="flex self-start text-[#747474]">
                비밀번호를 수정합니다
              </span>
              <input
                type="password"
                value={currentPassword}
                className="w-[294px] h-[45px] px-[8px] rounded-[8px] border-[1px] border-[#E1E1E1] placeholder:text-[#C2C2C2] focus:text-black focus:outline-black"
                placeholder="현재 비밀번호를 입력해주세요"
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              ></input>
              <input
                type="password"
                value={newPassword}
                className="w-[294px] h-[45px] px-[8px] rounded-[8px] border-[1px] border-[#E1E1E1] placeholder:text-[#C2C2C2] focus:text-black focus:outline-black"
                placeholder="새로운 비밀번호를 입력해주세요"
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              ></input>
              <div className="flex flex-col">
                <input
                  type="password"
                  value={confirmPassword}
                  className="w-[294px] h-[45px] px-[8px] rounded-[8px] border-[1px] border-[#E1E1E1] placeholder:text-[#C2C2C2] focus:text-black focus:outline-black"
                  placeholder="새로운 비밀번호를 다시 입력해주세요"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                ></input>
                <span
                  className={clsx(
                    isMatch ? 'text-white' : 'text-[#FF0004]',
                    'self-end text-[14px] py-[4px]'
                  )}
                >
                  비밀번호가 일치하지 않습니다
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-[293px] h-[45px] rounded-[8px] bg-[#0D29B7] text-white"
            >
              {submitting ? '저장 중...' : '저장'}
            </button>
          </form>
        </div>
      </Topbar>
    </div>
  );
};

export default CompanyPasswordEdit;
