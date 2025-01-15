import Link from "next/link";
import { Facebook, Youtube } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="px-[120px] z-50 bg-black text-white border-b-[3px] border-primary">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={204} height={40.13} />
        </Link>
        <div className="flex items-center">
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
              aria-label="Instagram"
            >
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
