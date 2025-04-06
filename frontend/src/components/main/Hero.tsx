"use client";

import { BackgroundCarousel } from "@/components/main/background-carousel";
import { Header } from "@/components/main/Header";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  MoveDown,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const socialLinks = [
  { Icon: Facebook, name: "Facebook", url: "https://facebook.com" },
  { Icon: Instagram, name: "Instagram", url: "https://instagram.com" },
  { Icon: Twitter, name: "Twitter", url: "https://twitter.com" },
  { Icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com" },
];

const carouselImages = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
];

export function Hero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("roomCarousel");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <BackgroundCarousel images={carouselImages} />
      <Header />

      {/* Reservation Phone - Now hidden on lg and smaller */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute hidden xl:flex flex-col left-[-20px] top-1/2 -translate-y-1/2 text-white"
      >
        <div className="flex space-x-5 -rotate-90">
          <div className="w-14 h-14 flex items-center justify-center border border-white rounded-full animate-zoom">
            <Phone size={24} strokeWidth={2} />
          </div>
          <div className="tracking-widest">
            <div className="font-bold text-2xl text-[#9C6B4A]">RESERVATION</div>
            <div className="font-medium">0342784206</div>
          </div>
        </div>
      </motion.div>

      {/* Social Links - Now hidden on lg and smaller */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute hidden xl:flex flex-col right-[100px] top-1/2 -translate-y-1/2 space-y-4 text-white z-50"
      >
        {/* Top line - adjusted positioning */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "80px" }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[2px] bg-white"
        ></motion.div>

        {/* Social icons container - added flex justify-center to center icons */}
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2">
          <div className="flex flex-col justify-center items-center space-y-4">
            {socialLinks.map(({ Icon, name, url }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Link
                  href={url}
                  aria-label={`Visit our ${name} page`}
                  className="group flex items-center justify-center w-8 h-8 overflow-hidden"
                >
                  <div className="relative w-8 h-6 transition-all duration-300 group-hover:scale-125">
                    <Icon
                      size={24}
                      className="absolute transition-all duration-300 text-white group-hover:translate-x-full group-hover:opacity-0"
                    />
                    <Icon
                      size={28}
                      className="absolute transition-all duration-300 text-[#9C6B4A] translate-x-full group-hover:translate-x-0 ps-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line - adjusted positioning */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "80px" }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[2px] bg-white"
        ></motion.div>
      </motion.div>

      <main className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-0">
        <div className="space-y-4 w-full max-w-4xl mx-auto">
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-white text-lg md:text-2xl tracking-widest font-light"
          >
            Hơi thở truyền thống, nhịp sống hiện đại
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-6xl tracking-wider font-semibold mb-10 pb-2 font-playfair"
          >
            Chào mừng bạn đến với
            <br />
            Kén Homestay
          </motion.h2>

          {/* Only show SearchBar on screens larger than sm */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 sm:mt-6"
          >
            <SearchBar />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Button
            variant="ghost"
            className="mt-10 md:mt-20 transform font-bold -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-white rounded-full text-white transition-opacity hover:bg-white hover:text-[#9C6B4A] animate-bounce"
            onClick={scrollToNextSection}
          >
            <MoveDown size={40} className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
        </motion.div>
      </main>
    </>
  );
}
