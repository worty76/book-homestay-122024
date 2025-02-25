interface TitleProps {
  subtitle: string;
  title: string;
}

export function Title({ subtitle, title }: TitleProps) {
  return (
    <div className="relative text-center">
      <h1 className="absolute inset-0 text-7xl text-[#5d8b3f] leading-none font-pinyon top-[-35px] opacity-25">
        {subtitle}
      </h1>

      <h2 className="relative text-4xl font-bold font-playfair text-[#9c6b4a]">
        {title}
      </h2>
    </div>
  );
}
