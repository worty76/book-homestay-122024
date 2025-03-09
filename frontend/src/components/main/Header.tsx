"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = [
    { name: "TRANG CHỦ", url: "/" },
    { name: "GIỚI THIỆU", url: "/gioi-thieu" },
    { name: "PHÒNG", url: "/phong" },
    { name: "BÀI VIẾT", url: "/tin-tuc" },
    { name: "LIÊN HỆ", url: "/lien-he" },
  ];

  return (
    <div className="container mx-auto">
      <header className="relative z-10 flex items-center justify-between px-8 py-2 bg-[rgba(249,245,227,1)] rounded-b-3xl">
        <Link href="/">
          <Image
            src="/images/Logo Kén-03.png"
            alt="Logo"
            width={110}
            height={110}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8 text-[#9C6B4A] font-bold">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className="text-sm transition-colors hover:text-[#7A5230]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6 text-[#9C6B4A]" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/">
                  <Image
                    src="/images/Logo Kén-03.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6 text-[#9C6B4A]" />
                </button>
              </div>
              <nav>
                <ul className="flex flex-col space-y-4 text-[#9C6B4A] font-bold">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.url}
                        className="text-sm transition-colors hover:text-[#7A5230]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
