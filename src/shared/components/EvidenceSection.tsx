import TwoButtonGroup from './TwoButtonGroup';

interface Props {
  onSave: () => void;
  onSubmit: () => void;
}

export default function EvidenceSection({ onSave, onSubmit }: Props) {
  return (
    <div className="w-full flex flex-col items-start">
      <p>증빙자료 사진 첨부가 필요합니다.</p>
      <button className="w-full h-12 bg-[#08D485] rounded-[8px] text-white font-semibold mb-4">
        이미지를 첨부하세요
      </button>
      <TwoButtonGroup
        leftLabel="저장"
        rightLabel="제출"
        onLeftClick={onSave}
        onRightClick={onSubmit}
      />
    </div>
  );
}
