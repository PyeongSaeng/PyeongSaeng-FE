import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';

interface ApplicationSummary {
  id: number;
  title: string;
}

const mockApplications: ApplicationSummary[] = [
  {
    id: 101,
    title: '근무지 + 근무 내용',
  },
  {
    id: 102,
    title: '죽전도서관 사서 업무',
  },
];

export default function ApplicationsPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-[10px] h-[740px] flex flex-col">
      <Topbar />
      <div className="flex justify-center overflow-y-auto flex-1 pb-6">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
          {/* 제목 */}
          <PageHeader title="받은 신청서" />

          {/* 신청서 리스트 */}
          <ul className="w-full space-y-6">
            {mockApplications.map((item) => (
              <li
                key={item.id}
                className="w-full cursor-pointer"
                onClick={() =>
                  navigate(`/company/jobs/applications/${item.id}`)
                }
              >
                <div className="flex items-center">
                  <span className="text-[16px] text-black font-normal">
                    {item.title}
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
