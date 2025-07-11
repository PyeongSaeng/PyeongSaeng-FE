import React from 'react';

type SignUpHeaderProps = {
  title: string;
  className?: string;
};

const SignUpHeader = ({ title, className }: SignUpHeaderProps) => (
  <>
    <h2
      className={`text-[2rem] font-semibold text-[#747474] text-center mb-4 ${className ?? ''}`}
    >
      {title}
    </h2>
    <div className="w-[320px] border-t border-gray-300 mb-[4.6rem]" />
  </>
);

export default SignUpHeader;
