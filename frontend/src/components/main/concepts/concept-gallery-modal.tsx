"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Grid, X, Images } from "lucide-react";

interface ConceptGalleryModalProps {
  images: string[];
  conceptName: string;
  trigger: React.ReactNode;
}

export default function ConceptGalleryModal({
  images,
  conceptName,
  trigger,
}: ConceptGalleryModalProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"grid" | "carousel">("grid");
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle image click in grid view to open carousel
  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setView("carousel");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Hình ảnh Concept {conceptName}
          </h2>

          <div className="flex items-center gap-2">
            {/* View toggle button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView(view === "grid" ? "carousel" : "grid")}
            >
              {view === "grid" ? (
                <Images className="h-4 w-4" />
              ) : (
                <Grid className="h-4 w-4" />
              )}
            </Button>

            {/* Close button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-[calc(90vh-8rem)]">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt={`${conceptName} - Hình ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Carousel view */}
        {view === "carousel" && (
          <div className="h-[calc(90vh-8rem)] flex items-center justify-center">
            <Carousel className="w-full max-h-full" defaultActive={activeIndex}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[calc(90vh-12rem)] w-full flex items-center justify-center">
                      <Image
                        src={image}
                        alt={`${conceptName} - Hình ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="95vw"
                        priority={index === activeIndex}
                      />
                    </div>
                    <p className="text-center mt-2 text-sm text-muted-foreground">
                      {index + 1} / {images.length}
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
