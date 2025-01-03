/* eslint-disable @next/next/no-img-element */
"use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
import Carousel from "./Carousel";

const slides = [
  "/images/carousel/image1.png",
  "/images/carousel/image19.png",
  "/images/carousel/image20.png",
];

export function Hero() {
  // const [currentImage, setCurrentImage] = useState(0);

  // const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  // const prevImage = () =>
  //   setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="/images/Hero.png"
          alt="Luxury Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4 font-roboto">
          BOOK PHÒNG NGAY VỚI LUXSTAY
        </h1>
        <p className="text-5xl font-bold mb-8 text-primary font-roboto">
          Giảm ngay 1 triệu
        </p>
        <div className="max-w-lg">
          <Carousel>
            {slides.map((s, index) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={s} key={index} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
