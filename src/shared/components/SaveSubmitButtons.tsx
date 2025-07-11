interface SaveSubmitButtonsProps {
  onSave: () => void;
  onSubmit: () => void;
}

const SaveSubmitButtons = ({ onSave, onSubmit }: SaveSubmitButtonsProps) => {
  return (
    <div className="w-full max-w-[320px] flex gap-4 justify-start">
      <button
        onClick={onSave}
        className="flex-1 h-12 border border-[#08D485] rounded-[8px] text-black text-[16px] font-semibold"
      >
        저장
      </button>
      <button
        onClick={onSubmit}
        className="flex-1 h-12 bg-[#08D485] rounded-[8px] text-black text-[16px] font-semibold"
      >
        제출
      </button>
    </div>
  );
};

export default SaveSubmitButtons;
