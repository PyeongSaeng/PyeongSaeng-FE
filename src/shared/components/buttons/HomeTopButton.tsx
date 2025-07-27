import { ReactNode } from 'react';

interface HomeTopButtonProps {
  children: ReactNode;
  bgColor: 'green' | 'blue';
  textColor: 'white' | 'black';
}

const bgColorMap = {
  green: 'bg-[#08D485]',
  blue: 'bg-[#0D29B7]',
} as const;

const textColorMap = {
  white: 'text-white',
  black: 'text-black',
} as const;

const HomeTopButton = ({
  children,
  bgColor,
  textColor,
}: HomeTopButtonProps) => {
  return (
    <button
      className={`w-[102px] h-[65px] rounded-[8px] px-[12px] py-[22px] font-[500] text-[16px] ${bgColorMap[bgColor]} ${textColorMap[textColor]}`}
    >
      {children}
    </button>
  );
};

export default HomeTopButton;
