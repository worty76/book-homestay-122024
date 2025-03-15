"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

interface RoomGalleryProps {
  images: string[];
  alt: string;
}

export default function RoomGallery({ images, alt }: RoomGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [open, setOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setOpen(true);
  };

  return (
    <div className="mb-12">
      {/* Main Image */}
      <div
        className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 cursor-pointer"
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
            <Expand className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-[4/3] rounded-md overflow-hidden cursor-pointer",
              mainImage === image && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => handleThumbnailClick(image)}
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl w-11/12 p-1 bg-background/95 backdrop-blur-sm">
          <button
            className="absolute right-4 top-4 p-2 z-50 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

          <Carousel
            className="w-full max-h-[80vh]"
            defaultActive={fullscreenIndex}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[80vh] w-full flex items-center justify-center">
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
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
