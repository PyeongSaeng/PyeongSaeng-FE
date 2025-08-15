import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import { useApplication } from './hooks/useApplication';
import { useApplicationJobs } from './hooks/useApplicationJob';
import { useProtectorApplications } from './hooks/useProtectorApplication';
import { JobDetail } from './types/jobs';

type ApplicationUI = {
  applicationId: number;
  jobPostId: number;
  applicationStatus: string;
  seniorName?: string;
};

const JobDraftsPage = () => {
  const memberType = localStorage.getItem('userRole');
  return (
    <>
      <Topbar />
      {memberType === 'PROTECTOR' ? <ProtectorDraftsView /> : <SeniorDraftsView />}
    </>
  );
};
export default JobDraftsPage;

// --------------------- 시니어 신청함 ---------------------
function SeniorDraftsView() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<0 | 1>(0);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const { useGetMyApplications, useDeleteApplication } = useApplication();
  const { data: applications = [], isLoading } = useGetMyApplications();
  const { mutate: deleteApplication } = useDeleteApplication();

  const draftApps = applications.filter((a) => a.applicationStatus === 'NON_STARTED');
  const writingApps = applications.filter((a) => a.applicationStatus === 'DRAFT');
  const selectedApps = selectedTab === 0 ? draftApps : writingApps;

  const jobPostIds = selectedApps.map((a) => a.jobPostId);
  const jobResults = useApplicationJobs(jobPostIds);

  const appJobPairs = selectedApps.map((application, idx) => ({
    application: {
      applicationId: application.applicationId,
      jobPostId: application.jobPostId,
      applicationStatus: application.applicationStatus,
    },
    job: jobResults[idx]?.data,
  }));

  const handleGoApply = () => {
    const selected = selectedApps.find((app) => app.applicationId === selectedAppId);
    if (!selected) return;
    navigate(`/personal/jobs/recommend/${selected.jobPostId}/apply`);
  };

  const handleDelete = (applicationId: number) => {
    deleteApplication(applicationId);
  };

  return (
    <JobDraftLayout
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      appJobPairs={appJobPairs}
      selectedAppId={selectedAppId}
      setSelectedAppId={setSelectedAppId}
      isLoading={isLoading}
      onDelete={handleDelete}
      onApply={handleGoApply}
    />
  );
}

// --------------------- 보호자 신청함 ---------------------
function ProtectorDraftsView() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<0 | 1>(0);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const { data: applications = [], isLoading } = useProtectorApplications();

  const draftApps = applications.filter((a) => a.applicationStatus === 'NON_STARTED');
  const writingApps = applications.filter((a) => a.applicationStatus === 'DRAFT');
  const selectedApps = selectedTab === 0 ? draftApps : writingApps;

  const jobPostIds = selectedApps.map((a) => a.jobPostId);
  const jobResults = useApplicationJobs(jobPostIds);

  const appJobPairs = selectedApps.map((application, idx) => ({
    application: {
      applicationId: application.applicationId,
      jobPostId: application.jobPostId,
      applicationStatus: application.applicationStatus,
      seniorName: application.seniorName,
    },
    job: jobResults[idx]?.data,
  }));

  const handleGoApply = () => {
    const selected = selectedApps.find((app) => app.applicationId === selectedAppId);
    if (!selected) return;
    navigate(`/personal/jobs/recommend/${selected.jobPostId}/apply?seniorId=${selected.seniorId}`);
  };

  return (
    <JobDraftLayout
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      appJobPairs={appJobPairs}
      selectedAppId={selectedAppId}
      setSelectedAppId={setSelectedAppId}
      isLoading={isLoading}
      onApply={handleGoApply}
    />
  );
}

// --------------------- 공통 UI ---------------------
type JobDraftLayoutProps = {
  selectedTab: 0 | 1;
  setSelectedTab: (tab: 0 | 1) => void;
  appJobPairs: {
    application: ApplicationUI;
    job?: JobDetail;
  }[];
  selectedAppId: number | null;
  setSelectedAppId: (id: number | null) => void;
  isLoading: boolean;
  onDelete?: (applicationId: number) => void;
  onApply: () => void;
};

function JobDraftLayout({
  selectedTab,
  setSelectedTab,
  appJobPairs,
  selectedAppId,
  setSelectedAppId,
  isLoading,
  onDelete,
  onApply,
}: JobDraftLayoutProps) {
  const selectedApplication = appJobPairs.find(
    (pair) => pair.application.applicationId === selectedAppId
  )?.application;
  const memberType = localStorage.getItem('userRole');
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-[17px] flex flex-col items-center">
        <p className="text-[20px] font-semibold text-[#747474]">일자리 신청함</p>
        {selectedApplication?.seniorName && (
          <p className="mt-[6px] text-[16px] font-semibold text-[#08D485]">
            {selectedApplication.seniorName}님
          </p>
        )}
      </div>
      {/* 탭 버튼 */}
      <div className="w-[301px] flex gap-[13px] mt-[16px] justify-center self-center">
        {['작성 전', '작성중'].map((label, idx) => (
          <button
            key={label}
            className={`flex-1 h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
              ${selectedTab === idx ? 'bg-[#ECF6F2] border-[#08D485]' : 'bg-white border-[#08D485]'}`}
            onClick={() => {
              setSelectedTab(idx as 0 | 1);
              setSelectedAppId(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {/* 리스트 */}
      <div className="flex-1 w-full flex justify-center" style={{ minHeight: 0 }}>
        <div
          className="w-[291px] flex flex-col items-center overflow-y-auto mt-[22px] space-y-9 scrollbar-hide"
          style={{ maxHeight: '400px' }}
        >
          {isLoading ? (
            <p className="text-[#747474] text-[16px]">불러오는 중...</p>
          ) : appJobPairs.length === 0 ? (
            <p className="text-[#747474] text-[16px]">
              {selectedTab === 0
                ? '작성 전인 신청서가 없습니다.'
                : '작성 중인 신청서가 없습니다.'}
            </p>
          ) : (
            appJobPairs.map(({ application, job }) => {
              if (!job) return null;
              const isSelected = selectedAppId === application.applicationId;
              {/* 선택 및 삭제 */ }
              return (
                <div key={application.applicationId} className="flex flex-col items-start relative">
                  <div className="flex items-center gap-[6px]">
                    <div
                      className="w-[27px] h-[27px] rounded-full border-2 border-[#08D485] bg-white flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        setSelectedAppId(isSelected ? null : application.applicationId)
                      }
                    >
                      {isSelected && (
                        <div className="w-[15px] h-[15px] rounded-full bg-[#08D485]" />
                      )}
                    </div>
                    <div
                      className="w-[56px] h-[19px] flex items-center justify-center text-[16px] text-[#747474] font-medium cursor-pointer"
                      onClick={() =>
                        setSelectedAppId(isSelected ? null : application.applicationId)
                      }
                    >
                      선택하기
                    </div>
                    {!!onDelete && (
                      <img
                        src="/icons/close_icon.svg"
                        alt="취소"
                        className="w-[27px] h-[27px] cursor-pointer absolute right-0 top-0 z-10"
                        onClick={() => onDelete(application.applicationId)}
                      />
                    )}
                  </div>
                  {/* 시니어 성함 */}
                  {memberType === 'PROTECTOR' && application.seniorName && (
                    <p className="mt-[4px] ml-[33px] text-[14px] font-semibold text-[#08D485]">
                      {application.seniorName}님
                    </p>
                  )}
                  {/* 카드 */}
                  <div
                    className={`w-[291px] h-[362px] mt-[11px] rounded-[10px] overflow-hidden border-[1.3px] flex flex-col items-center
                      ${isSelected ? 'border-[#08D485] bg-[#ECF6F2]' : 'border-[#08D485] bg-white'}`}
                    onClick={() =>
                      setSelectedAppId(isSelected ? null : application.applicationId)
                    }
                  >
                    <div className="w-[248px] h-[140px] mt-[30px] border-[1.1px] border-[#A4A4A4] rounded-[10px] overflow-hidden">
                      <img
                        src={job.images?.[0]?.imageUrl}
                        alt={job.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[248px] h-[143px] mt-[18px] border-[1.1px] border-[#08D485] rounded-[13px] bg-white p-[10px]">
                      <p className="text-[13px] font-semibold text-[#414141] mb-[6px]">
                        {job.title}
                      </p>
                      <p className="text-[11px] font-normal text-[#414141]">
                        거리: {job.travelTime}, 시급:{' '}
                        {job.hourlyWage?.toLocaleString()}원, 근무시간:{' '}
                        {job.workingTime}, 월급:{' '}
                        {job.monthlySalary?.toLocaleString()}원
                      </p>
                      {application.seniorName && (
                        <p className="text-[11px] mt-1 font-semibold text-[#747474]">
                          신청자: {application.seniorName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="w-full flex justify-center mt-[24px] mb-4">
        <button
          className="w-[294px] h-[45px] rounded-[8px] text-[16px] font-semibold bg-[#08D485] text-black disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedAppId === null}
          onClick={onApply}
        >
          {selectedTab === 0 ? '신청서 작성하기' : '신청서 이어서 작성하기'}
        </button>
      </div>
    </div>
  );
}
