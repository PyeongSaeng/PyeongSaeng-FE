import React from 'react';

interface FieldProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled = true,
}: FieldProps) {
  const textColor = disabled ? 'text-[#C2C2C2]' : 'text-black';

  return (
    <div className="w-full flex flex-row items-center gap-[12px]">
      <label className="w-[80px] text-[20px] text-[#414141] font-medium text-left">
        {label}
      </label>
      <input
        className={`w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center placeholder:text-[#c2c2c2] placeholder:text-[16px] ${textColor}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
