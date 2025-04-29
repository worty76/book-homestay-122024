"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAuthStore,
  useIsAuthenticated,
  useUser,
} from "@/store/useAuthStore";
import { toast } from "sonner";
import { useProfileStore } from "@/store/useProfileStore";
import LanguageSwitcher from "@/components/language-switcher";
import { useTranslation } from "@/hooks/useTranslation";

const menuItems = [
  {
    name: "navigation.about",
    translationKey: "navigation.about",
    url: "/about",
  },
  {
    name: "navigation.experiences",
    translationKey: "navigation.experiences",
    url: "/experiences",
  },
  {
    name: "navigation.rooms",
    translationKey: "navigation.rooms",
    url: "/rooms",
  },
  { name: "navigation.blog", translationKey: "navigation.blog", url: "/blog" },
  {
    name: "navigation.contact",
    translationKey: "navigation.contact",
    url: "/contact",
  },
];

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const profile = useProfileStore((state) => state.profile);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest(".profile-menu-container")) {
          setProfileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  const handleLogout = () => {
    toast.success(t("common.notifications.success"), {
      description: "You have been logged out successfully.",
    });
    logout();
    setProfileMenuOpen(false);
    window.location.href = "/login";
  };

  const displayName = profile?.username || user?.name || "Account";

  const ProfileMenu = () => (
    <div className="relative profile-menu-container">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setProfileMenuOpen(!profileMenuOpen);
        }}
        className="flex items-center gap-2 bg-[#9C6B4A] hover:bg-[#7A5230] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
      >
        <User className="h-4 w-4" />
        <span className="hidden lg:inline">{displayName}</span>
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              onClick={(e) => {
                e.stopPropagation();
                setProfileMenuOpen(false);
              }}
            >
              <UserCircle className="h-4 w-4" />
              <span>{t("navigation.profile")}</span>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>{t("navigation.logout")}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="container mx-auto px-2 sm:px-4 z-[100]">
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
                  {t(item.translationKey || item.name).toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-[#9C6B4A] hover:bg-[#7A5230] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span>{t("navigation.login")}</span>
              </Link>
            )}
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated && <ProfileMenu />}

          {!isAuthenticated && (
            <Link
              href="/login"
              className="flex items-center justify-center bg-[#9C6B4A] hover:bg-[#7A5230] text-white p-2 rounded-full transition-colors"
              aria-label="Login"
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
              className="fixed right-0 top-0 bottom-0 w-64 sm:w-80 bg-white shadow-xl p-6 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl text-[#9C6B4A]">
                  {t("navigation.home")}
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5"
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6 text-[#9C6B4A]" />
                </button>
              </div>

              <nav>
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.url}
                        className="text-[#9C6B4A] hover:text-[#7A5230] transition-colors block py-2 border-b border-gray-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(item.translationKey || item.name).toUpperCase()}
                      </Link>
                    </li>
                  ))}
                  {!isAuthenticated && (
                    <li>
                      <Link
                        href="/login"
                        className="text-[#9C6B4A] hover:text-[#7A5230] transition-colors block py-2 border-b border-gray-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t("navigation.login").toUpperCase()}
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
