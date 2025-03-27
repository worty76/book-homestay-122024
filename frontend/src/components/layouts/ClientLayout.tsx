"use client";

import { Footer } from "@/components/main/Footer";
import QueryProvider from "@/providers/query-provider";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { colorMap } from "@/lib/color-map";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(false);
  
  // Only run this effect client-side after initial render
  useEffect(() => {
    const isDashboard = pathname?.startsWith("/dashboard");
    const isAuthPage = pathname?.includes("login") || 
                       pathname?.includes("register") || 
                       pathname?.includes("forgot-password");
    
    setShowFooter(!isDashboard && !isAuthPage);
  }, [pathname]);

  return (
    <>
      <NextTopLoader color="#008000" />
      <QueryProvider>
        {children}
        <Toaster richColors closeButton position="top-right" />
      </QueryProvider>
      {showFooter && <Footer />}
    </>
  );
}
