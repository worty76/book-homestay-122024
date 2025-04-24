import "@/app/globals.css";
import { openSans, pinyonScript, playFair, roboto } from "@/lib/fonts";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Kén Homestay - Find Your Perfect Stay",
  description:
    "Book comfortable and authentic homestays for your next adventure. Find the perfect accommodation with our curated selection of homestays.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="image" content="/images/logo.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${roboto.variable} ${openSans.variable} ${playFair.variable} ${pinyonScript.variable} font-primary antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
