import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface OptionButtonProps {
  children?: ReactNode;
  clicked: boolean;
  onClick?: () => void;
}

const OptionButton = ({ children, clicked, onClick }: OptionButtonProps) => {
  return (
    <button
      className={clsx(
        clicked ? 'bg-[#ECF6F2]' : 'bg-white',
        'w-[294px] h-[45px] rounded-[8px] py-[12px] border-[1.3px] border-[#08D485] hover:bg-[#ECF6F2] active:bg-[#ECF6F2]'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OptionButton;
