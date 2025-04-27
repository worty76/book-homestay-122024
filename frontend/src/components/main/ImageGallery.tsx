"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        {title && (
          <h4 className="text-lg font-medium mb-4 text-[#0a3b33]">{title}</h4>
        )}

        <div className="relative w-full px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselPrevious className="relative left-[-15px] w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md " />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselNext className="relative right-[-15px] w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md " />
            </div>
          </Carousel>
        </div>
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected image"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
