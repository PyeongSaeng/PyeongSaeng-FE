import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';

import { applicationGroups } from '../../shared/constants/applicationData';

export default function ApplicationsPage() {
  const navigate = useNavigate();

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />

      <div className="flex justify-center overflow-y-auto flex-1 pb-6">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
          {/* 제목 */}
          <PageHeader title="받은 신청서" />

          {/* 신청서 리스트 */}
          <ul className="w-full space-y-6">
            {applicationGroups.map((group) => (
              <li
                key={group.title}
                className="w-full cursor-pointer"
                onClick={() =>
                  navigate(
                    `/company/jobs/applications/${encodeURIComponent(group.title)}`
                  )
                }
              >
                <div className="flex items-center">
                  <span className="text-[16px] text-black font-normal">
                    {group.title}
                  </span>
                  <FiChevronRight className="text-[20px] text-black ml-[12px]" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
