/* eslint-disable @next/next/no-img-element */
"use client";
import Carousel from "./Carousel";
import Image from "next/image";

const slides = [
  "/images/carousel/image1.png",
  "/images/carousel/image19.png",
  "/images/carousel/image20.png",
];

export function Hero() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/Hero.png"
          alt="Luxury Room"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 py-12 md:py-20">
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 font-roboto">
          BOOK PHÒNG NGAY VỚI LUXSTAY
        </h1>
        <p className="text-3xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-8 text-primary font-roboto">
          Giảm ngay 1 triệu
        </p>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Carousel>
            {slides.map((s, index) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                src={s}
                key={index}
                alt={`Carousel image ${index + 1}`}
                width={500}
                height={300}
                objectFit="cover"
                layout="responsive"
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
