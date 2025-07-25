import React from 'react';

type NextButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

const NextButton = ({
  onClick,
  disabled,
  children,
  className,
}: NextButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`
      flex justify-center items-center
      w-[29.4rem] h-[4.5rem]
      py-[1.2rem] px-[7.8rem]
      rounded-[0.8rem]
      bg-[#08D485]
      text-black text-[1.6rem] font-semibold
      transition mt-[3.7rem]
      disabled:bg-[#DAF4EA] disabled:text-[#222] disabled:cursor-not-allowed
      ${className ?? ''}
    `}
  >
    {children}
  </button>
);

export default NextButton;
