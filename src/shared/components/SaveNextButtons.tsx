import TwoButtonGroup from './TwoButtonGroup';

interface Props {
  onSave: () => void;
  onNext: () => void;
}

export default function SaveSubmitButtons({ onSave, onNext }: Props) {
  return (
    <TwoButtonGroup
      leftLabel="저장"
      rightLabel="다음"
      onLeftClick={onSave}
      onRightClick={onNext}
    />
  );
}
