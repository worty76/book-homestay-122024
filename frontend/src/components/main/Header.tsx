"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, Settings, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAuthStore,
  useIsAuthenticated,
  useUser,
} from "@/store/useAuthStore";
import { toast } from "sonner";
import { useProfileStore } from "@/store/useProfileStore";

const menuItems = [
  { name: "GIỚI THIỆU", url: "/about" },
  { name: "TRẢI NGHIỆM", url: "/experiences" },
  { name: "ĐẶT PHÒNG", url: "/rooms" },
  { name: "BÀI VIẾT", url: "/blog" },
  { name: "LIÊN HỆ", url: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const profile = useProfileStore((state) => state.profile);
  const logout = useAuthStore((state) => state.logout);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    toast.success("Đăng xuất thành công", {
      description: "Bạn đã đăng xuất thành công.",
    });
    logout();
    setProfileMenuOpen(false);
    window.location.href = "/login";
  };

  const displayName = profile?.username || user?.name || "Tài khoản";

  const ProfileMenu = () => (
    <div className="relative" ref={profileMenuRef}>
      <button
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        className="flex items-center gap-2 bg-[#9C6B4A] hover:bg-[#7A5230] text-white py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
      >
        <User className="h-4 w-4" />
        <span>{displayName}</span>
      </button>

      <AnimatePresence>
        {profileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setProfileMenuOpen(false)}
            >
              <UserCircle className="h-4 w-4" />
              <span>Thông tin cá nhân</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <header className="relative z-10 flex items-center justify-between px-3 sm:px-6 md:px-8 py-2 bg-[rgba(249,245,227,1)] rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl shadow-sm">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/LogoKen-03.png"
            alt="Logo"
            width={110}
            height={110}
            style={{ width: "auto", height: "auto" }}
            className="w-20 h-auto sm:w-24 md:w-28 lg:w-[110px]"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-4 lg:space-x-8 text-[#9C6B4A] font-bold mr-4 lg:mr-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className="text-xs lg:text-sm transition-colors hover:text-[#7A5230]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-[#9C6B4A] hover:bg-[#7A5230] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center bg-[#9C6B4A] hover:bg-[#7A5230] text-white p-2 rounded-full transition-colors"
              aria-label="Đăng nhập"
            >
              <User className="h-4 w-4" />
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="flex items-center justify-center p-1.5"
          >
            <Menu className="h-6 w-6 text-[#9C6B4A]" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full xs:w-80 sm:w-96 max-w-full bg-white p-6 shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/images/LogoKen-03.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    style={{ width: "auto", height: "auto" }}
                    className="w-16 h-auto sm:w-20"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-[#9C6B4A]" />
                </button>
              </div>
              <nav>
                <ul className="flex flex-col space-y-5 text-[#9C6B4A] font-bold">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.url}
                        className="text-base transition-colors hover:text-[#7A5230] block py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  {!isAuthenticated && (
                    <li className="pt-4 border-t border-gray-100">
                      <Link
                        href="/login"
                        className="flex items-center gap-2 text-[#9C6B4A] hover:text-[#7A5230] py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span className="font-bold text-base">ĐĂNG NHẬP</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
