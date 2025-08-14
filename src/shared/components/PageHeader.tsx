type PageHeaderProps = {
  title: string;
  className?: string;
};

const PageHeader = ({ title, className }: PageHeaderProps) => (
  <>
    <h2
      className={`text-[2rem] font-semibold text-[#747474] text-center mb-4 ${className ?? ''}`}
    >
      {title}
    </h2>
    <div className="w-[320px] border-t border-[#d9d9d9] mb-[2rem]" />
  </>
);

export default PageHeader;
