interface FormTitleSectionProps {
  title: string;
  description: string;
}

export default function FormTitleSection({
  title,
  description,
}: FormTitleSectionProps) {
  return (
    <div className="mb-6 w-full text-left">
      <h2 className="text-[20px] font-semibold text-[#747474] mb-2 text-center">
        {title}
      </h2>
      <p className="text-[14px]font-semibold text-[#747474] leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
