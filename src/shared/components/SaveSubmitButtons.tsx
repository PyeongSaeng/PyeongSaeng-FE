import TwoButtonGroup from './TwoButtonGroup';

interface Props {
  onSave: () => void;
  onSubmit: () => void;
}

export default function SaveSubmitButtons({ onSave, onSubmit }: Props) {
  return (
    <TwoButtonGroup
      leftLabel="저장"
      rightLabel="제출"
      onLeftClick={onSave}
      onRightClick={onSubmit}
    />
  );
}
