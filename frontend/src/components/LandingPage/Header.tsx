"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Facebook, Youtube } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="z-50 bg-black lg:bg-black text-white border-b-[3px] border-primary">
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4 flex justify-between items-center">
        {/* Mobile Layout */}
        <div className="w-1/3 lg:hidden"></div>
        <div className="flex items-center justify-center w-1/3 lg:hidden">
          <Image
            src="/images/logo.png"
            alt="Crown"
            width={320} // Kích thước lớn hơn cho mobile
            height={80}
            className="mr-2"
          />
        </div>
        <div className="w-1/3 flex justify-end lg:hidden">
          <button
            className="text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>

        {/* Desktop Layout */}
        <Link href="/" className="hidden lg:block">
          <Image src="/images/logo.png" alt="Logo" width={204} height={40.13} />
        </Link>
        <div className="hidden lg:flex items-center">
          <nav>
            <ul className="flex space-x-6 text-primary text-sm leading-5 font-bold gap-[32px]">
              <li>
                <Link href="#about">Giới thiệu</Link>
              </li>
              <li>
                <Link href="#rooms">Tiện ích</Link>
              </li>
              <li>
                <Link href="#booking">Đặt phòng</Link>
              </li>
              <li>
                <Link href="#contact">Liên hệ</Link>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4 ml-[44px] justify-center">
            <Link
              className="text-black bg-primary rounded-full p-2"
              href="#"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              className="text-black bg-primary rounded-full p-2"
              href="#"
              aria-label="Youtube"
            >
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="lg:hidden bg-black/90 py-4">
          <ul className="flex flex-col space-y-4 text-primary text-lg leading-6 font-bold px-4 text-center">
            <li>
              <Link href="#about" onClick={() => setIsMenuOpen(false)}>
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="#rooms" onClick={() => setIsMenuOpen(false)}>
                Tiện ích
              </Link>
            </li>
            <li>
              <Link href="#booking" onClick={() => setIsMenuOpen(false)}>
                Đặt phòng
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
