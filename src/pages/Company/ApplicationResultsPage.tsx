import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';

const applicationMap: Record<string, any> = {
  '101': {
    name: '김영희',
    title: '근무지 + 근무 내용',
    age: '66',
    gender: '여',
    phone: '010-OOOO-OOOO',
    address: '수지구 대지로 49 203동 105호',
    experience: '주부/10년 이상',
    status: '마감',
    result: '',
  },
  '102': {
    name: '이말덕',
    title: '죽전도서관 사서 업무',
    age: '72',
    gender: '여',
    phone: '010-OOOO-OOOO',
    address: '죽전로 22 101동 202호',
    experience: '요양보호사/5년',
    status: '진행중',
    result: '',
  },
};

export default function ApplicationResultsPage() {
  const { applicationId } = useParams();
  const info = applicationMap[applicationId ?? ''] ?? {};

  const [result, setResult] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    if (result.trim()) setIsPublished(true);
  };

  return (
    <div className="pt-[10px] h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />

      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 py-10">
        {/* 상단 제목 */}
        <PageHeader title="받은 신청서" />

        {/* 리스트 타이틀 */}
        <PageHeader title={`${info.name} 님 신청서`} />
      </div>

      {/* 스크롤 가능한 본문 */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="w-full max-w-[320px] mx-auto space-y-4">
          <Field label="연세" value={info.age} />
          <Field label="성별" value={info.gender} />
          <Field label="전화번호" value={info.phone} />
          <Field label="거주지" value={info.address} />
          <Field label="경력" value={info.experience} />
          <Field label="상태" value={info.status} />
          <Field
            label="합불"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="여기에 입력하세요"
            disabled={isPublished}
          />
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="px-4 pb-4">
        <button
          onClick={handlePublish}
          disabled={isPublished}
          className={`w-full h-[52px] rounded-[10px] text-white text-[16px] font-semibold ${
            isPublished ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#0D29B7]'
          }`}
        >
          {isPublished ? '공시 완료' : '합불 결과 공시'}
        </button>

        {isPublished && (
          <p className="text-[13px] text-[#7F7F7F] mt-2">
            공시 후에는 결과를 수정할 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled = true,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-[14px] font-semibold">{label}</label>
      <input
        className="w-full border border-gray-300 rounded px-4 py-2 text-[14px]"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
