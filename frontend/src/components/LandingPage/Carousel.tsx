import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = React.useCallback(
    () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1)),
    [slides.length]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="relative flex items-center">
      <button
        onClick={prev}
        className="absolute left-[-20px] sm:left-[-34px] p-1 sm:p-2 text-gray-800 rounded-full shadow-md -translate-x-1/2 z-10"
      >
        <Image
          src="/icons/Prev.svg"
          width={24}
          height={24}
          alt="Previous"
          className="w-7 h-7 sm:w-9 sm:h-9"
        />
      </button>

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center p-1 sm:p-2"
            >
              <div className="border-2 border-[#0D0D0D] w-full">{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        className="absolute right-[-20px] sm:right-[-34px] p-1 sm:p-2 text-gray-800 rounded-full shadow-md translate-x-1/2 z-10"
      >
        <Image
          src="/icons/Next.svg"
          width={24}
          height={24}
          alt="Next"
          className="w-7 h-7 sm:w-9 sm:h-9"
        />
      </button>
    </div>
  );
};

export default Carousel;
