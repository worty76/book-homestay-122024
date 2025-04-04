import "@/app/globals.css";
import { openSans, pinyonScript, playFair, roboto } from "@/lib/fonts";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Ken Homestay - Find Your Perfect Stay",
  description:
    "Book comfortable and authentic homestays for your next adventure. Find the perfect accommodation with our curated selection of homestays.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      "https://backend-booking-homestay.onrender.com/"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${openSans.variable} ${playFair.variable} ${pinyonScript.variable} font-primary antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
