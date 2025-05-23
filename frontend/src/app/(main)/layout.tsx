import type { Metadata } from "next";
import "@/app/globals.css";
import { openSans, pinyonScript, playFair, roboto } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Kén Homestay - Your Perfect Vacation Stay",
  description:
    "Discover beautiful and comfortable homestays for your next adventure. Book directly for the best rates and authentic local experiences.",
  keywords:
    "homestay, accommodation, vacation rental, local experience, travel, booking",
  openGraph: {
    title: "Kén Homestay - Your Perfect Vacation Stay",
    description:
      "Discover beautiful and comfortable homestays for your next adventure. Book directly for the best rates and authentic local experiences.",
    url: "https://ken-homestay.com",
    siteName: "Kén Homestay",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kén Homestay",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kén Homestay - Your Perfect Vacation Stay",
    description:
      "Discover beautiful and comfortable homestays for your next adventure. Book directly for the best rates.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ken-homestay.com",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${roboto.variable} ${openSans.variable} ${playFair.variable} ${pinyonScript.variable} font-primary antialiased`}
    >
      {children}
    </div>
  );
}
