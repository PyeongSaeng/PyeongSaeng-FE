import TwoButtonGroup from './TwoButtonGroup';

interface Props {
  onWrite: () => void;
  onAIWrite: () => void;
}

export default function SaveSubmitButtons({ onWrite, onAIWrite }: Props) {
  return (
    <TwoButtonGroup
      leftLabel="직접 작성"
      rightLabel="AI 자동작성"
      onLeftClick={onWrite}
      onRightClick={onAIWrite}
    />
  );
}
