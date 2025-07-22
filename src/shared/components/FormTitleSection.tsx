import { clsx } from 'clsx';

interface FormTitleSectionProps {
  title: string;
  description: string;
  className?: string;
}

export default function FormTitleSection({
  title,
  description,
  className,
}: FormTitleSectionProps) {
  return (
    <div className={clsx('mb-6 w-full text-left', className)}>
      <h2 className="text-[20px] font-semibold text-[#747474] mb-5 text-center">
        {title}
      </h2>
      <p className="text-[16px] font-semibold text-[#747474] leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
