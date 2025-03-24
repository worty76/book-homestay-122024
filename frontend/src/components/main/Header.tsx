"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, Settings, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAuthStore,
  useIsAuthenticated,
  useUser,
} from "@/store/useAuthStore";

const menuItems = [
  { name: "TRANG CHỦ", url: "/" },
  { name: "GIỚI THIỆU", url: "/about" },
  { name: "ĐẶT PHÒNG", url: "/concepts" },
  { name: "BÀI VIẾT", url: "/blog" },
  { name: "LIÊN HỆ", url: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
  };

  const ProfileMenu = () => (
    <div className="relative">
      <button
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        className="flex items-center gap-2 bg-[#9C6B4A] hover:bg-[#7A5230] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
      >
        <User className="h-4 w-4" />
        <span>{user?.name || "Tài khoản"}</span>
      </button>

      {profileMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <UserCircle className="h-4 w-4" />
            <span>Thông tin cá nhân</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-4 w-4" />
            <span>Cài đặt</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto">
      <header className="relative z-10 flex items-center justify-between px-8 py-2 bg-[rgba(249,245,227,1)] rounded-b-3xl">
        <Link href="/">
          <Image
            src="/images/LogoKén-03.png"
            alt="Logo"
            width={110}
            height={110}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-8 text-[#9C6B4A] font-bold mr-6">
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

        <div className="md:hidden flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center justify-center bg-[#9C6B4A] hover:bg-[#7A5230] text-white p-2 rounded-full transition-colors"
            >
              <User className="h-4 w-4" />
            </button>
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
                    src="/images/Logo Kén-03.png"
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

                  <li className="pt-4 border-t border-gray-100">
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-[#9C6B4A] hover:text-[#7A5230]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span className="font-bold text-sm">ĐĂNG NHẬP</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
