import { MouseEventHandler, ReactNode } from 'react';

interface HomeTopButtonProps {
  children: ReactNode;
  bgColor: 'green' | 'blue';
  textColor: 'white' | 'black';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const bgColorMap = {
  green: 'bg-[#08D485]',
  blue: 'bg-[#0D29B7]',
} as const;

const textColorMap = {
  white: 'text-white font-[500]',
  black: 'text-black font-[400]',
} as const;

const HomeTopButton = ({
  children,
  bgColor,
  textColor,
  ...rest
}: HomeTopButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center w-[102px] h-[65px] rounded-[8px] px-[12px] text-[16px] ${bgColorMap[bgColor]} ${textColorMap[textColor]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HomeTopButton;
