interface TitleProps {
  subtitle: string;
  title: string;
  subtitleColor: string;
  titleColor: string;
  opacity?: string;
}

export function Title({
  subtitle,
  title,
  subtitleColor,
  titleColor,
  opacity = "70",
}: TitleProps) {
  return (
    <div className="relative text-center">
      <h1
        className={`absolute inset-0 text-8xl leading-none font-pinyon top-[-70px] opacity-70`}
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
