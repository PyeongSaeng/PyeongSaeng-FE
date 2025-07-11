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
  disabledRight,
}: TwoButtonGroupProps) {
  return (
    <div className="w-full flex gap-2">
      <button
        onClick={onLeftClick}
        className="w-full border border-[#08D485] rounded-[8px] py-3 text-[16px] font-semibold text-[#414141]"
      >
        {leftLabel}
      </button>
      <button
        onClick={onRightClick}
        disabled={disabledRight}
        className={`w-full rounded-[8px] py-3 text-[16px] font-Medium ${
          disabledRight ? 'bg-gray-300 text-white' : 'bg-[#08D485] text-black'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}
