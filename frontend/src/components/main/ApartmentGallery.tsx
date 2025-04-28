"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { VideoModal } from "@/components/ui/video-modal";
import { Title } from "./Title";
import { useTranslation } from "@/hooks/useTranslation";

const apartmentImages = [
  {
    id: 1,
    src: "/images/3DKENHOME/floor1/08.png",
    alt: "Modern apartment living room with plants",
  },
  {
    id: 2,
    src: "/images/3DKENHOME/floor1/09.png",
    alt: "Bright living room with gallery wall",
  },
  {
    id: 3,
    src: "/images/3DKENHOME/floor1/02.png",
    alt: "Minimalist living room with natural light",
  },
  {
    id: 4,
    src: "/images/3DKENHOME/floor1/03 (1).png",
    alt: "Blue wall living room with orange sofa",
  },
  {
    id: 5,
    src: "/images/3DKENHOME/floor1/15.png",
    alt: "Reading nook with shelves",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ApartmentGallery() {
  const { t } = useTranslation();
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundImage: 'url("/images/testimonial-bg.png")' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <Title
            title={t("home.gallery.title")}
            titleColor="#5a8d69"
            subtitle={t("home.gallery.subtitle")}
            subtitleColor="#9C6B4A"
            // opacity="80"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            className="
      relative 
      rounded-3xl 
      overflow-hidden 
      col-span-1 
      md:col-span-2 
      lg:col-span-1 
      lg:row-span-2
    "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeInUp}
          >
            <div className="relative h-[500px] md:h-[500px] lg:h-full w-full group">
              <Image
                src="/images/3DKENHOME/floor1/01.png"
                alt="Modern apartment space"
                fill
                className="object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {apartmentImages.slice(1, 6).map((image, index) => (
            <motion.div
              key={image.id}
              className="relative rounded-3xl overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              variants={fadeInUp}
            >
              <div className="relative h-[250px] w-full group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-12">
          <Link
            href="/gallery"
            className="text-[#2d4a3e] font-medium hover:underline flex items-center group"
          >
            {t("home.gallery.viewAll")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
