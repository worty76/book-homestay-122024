"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Camera } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#f9f5e3] text-[#9c6b4a] text-sm font-sans pt-12">
      <div className="mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden px-6 py-8 flex flex-col items-center text-center">
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center">
            <Image
              src="/images/LogoKen-03.png"
              alt="Logo"
              width={140}
              height={70}
              className="text-center mb-6"
            />
            <p className="mb-2">Phạm Hùng, Q.Nam Từ Liêm, Hà Nội</p>
            <p className="mb-2">
              Hotline ({t("footer.officialHours")}): 0925090669
            </p>
            <p>{t("footer.email")}: info.kenhomestay@gmail.com</p>
          </div>

          {/* Opening Hours */}
          <div className="w-full mb-8">
            <h3 className="text-lg font-bold mb-4 text-center">
              {t("footer.openingHours")}
            </h3>
            <div className="text-center">
              <p className="mb-2">{t("footer.monToFri")}</p>
              <p>{t("footer.satToSun")}</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-5 mb-8 border-t border-b border-[#9c6b4a] w-full py-6">
            <Link
              href="tel:0925090669"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
            >
              <Image
                src="/icons/whatsappColor.svg"
                alt="Twitter"
                width={14}
                height={14}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <Link
              href="https://www.facebook.com/kenhomestaydn"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
            >
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <Link
              href="tel:0925090669"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
            >
              <Image
                src="/icons/ZaloColor.svg"
                alt="Group"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <Link
              href="https://www.instagram.com/ken_homestay/?utm_source=ig_web_button_share_sheet"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
            >
              <Image
                src="/icons/insta.svg"
                alt="Instagram"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center mb-8">
            <p>{t("footer.copyright")}</p>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-[#1D1D1D] w-full py-5 px-6 rounded-t-lg">
            <div className="flex flex-col space-y-4">
              <Link
                href=""
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-3 text-yellow-500" />
                {t("footer.destinationMap")}
              </Link>
              <Link
                href="tel:0925090669"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-3 text-yellow-500" />
                {t("footer.hotline")}: 0925090669
              </Link>
              <Link
                href="mailto:info.kenhomestay@gmail.com"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Mail className="w-4 h-4 mr-3 text-yellow-500" />
                {t("footer.email")}: info.kenhomestay@gmail.com
              </Link>
              <Link
                href="#"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Camera className="w-4 h-4 mr-3 text-yellow-500" />
                {t("footer.gallery")}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-start mb-12">
              {/* Contact Information */}
              <div className="text-center text-base font-normal justify-center">
                <div className="flex flex-col items-center mb-6">
                  <Image
                    src="/images/LogoKen-03.png"
                    alt="Logo"
                    width={140}
                    height={70}
                    className="mb-6"
                  />
                </div>
                <p className="mb-2">Phạm Hùng, Q. Nam Từ Liêm, Hà Nội</p>
                <p className="mb-2">
                  {t("footer.hotline")} ({t("footer.officialHours")}):
                  0925090669
                </p>
                <p>
                  {t("footer.email")}:{" "}
                  <a
                    href="mailto:info.kenhomestay@gmail.com"
                    className="hover:underline"
                  >
                    info.kenhomestay@gmail.com
                  </a>
                </p>
              </div>

              {/* Opening Hours */}
              <div className="flex flex-col justify-center items-start my-auto">
                <h3 className="text-lg font-bold mb-4">
                  {t("footer.openingHours")}
                </h3>
                <p className="mb-2">{t("footer.monToFri")}</p>
                <p>{t("footer.satToSun")}</p>
              </div>
            </div>
          </div>

          {/* Social Icons for Desktop */}
          <div className="relative flex items-center justify-center space-x-8 my-10">
            <div className="absolute left-0 top-1/2 h-px bg-[#9c6b4a] w-[calc(50%-8rem)]"></div>
            <div className="flex space-x-10 z-10 bg-[#f9f5e3] px-8">
              <Link
                href="tel:0925090669"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
              >
                <Image
                  src="/icons/whatsappColor.svg"
                  alt="Twitter"
                  width={14}
                  height={14}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <Link
                href="https://www.facebook.com/kenhomestaydn"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
              >
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <Link
                href="tel:0925090669"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
              >
                <Image
                  src="/icons/ZaloColor.svg"
                  alt="Group"
                  width={20}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <Link
                href="https://www.instagram.com/ken_homestay/?utm_source=ig_web_button_share_sheet"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[#9c6b4a] hover:bg-[#9c6b4a] hover:text-white transition-all duration-300"
              >
                <Image
                  src="/icons/insta.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </div>
            <div className="absolute right-0 top-1/2 h-px bg-[#9c6b4a] w-[calc(50%-8rem)]"></div>
          </div>

          {/* Desktop Copyright */}
          <div className="container mx-auto">
            <div className="py-4 px-6 md:px-14 flex justify-center items-center">
              <span className="text-center">{t("footer.copyright")}</span>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-[#1D1D1D] border-t border-gray-800 py-6 rounded-t-lg">
            <div className="flex flex-wrap justify-around items-center container mx-auto px-6">
              <Link
                href="/about"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-3 text-yellow-500" />{" "}
                {t("footer.bottomLinks.map")}
              </Link>
              <Link
                href="tel:0925090669"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-3 text-yellow-500" />{" "}
                {t("footer.hotline")}: 0925090669
              </Link>
              <Link
                href="mailto:info.kenhomestay@gmail.com"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Mail className="w-4 h-4 mr-3 text-yellow-500" />{" "}
                {t("footer.email")}: info.kenhomestay@gmail.com
              </Link>
              <Link
                href="/gallery"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Camera className="w-4 h-4 mr-3 text-yellow-500" />{" "}
                {t("footer.bottomLinks.images")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
