import { ReactNode } from 'react';

interface GreenButtonProps {
  children: ReactNode;
}

const GreenButton = ({ children }: GreenButtonProps) => {
  return (
    <button className="w-[294px] h-[45px] rounded-[8px] py-[12px] bg-[#08D485] text-black">
      {children}
    </button>
  );
};

export default GreenButton;
