import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';

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
          <h2 className="text-[16px] font-bold border-b w-full pb-2 mb-4">
            받은 신청서
          </h2>

          <ul className="w-full space-y-4">
            {mockApplications.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border border-[#E0E0E0] rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/company/applications/${item.id}`)}
              >
                <span className="text-[15px] text-[#333]">{item.title}</span>
                <span className="text-[20px] text-[#333]">{'>'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
