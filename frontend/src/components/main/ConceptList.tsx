"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { concepts, RoomConcept } from "@/data/rooms";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ConceptList() {
  // Transform concepts data into the format needed for carousel
  const conceptItems = Object.entries(concepts).map(([key, concept]) => ({
    id: key,
    src: concept.images.floor1[0] || "/images/placeholder.jpg", // Use the first image from floor1 as showcase
    name: concept.name,
    alt: `Concept ${concept.name} - ${concept.description.substring(0, 30)}...`,
    slug: key as RoomConcept,
  }));

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
    <section id="conceptlist" className="py-16 md:py-24 bg-[#f8f3e9]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mt-auto flex justify-end">
          <Link href="/concepts" legacyBehavior>
            <motion.a
              className="hidden md:flex items-center gap-2 text-[#5a8d69] uppercase tracking-wider text-sm group group-hover:translate-x-1 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              Xem tất cả chủ đề
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 relative">
          <motion.div
            className="lg:w-[50%] xl:w-1/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
          >
            <div className="bg-[#2d4a3e] text-white p-8 md:p-8 rounded-3xl h-full flex flex-col xl:h-[440px]">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight md:leading-[58px] xl:max-w-[300px]">
                Lựa chọn phòng theo chủ đề yêu thích
              </h2>

              <div className="mt-6">
                <div className="flex items-start xl:max-w-[300px]">
                  <div>
                    <p className="italic text-base md:text-lg mb-8">
                      Mỗi concept được thiết kế dựa trên cảm hứng từ văn hóa và
                      thiên nhiên Việt Nam. Hãy chọn một concept để khám phá.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-[50%] xl:w-2/3 relative bg-[#f8f3e9] py-2 ps-3 xl:absolute xl:left-1/4 xl:bottom-6 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex">
                {conceptItems.map((concept) => (
                  <div
                    key={concept.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] min-w-0 first:pl-0 pr-4"
                  >
                    <Link href={`/concepts/${concept.slug}`}>
                      <motion.div
                        className="relative rounded-3xl overflow-hidden h-[200px] sm:h-[220px] md:h-[250px]"
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      >
                        <Image
                          src={concept.src}
                          alt={concept.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                          {concept.name}
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="xl:absolute xl:flex hidden mt-4 ms-24 gap-2 bottom-2 left-1/2 translate-x-1/2">
            {Array.from({
              length: Math.ceil(conceptItems.length / 3),
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
