"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import AnotherHero from "@/components/main/AnotherHero";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, X, Download, Heart, Plus, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import AnotherHeader from "@/components/main/another-header";
import { useTranslation } from "@/hooks/useTranslation";

export default function GalleryPage() {
  const { t } = useTranslation();

  const generateImages = (startIndex: number, count: number) => {
    const categories = [
      t("gallery.categories.exterior"),
      t("gallery.categories.rooms"),
    ];
    const widths = [300, 350, 400, 450, 500];
    const heights = [200, 250, 300, 350, 400, 450, 500];

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
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const width = widths[Math.floor(Math.random() * widths.length)];
      const height = heights[Math.floor(Math.random() * heights.length)];
      const imageFilename = imageFilenames[id % imageFilenames.length];

      return {
        id,
        url: `/images/${imageFilename}`,
        alt: `Image ${id}`,
        width,
        height,
        category,
        photographer: `${t("gallery.photographer")} ${(id % 10) + 1}`,
      };
    });
  };

  const [images, setImages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(
    t("gallery.categories.all")
  );

  const categories = [
    t("gallery.categories.all"),
    t("gallery.categories.exterior"),
    t("gallery.categories.rooms"),
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    setImages(generateImages(0, 20));
  }, []);

  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreImages();
    }
  }, [inView]);

  const loadMoreImages = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const newImages = generateImages(images.length, 10);
      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  }, [images.length, isLoading]);

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      searchQuery === "" ||
      image.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.photographer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === t("gallery.categories.all") ||
      image.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnotherHeader
        title={t("gallery.title")}
        description={t("gallery.description")}
        finalPage={t("gallery.finalPage")}
      />

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "rounded-full text-sm capitalize ",
                activeCategory === category
                  ? "bg-[#8a9a5b] text-white"
                  : "hover:bg-[#8a9a5b]/90"
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
                  />
                </div>

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

        <div ref={ref} className="flex justify-center mt-8 py-8">
          {isLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-gray-500">
                {t("gallery.loadingMore")}
              </span>
            </div>
          )}
        </div>
      </section>

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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
