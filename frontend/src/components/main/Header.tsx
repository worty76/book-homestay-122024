"use client";

import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="container mx-auto">
      <header className="relative z-10 flex items-center justify-between px-8 py-2 bg-[rgba(249,245,227,1)] rounded-b-3xl">
        <Link href="/" className="">
          <Image
            src="/images/Logo Kén-03.png"
            alt="Logo"
            width={110}
            height={110}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8 text-[#9C6B4A] font-bold">
            {[
              "HOME",
              "ROOMS",
              "RESTAURANTS",
              "BLOCKS",
              "FACILITIES",
              "CONTACT US",
            ].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}
