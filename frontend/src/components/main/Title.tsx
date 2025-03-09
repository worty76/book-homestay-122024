interface TitleProps {
  subtitle: string;
  title: string;
  subtitleColor: string;
  titleColor: string;
  opacity: string;
}

export function Title({
  subtitle,
  title,
  subtitleColor,
  titleColor,
  opacity,
}: TitleProps) {
  return (
    <div className="relative text-center">
      <h1
        className={`absolute inset-0 text-7xl leading-none font-pinyon top-[-35px] opacity-${opacity}`}
        style={{ color: subtitleColor }}
      >
        {subtitle}
      </h1>

      <h2
        className="relative text-4xl font-bold font-playfair"
        style={{ color: titleColor }}
      >
        {title}
      </h2>
    </div>
  );
}
