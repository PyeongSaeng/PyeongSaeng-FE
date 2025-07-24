// src/shared/components/TwoButtonGroup.tsx
import Button from './Button';

interface TwoButtonGroupProps {
  leftLabel: string;
  rightLabel: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  disabledRight?: boolean;
}

export default function TwoButtonGroup({
  leftLabel,
  rightLabel,
  onLeftClick,
  onRightClick,
  disabledRight = false,
}: TwoButtonGroupProps) {
  return (
    <div className="w-full flex gap-2">
      <Button
        onClick={onLeftClick}
        className="border border-[#08D485] bg-white text-[#414141]"
      >
        {leftLabel}
      </Button>
      <Button onClick={onRightClick} disabled={disabledRight}>
        {rightLabel}
      </Button>
    </div>
  );
}
