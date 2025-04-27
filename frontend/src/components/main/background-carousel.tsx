"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface BackgroundCarouselProps {
  videos: string[];
}

export function BackgroundCarousel({ videos }: BackgroundCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % videos.length);
    }, 10000); // Change slide every 10 seconds to allow more time for video viewing

    return () => clearInterval(timer);
  }, [videos.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const previousSlide = () => {
    setCurrentSlide((current) => (current - 1 + videos.length) % videos.length);
  };

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % videos.length);
  };

  return (
    <div className="absolute inset-0">
      {/* Carousel Videos */}
      {videos.map((videoUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-shadow duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            {/* <iframe
              src={videoUrl}
              // className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100vh",
                aspectRatio: "640 / 360",
              }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title={`Video ${index + 1}`}
            ></iframe> */}
            <iframe
              src={videoUrl}
              width="1920"
              height="1080"
              style={{
                height: "auto",
                width: "100%",
                aspectRatio: "16 / 9",
              }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title={`Video ${index + 1}`}
            ></iframe>
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
