type SignUpHeaderProps = {
  title: string;
  className?: string;
};

const SignUpHeader = ({ title, className }: SignUpHeaderProps) => (
  <>
    <h2
      className={`text-[2rem] font-semibold text-[#747474] text-center mb-4 mt-[148px] ${className ?? ''}`}
    >
      {title}
    </h2>
    <div className="w-[320px] border-t border-[#d9d9d9] mb-[4rem]" />
  </>
);

export default SignUpHeader;
