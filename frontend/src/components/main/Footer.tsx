"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Camera } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#f9f5e3] text-[#9c6b4a] text-sm font-sans pt-20">
      <div className="mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden px-6 py-8 flex flex-col items-center text-center">
          {/* Logo Section */}
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/images/LogoKen-03.png"
              alt="Logo"
              width={140}
              height={70}
              className="text-center"
            />
            <p className="mb-1">Phạm Hùng, Q.Nam Từ Liêm, Hà Nội</p>
            <p className="mb-1">
              Hotline ({t("footer.officialHours")}): 0925090669
            </p>
            <p>{t("footer.email")}: info.kenhomestay@gmail.com</p>
          </div>

          {/* Support Information */}
          <div className="w-full mb-8">
            <h3 className="text-lg font-bold mb-4 text-left">
              {t("footer.supportInfo")}
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-left">
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.guide")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.policy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.feedback")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.services")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="w-full mb-8">
            <h3 className="text-lg font-bold mb-4 text-left">
              {t("footer.openingHours")}
            </h3>
            <div className="text-left">
              <p className="mb-2">{t("footer.monToFri")}</p>
              <p>{t("footer.satToSun")}</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-6 border-t border-b border-[#9c6b4a] w-full py-6">
            <Link
              href="tel:0925090669"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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

          {/* Copyright and Payment Methods */}
          <div className="text-center mb-6">
            <p className="mb-4">{t("footer.copyright")}</p>
            <div className="flex justify-center gap-4">
              <Image
                src="/images/VCB.svg"
                alt="vcb"
                width={40}
                height={30}
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                src="/images/BIDV.svg"
                alt="bidv"
                width={30}
                height={30}
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                src="/images/VTB.svg"
                alt="vtb"
                width={40}
                height={30}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-[#1D1D1D] w-full py-4 px-6">
            <div className="flex flex-col space-y-4">
              <Link href="" className="flex items-center text-white">
                <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
                {t("footer.destinationMap")}
              </Link>
              <Link
                href="tel:0925090669"
                className="flex items-center text-white"
              >
                <Phone className="w-4 h-4 mr-2 text-yellow-500" />
                {t("footer.hotline")}: 0925090669
              </Link>
              <Link
                href="mailto:info.kenhomestay@gmail.com"
                className="flex items-center text-white"
              >
                <Mail className="w-4 h-4 mr-2 text-yellow-500" />
                {t("footer.email")}: info.kenhomestay@gmail.com
              </Link>
              <Link href="#" className="flex items-center text-white">
                <Camera className="w-4 h-4 mr-2 text-yellow-500" />
                {t("footer.gallery")}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="container mx-auto">
            <div className="flex justify-between items-start mb-[56px] mr-[56px] ml-[56px]">
              {/* Support Information */}
              <div className="flex flex-col justify-start items-start w-60">
                <h3 className="text-lg font-bold mb-4">
                  {t("footer.supportInfo")}
                </h3>
                <ul className="grid grid-cols-2 gap-4 gap-x-10">
                  <li>
                    <Link href="#" className="hover:underline">
                      {t("footer.guide")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      {t("footer.faq")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      {t("footer.about")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      {t("footer.policy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      {t("footer.feedback")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      {t("footer.services")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="text-center text-base font-normal border-[#9c6b4a] border-x px-60">
                <div className="flex justify-center items-center mb-[14px]">
                  <Image
                    src="/images/LogoKen-03.png"
                    alt="Logo"
                    width={140}
                    height={70}
                    className="text-center"
                  />
                </div>
                <p className="">Phạm Hùng, Q. Nam Từ Liêm, Hà Nội</p>
                <p className="">
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
              <div className="flex justify-end items-start ms-4">
                <div className="flex flex-col justify-end items-start">
                  <h3 className="text-lg font-bold mb-4">
                    {t("footer.openingHours")}
                  </h3>
                  <p className="mb-2">{t("footer.monToFri")}</p>
                  <p>{t("footer.satToSun")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons for Desktop */}
          <div className="relative flex items-center justify-center space-x-8">
            <div className="absolute left-0 top-1/2 h-px bg-[#9c6b4a] w-[calc(50%-2rem)]"></div>
            <div className="flex space-x-8 z-10 bg-[#f9f5e3]">
              {/* Social icons remain unchanged */}
              <Link
                href="tel:0925090669"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
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
            <div className="absolute right-0 top-1/2 h-px bg-[#9c6b4a] w-[calc(50%-2rem)]"></div>
          </div>

          {/* Desktop Copyright and Links */}
          <>
            <div className="container mx-auto">
              <div className="py-4 px-14 flex justify-between items-center">
                <span>{t("footer.copyright")}</span>
                <div className="flex gap-4">
                  <Image
                    src="/images/VCB.svg"
                    alt="vcb"
                    width={40}
                    height={30}
                    style={{ width: "auto", height: "auto" }}
                  />
                  <Image
                    src="/images/BIDV.svg"
                    alt="bidv"
                    width={30}
                    height={30}
                    style={{ width: "auto", height: "auto" }}
                  />
                  <Image
                    src="/images/VTB.svg"
                    alt="vtb"
                    width={40}
                    height={30}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#1D1D1D] border-t border-gray-800 py-6">
              <div className="flex flex-wrap justify-around items-center container mx-auto">
                <Link href="/about" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-500" />{" "}
                  {t("footer.bottomLinks.map")}
                </Link>
                <Link href="tel:0925090669" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-yellow-500" />{" "}
                  {t("footer.hotline")}: 0925090669
                </Link>
                <Link
                  href="mailto:info.kenhomestay@gmail.com"
                  className="flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2 text-yellow-500" />{" "}
                  {t("footer.email")}: info.kenhomestay@gmail.com
                </Link>
                <Link href="/gallery" className="flex items-center">
                  <Camera className="w-4 h-4 mr-2 text-yellow-500" />{" "}
                  {t("footer.bottomLinks.images")}
                </Link>
              </div>
            </div>
          </>
        </div>
      </div>
    </footer>
  );
}
