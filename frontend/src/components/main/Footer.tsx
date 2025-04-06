"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Camera } from "lucide-react";

export function Footer() {
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
            <p className="mb-1">Hotline (giờ hành chính): 0123456789</p>
            <p>Email: demo@gmail.com</p>
          </div>

          {/* Support Information */}
          <div className="w-full mb-8">
            <h3 className="text-lg font-bold mb-4 text-left">
              Thông tin hỗ trợ
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-left">
              <li>
                <Link href="#" className="hover:underline">
                  Cẩm nang
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Góp ý
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="w-full mb-8">
            <h3 className="text-lg font-bold mb-4 text-left">Giờ mở cửa</h3>
            <div className="text-left">
              <p className="mb-2">Thứ 2 - Thứ 6: 6:00AM - 23:00PM</p>
              <p>Thứ 7 - CN: 7:00AM - 23:00PM</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-6 border-t border-b border-[#9c6b4a] w-full py-6">
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
            >
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={20}
                height={20}
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
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
            >
              <Image
                src="/icons/group.svg"
                alt="Group"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <Link
              href="#"
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
            <p className="mb-4">
              © Bản quyền thuộc về ATeam | Cung cấp bởi slimweb.vn
            </p>
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
              <Link href="#" className="flex items-center text-white">
                <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
                Bản đồ điểm đến
              </Link>
              <Link
                href="tel:0123456789"
                className="flex items-center text-white"
              >
                <Phone className="w-4 h-4 mr-2 text-yellow-500" />
                Hotline: 0123456789
              </Link>
              <Link
                href="mailto:demo@gmail.com"
                className="flex items-center text-white"
              >
                <Mail className="w-4 h-4 mr-2 text-yellow-500" />
                Email: demo@gmail.com
              </Link>
              <Link href="#" className="flex items-center text-white">
                <Camera className="w-4 h-4 mr-2 text-yellow-500" />
                Hình ảnh preview
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
                <h3 className="text-lg font-bold mb-4">Thông tin hỗ trợ</h3>
                <ul className="grid grid-cols-2 gap-4 gap-x-10">
                  <li>
                    <Link href="#" className="hover:underline">
                      Cẩm nang
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Chính sách
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Góp ý
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Dịch vụ
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
                <p className="">Hotline (giờ hành chính): 0123456789</p>
                <p>
                  Email:{" "}
                  <a href="mailto:demo@gmail.com" className="hover:underline">
                    demo@gmail.com
                  </a>
                </p>
              </div>

              {/* Opening Hours */}
              <div className="flex justify-end items-start ms-4">
                <div className="flex flex-col justify-end items-start">
                  <h3 className="text-lg font-bold mb-4">Giờ mở cửa</h3>
                  <p className="mb-2">Thứ 2 - Thứ 6: 6:00AM - 23:00PM</p>
                  <p>Thứ 7 - CN: 7:00AM - 23:00PM</p>
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
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
              >
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
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
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#9c6b4a] hover:border-black transition"
              >
                <Image
                  src="/icons/group.svg"
                  alt="Group"
                  width={20}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <Link
                href="#"
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
                <span>
                  © Bản quyền thuộc về ATeam | Cung cấp bởi slimweb.vn
                </span>
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
                <Link href="#" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-500" /> Bản đồ
                  điểm đến
                </Link>
                <Link href="tel:0123456789" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-yellow-500" /> Hotline:
                  0123456789
                </Link>
                <Link
                  href="mailto:demo@gmail.com"
                  className="flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2 text-yellow-500" /> Email:
                  demo@gmail.com
                </Link>
                <Link href="#" className="flex items-center">
                  <Camera className="w-4 h-4 mr-2 text-yellow-500" /> Hình ảnh
                  preview
                </Link>
              </div>
            </div>
          </>
        </div>
      </div>
    </footer>
  );
}
