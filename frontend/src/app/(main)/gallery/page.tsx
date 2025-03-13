"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import AnotherHero from "@/components/main/AnotherHero";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Download, Heart, Plus, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

// Sample image data with local images from public/images directory
const generateImages = (startIndex: number, count: number) => {
  const categories = ["View bên ngoài", "View phòng"];
  const widths = [300, 350, 400, 450, 500];
  const heights = [200, 250, 300, 350, 400, 450, 500];

  // Local image filenames (these should exist in your public/images directory)
  const imageFilenames = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "view/1.png",
    "view/2.png",
    "view/3.png",
    "view/4.png",
    "view/5.png",
    "view/6.png",
    "view/7.png",
    "view/8.png",
    "view/9.png",
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startIndex + i;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const width = widths[Math.floor(Math.random() * widths.length)];
    const height = heights[Math.floor(Math.random() * heights.length)];
    const imageFilename = imageFilenames[id % imageFilenames.length];

    return {
      id,
      // Using local images from public/images directory
      url: `/images/${imageFilename}`,
      alt: `Image ${id}`,
      width,
      height,
      category,
      photographer: `Photographer ${(id % 10) + 1}`,
    };
  });
};

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tất cả ảnh");

  const categories = ["View bên ngoài", "View phòng"];

  // Infinite scroll setup
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Load initial images
  useEffect(() => {
    setImages(generateImages(0, 20));
  }, []);

  // Load more images when scrolling to the bottom
  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreImages();
    }
  }, [inView]);

  const loadMoreImages = useCallback(() => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newImages = generateImages(images.length, 10);
      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  }, [images.length, isLoading]);

  // Filter images based on search query and category
  const filteredImages = images.filter((image) => {
    const matchesSearch =
      searchQuery === "" ||
      image.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.photographer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "Tất cả ảnh" || image.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Image click handler
  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnotherHero
        title="Image Gallery"
        description="Explore our collection of beautiful images"
      />

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "rounded-full text-sm capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden mb-4"
                onClick={() => handleImageClick(image)}
              >
                <div className="relative">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto object-cover rounded-xl"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhwAAAABJRU5ErkJggg=="
                    priority={index < 4}
                    // Remove the unoptimized prop as we're using local images now
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full w-9 h-9 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full w-9 h-9 bg-white/80 hover:bg-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full w-9 h-9 bg-white/80 hover:bg-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="font-medium text-sm">{image.photographer}</p>
                  <p className="text-xs text-gray-300 capitalize">
                    {image.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Loading indicator and infinite scroll trigger */}
        <div ref={ref} className="flex justify-center mt-8 py-8">
          {isLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-gray-500">
                Loading more images...
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 hover:bg-black/70"
                onClick={closeModal}
              >
                <X className="h-5 w-5 text-white" />
              </Button>

              <Image
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h3 className="text-xl font-medium">
                  {selectedImage.photographer}
                </h3>
                <p className="text-sm text-gray-300 capitalize">
                  {selectedImage.category}
                </p>

                <div className="flex gap-3 mt-4">
                  <Button variant="default" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent border-white/30 text-white hover:bg-white/20"
                  >
                    <Heart className="h-4 w-4" />
                    Like
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
