interface Props {
  onBack: () => void;
}

export default function CompanyCreateFormPage({ onBack }: Props) {
  return (
    <div className="px-4">
      <h2 className="text-lg font-bold mb-4">추가 문항 입력</h2>
      {/* 여기에 문항 리스트, 입력창 등 추가 */}

      <button onClick={onBack} className="mt-4 text-gray-500 underline">
        돌아가기
      </button>
    </div>
  );
}
