import React from 'react';

type NextButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  compact?: boolean;
  fullWidth?: boolean;
};

const NextButton = ({
  children,
  className = '',
  type = 'button',
  loading = false,
  compact = false,
  fullWidth = true,
  disabled,
  ...rest
}: NextButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        'flex justify-center items-center',
        fullWidth ? 'w-full max-w-[320px]' : 'w-[29.4rem]',
        'h-[4.5rem] rounded-[0.8rem] bg-[#08D485] text-white text-[1.6rem] font-semibold transition',
        compact ? 'mt-3' : 'mt-6',
        'disabled:bg-[#DAF4EA] disabled:text-[#222] disabled:cursor-not-allowed',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? '처리 중...' : children}
    </button>
  );
};

export default NextButton;
