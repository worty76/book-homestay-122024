"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
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
import { motion } from "framer-motion";

interface RoomGalleryProps {
  images: string[];
  alt: string;
}

const RoomGallery = memo(({ images, alt }: RoomGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0] || "");
  const [open, setOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayPlugin, setAutoplayPlugin] = useState<AutoplayType | null>(
    null
  );

  // Use useMemo for any derived state
  const validImages = useMemo(
    () => images.filter((img) => img && typeof img === "string"),
    [images]
  );

  // Use useEffect to initialize with first valid image
  useEffect(() => {
    if (validImages.length > 0 && !mainImage) {
      setMainImage(validImages[0]);
    }
  }, [validImages, mainImage]);

  // Create autoplay plugin only when dialog opens
  useEffect(() => {
    if (open) {
      setAutoplayPlugin(
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
        })
      );
    } else {
      setAutoplayPlugin(null);
    }
  }, [open]);

  // Initialize carousel with correct index
  useEffect(() => {
    if (api && open) {
      api.scrollTo(fullscreenIndex);
    }
  }, [api, fullscreenIndex, open]);

  const handleThumbnailClick = useCallback((image: string) => {
    setMainImage(image);
  }, []);

  const openFullscreen = useCallback((index: number) => {
    setFullscreenIndex(index);
    setOpen(true);
  }, []);

  // Handle empty image array
  if (validImages.length === 0) {
    return (
      <div className="mb-8 sm:mb-12 relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <motion.div
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Image - Optimize aspect ratio for all devices */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden mb-2 sm:mb-4 cursor-pointer"
        onClick={() => openFullscreen(validImages.indexOf(mainImage))}
      >
        <Image
          src={mainImage}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={true}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/5 hover:bg-black/20 transition-colors duration-200">
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 text-black p-1.5 sm:p-2 rounded-full">
            <Expand className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </div>
        </div>
      </div>

      {/* Thumbnails - Optimize scrolling and sizing for all devices */}
      <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 sm:pb-3 scrollbar-thin scrollbar-thumb-[#5a8d69]/60 scrollbar-track-gray-100 snap-x">
        {validImages.map((image, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative min-w-[70px] sm:min-w-[80px] md:min-w-[100px] h-[50px] sm:h-[60px] md:h-[75px] rounded-md overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200 snap-start",
              mainImage === image
                ? "ring-2 ring-[#5a8d69] ring-offset-1 sm:ring-offset-2"
                : "opacity-70 hover:opacity-100"
            )}
            onClick={() => handleThumbnailClick(image)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 70px, (max-width: 768px) 80px, 100px"
              loading="lazy"
              quality={60}
            />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Gallery - Optimize for all devices */}
      <Dialog open={open} onOpenChange={setOpen}>
        <CustomDialogContent className="max-w-7xl w-[98%] sm:w-[95%] md:w-[90%] p-0 sm:p-1 bg-background/95 backdrop-blur-md">
          <button
            className="absolute right-2 top-2 md:right-4 md:top-4 z-50 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors p-1.5 sm:p-2"
            onClick={() => setOpen(false)}
            aria-label="Close gallery"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          <Carousel
            className="w-full max-h-[85vh] sm:max-h-[90vh]"
            opts={{
              align: "center",
              loop: true,
              containScroll: false,
            }}
            plugins={autoplayPlugin ? [autoplayPlugin] : undefined}
            setApi={setApi}
          >
            <CarouselContent>
              {validImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] lg:h-[75vh] w-full sm:w-[90%] mx-auto flex items-center justify-center">
                    <Image
                      src={image}
                      alt={`${alt} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      loading={index === fullscreenIndex ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 sm:left-2 md:left-4 bg-[#5a8d69]/90 hover:bg-[#5a8d69] text-white rounded-full transition-all shadow-md w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            <CarouselNext className="right-1 sm:right-2 md:right-4 bg-[#5a8d69]/90 hover:bg-[#5a8d69] text-white rounded-full transition-all shadow-md w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </Carousel>
        </CustomDialogContent>
      </Dialog>
    </motion.div>
  );
});

RoomGallery.displayName = "RoomGallery";
export default RoomGallery;
