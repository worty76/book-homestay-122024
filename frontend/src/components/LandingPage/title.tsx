interface LuxuryTitleProps {
  subtitle: string;
  title: string;
}

export function Title({ subtitle, title }: LuxuryTitleProps) {
  return (
    <div className="relative text-center">
      <h1 className="absolute inset-0 text-8xl text-[#A2AAB1] leading-none font-pinyon top-[-55px]">
        {subtitle}
      </h1>

      <h2 className="relative text-4xl font-bold font-playfair text-[#F1F3F4]">
        {title}
      </h2>
    </div>
  );
}
