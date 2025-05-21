"use client";

import { Header } from "@/components/main/Header";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  subtitle?: string;
  description: string;
  image?: string;
  finalPage: string;
  detailPage?: string;
}

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

const AnotherHeader = ({
  title = "",
  subtitle,
  description,
  image = "/images/img1.jpg",
  finalPage,
  detailPage,
}: Props) => {
  return (
    <div className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[450px] overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0`}>
          <motion.div
            className="absolute inset-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <Header />

        <main className="absolute inset-0 flex flex-col justify-center pt-16 md:pt-20 px-6 md:px-0">
          <div className="space-y-2 md:space-y-4 w-full container mx-auto px-6 sm:px-8 md:px-16">
            <motion.div
              className="flex items-center mb-2 md:mb-6 text-white/80 font-sans font-semibold text-xs sm:text-sm md:text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="hover:text-white transition-colors">
                Homepage
              </Link>
              <span className="mx-1 sm:mx-2">&#9658;</span>
              <span className="text-white">{finalPage}</span>
              {detailPage && (
                <>
                  <span className="mx-1 sm:mx-2">&#9658;</span>
                  <span className="text-white">{detailPage}</span>
                </>
              )}
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3ECDC]/80 font-playfair"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {title} <span className="text-white">{subtitle}</span>
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-[#F3ECDC] md:text-lg max-w-full sm:max-w-lg md:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {description}
            </motion.p>
          </div>
        </main>
      </div>
      <style jsx>{`
        .bg-gradient-overlay {
          background: linear-gradient(
            to right,
            rgba(52, 78, 65, 0.95) 50%,
            transparent 100%
          );
        }

        @media (min-width: 640px) {
          .bg-gradient-overlay {
            background: linear-gradient(
              to right,
              rgba(52, 78, 65, 0.95) 40%,
              transparent 100%
            );
          }
        }

        @media (min-width: 768px) {
          .bg-gradient-overlay {
            background: linear-gradient(
              to right,
              rgba(52, 78, 65, 0.95) 32%,
              transparent 100%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default AnotherHeader;
