import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Camera } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white text-sm font-sans">
      <div className="mx-auto pt-[1px]">
        {/* Main Grid Sections */}
        <div className="container mx-auto">
          <div className="flex justify-between items-start m-[56px]">
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
            <div className="text-center text-base font-normal border-gray-600 border-x px-60">
              <div className="flex justify-center items-center mb-[14px]">
                <Image
                  src="/images/Logo2.png"
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
            <div className="flex justify-end items-start">
              <div className="flex flex-col justify-end items-start">
                <h3 className="text-lg font-bold mb-4">Giờ mở cửa</h3>
                <p className="mb-2">Thứ 2 - Thứ 6: 6:00AM - 23:00PM</p>
                <p>Thứ 7 - CN: 7:00AM - 23:00PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center space-x-8">
          {/* Left Horizontal line */}
          <div className="absolute left-0 top-1/2 h-px bg-gray-600 w-[calc(50%-2rem)]"></div>

          {/* Social Icons */}
          <div className="flex space-x-8 z-10 bg-black">
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 hover:border-white transition"
            >
              <span className="sr-only">Twitter</span>
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={20}
                height={20}
              />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 hover:border-white transition"
            >
              <span className="sr-only">Facebook</span>
              <Image
                src="/icons/facebook.svg"
                alt="Twitter"
                width={20}
                height={20}
              />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 hover:border-white transition"
            >
              <span className="sr-only">Instagram</span>
              <Image
                src="/icons/group.svg"
                alt="Twitter"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 hover:border-white transition"
            >
              <span className="sr-only">Instagram</span>
              <Image
                src="/icons/insta.svg"
                alt="Twitter"
                width={20}
                height={20}
              />
            </Link>
          </div>

          {/* Right Horizontal line */}
          <div className="absolute right-0 top-1/2 h-px bg-gray-600 w-[calc(50%-2rem)]"></div>
        </div>
        <div className="container mx-auto">
          {/* Copyright */}
          <div className=" py-4 px-14 flex justify-between items-center">
            <span>© Bản quyền thuộc về ATeam | Cung cấp bởi slimweb.vn</span>
            <div className="flex gap-4">
              <Image src="/images/VCB.svg" alt="vcb" width={40} height={30} />
              <Image src="/images/BIDV.svg" alt="vcb" width={30} height={30} />
              <Image src="/images/VTB.svg" alt="vcb" width={40} height={30} />
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-around bg-[#1D1D1D] items-center border-t border-gray-800 py-6">
            <Link href="#" className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-yellow-500" /> Bản đồ điểm
              đến
            </Link>
            <Link href="tel:0123456789" className="flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2 text-yellow-500" /> Hotline:
              0123456789
            </Link>
            <Link
              href="mailto:demo@gmail.com"
              className="flex items-center mb-2"
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
      </div>
    </footer>
  );
}
