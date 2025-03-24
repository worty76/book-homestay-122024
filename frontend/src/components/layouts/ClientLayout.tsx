"use client";

import { Footer } from "@/components/main/Footer";
import QueryProvider from "@/providers/query-provider";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { colorMap } from "@/lib/color-map";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      <NextTopLoader color="#008000" />
      <QueryProvider>{children}</QueryProvider>
      {!isDashboard && <Footer />}
    </>
  );
}
