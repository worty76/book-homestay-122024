"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Expand, X } from "lucide-react";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { CustomDialogContent, Dialog } from "../customDialog";

interface RoomGalleryProps {
  images: string[];
  alt: string;
}

export default function RoomGallery({ images, alt }: RoomGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [open, setOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayPlugin, setAutoplayPlugin] = useState<AutoplayType | null>(null);

  useEffect(() => {
    if (open) {
      setAutoplayPlugin(
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
        })
      );
    }
  }, [open]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setOpen(true);
  };

  return (
    <div className="mb-12">
      {/* Main Image - Improve mobile aspect ratio */}
      <div
        className="relative w-full aspect-[16/9] md:aspect-[16/9] rounded-lg overflow-hidden mb-4 cursor-pointer"
        onClick={() => openFullscreen(images.indexOf(mainImage))}
      >
        <Image
          src={mainImage}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors duration-200">
          <div className="absolute bottom-4 right-4 bg-white/90 text-black p-2 rounded-full">
            <Expand className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        </div>
      </div>

      {/* Thumbnails - Improve for mobile with better sizing */}
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin scrollbar-thumb-[#5a8d69] scrollbar-track-gray-200">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative min-w-[80px] md:min-w-[120px] h-[60px] md:h-[80px] rounded-md overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200",
              mainImage === image 
                ? "ring-2 ring-[#5a8d69] ring-offset-2" 
                : "opacity-80 hover:opacity-100"
            )}
            onClick={() => handleThumbnailClick(image)}
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 120px"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery - Improve controls for mobile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <CustomDialogContent className="max-w-7xl w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%] p-0 sm:p-1 bg-background/95 backdrop-blur-sm">
          <button
            className="absolute right-2 top-2 md:right-4 md:top-4 p-2 z-50 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <Carousel
            className="w-full max-h-[80vh]"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={autoplayPlugin ? [autoplayPlugin] : undefined}
            setApi={setApi}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full flex items-center justify-center">
                    <Image
                      src={image}
                      alt={`${alt} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 md:left-4 bg-[#5a8d69] rounded-full text-white hover:bg-[#5a8d69]/90 transition-colors w-8 h-8 md:w-10 md:h-10" />
            <CarouselNext className="right-1 md:right-4 bg-[#5a8d69] rounded-full text-white hover:bg-[#5a8d69]/90 transition-colors w-8 h-8 md:w-10 md:h-10" />
          </Carousel>
        </CustomDialogContent>
      </Dialog>
    </div>
  );
}
