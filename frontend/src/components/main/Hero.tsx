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
  const handleScrollDown = () => {
    const nextSection = document.getElementById("conceptlist");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <BackgroundCarousel images={carouselImages} />
      <Header />

      <div className="absolute hidden md:flex flex-col left-[-20px] top-1/2 -translate-y-1/2 text-white">
        <div className="flex space-x-5 -rotate-90">
          <div className="w-14 h-14 flex items-center justify-center border border-white rounded-full animate-zoom">
            <Phone size={24} strokeWidth={2} />
          </div>
          <div className="tracking-widest">
            <div className="font-bold text-2xl text-[#aa8453]">RESERVATION</div>
            <div className="font-medium">0342784206</div>
          </div>
        </div>
      </div>

      <div className="absolute hidden md:flex flex-col right-[80px] top-1/2 -translate-y-1/2 space-y-4 text-white z-50">
        <div className="absolute top-[-75px] left-1/2 -translate-x-1/2 w-[2px] h-[80px] bg-white"></div>
        <div className="flex flex-col space-y-4">
          {socialLinks.map(({ Icon, name, url }) => (
            <Link
              key={name}
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
          ))}
        </div>
        <div className="absolute bottom-[-90px] left-1/2 -translate-x-1/2 w-[2px] h-[80px] bg-white"></div>
      </div>

      <main className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-6">
          <p className="text-white text-sm tracking-widest">
            LUXURY HOTEL & BEST RESORT
          </p>
          <h2 className="text-white text-4xl md:text-6xl tracking-wider">
            Chào mừng bạn đến với Kén Homestay
          </h2>
        </div>

        <Button
          variant="ghost"
          className="mt-20 transform font-bold -translate-x-1/2 w-14 h-14 flex items-center justify-center border border-white rounded-full text-white transition-opacity hover:bg-white hover:text-[#9C6B4A] animate-bounce"
          onClick={handleScrollDown}
        >
          <MoveDown size={52} />
        </Button>
      </main>
    </>
  );
}
