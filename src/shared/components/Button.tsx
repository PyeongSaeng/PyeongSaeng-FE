// src/shared/components/Button.tsx
import { clsx } from 'clsx';
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  disabled = false,
  className = '',
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full h-18 py-3 rounded-[8px] text-[16px] font-semibold',
        disabled
          ? 'bg-gray-300 text-white cursor-not-allowed'
          : 'bg-[#08D485] text-black',
        className
      )}
    >
      {children}
    </button>
  );
}
