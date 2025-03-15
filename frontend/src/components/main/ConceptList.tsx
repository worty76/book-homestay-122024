"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

const apartmentImages = [
  {
    id: 1,
    src: "/images/bien.jpg",
    name: "Biển",
    alt: "Modern living room with orange sofa and plants",
  },
  {
    id: 2,
    src: "/images/nui.jpg",
    name: "Núi",
    alt: "Cozy living room with orange sectional sofa",
  },
  {
    id: 3,
    src: "/images/langtruyenthong.jpg",
    name: "làng truyền thống",
    alt: "Elegant living room with peach accent chair",
  },
  {
    id: 4,
    src: "/images/langque.jpg",
    name: "làng quê",
    alt: "Contemporary apartment bedroom",
  },
  {
    id: 5,
    src: "/images/caurong.jpg",
    name: "Kiến trúc cầu Đà Nẵng hiện đại",
    alt: "Modern kitchen with wooden accents",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ApartmentTestimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="conceptlist" className="py-16 md:py-24 bg-[#5a8d69]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 relative">
          <motion.div
            className="lg:w-[50%] xl:w-1/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
          >
            <div className="bg-[#2d4a3e] text-white p-8 md:p-8 rounded-3xl h-full flex flex-col xl:h-[380px]">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight md:leading-[48px] xl:max-w-[300px]">
                Lựa chọn phòng theo chủ đề yêu thích
              </h2>

              <div className="mt-6">
                <div className="flex items-start xl:max-w-[300px]">
                  <div>
                    <p className="italic text-base md:text-lg mb-8">
                      Hãy chọn 1 chủ đề để chúng tôi có thể tìm phòng phù hợp
                      với bạn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-[50%] xl:w-2/3 relative bg-[#5a8d69] py-2 ps-3 xl:absolute xl:left-1/4 xl:bottom-6 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex">
                {apartmentImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] min-w-0 first:pl-0 pr-4"
                  >
                    <motion.div
                      className="relative rounded-3xl overflow-hidden h-[200px] sm:h-[220px] md:h-[250px]"
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                        {image.name}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="xl:absolute xl:flex hidden mt-4 ms-24 gap-2 bottom-2 left-1/2 translate-x-1/2">
            {Array.from({
              length: Math.ceil(apartmentImages.length / 3),
            }).map((_, index) => (
              <span
                key={index}
                className={`block h-2 w-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === index
                    ? "bg-[#8a9a5b]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next button */}
        <motion.div
          className="flex justify-end lg:me-24 mt-6 lg:mt-0 me-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeIn}
        >
          <Button
            onClick={scrollNext}
            className="bg-[#2d4a3e] hover:bg-[#758a4b] rounded-full w-12 h-12 shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
