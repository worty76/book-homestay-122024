"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

function LoginContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const isAdmin = useAuthStore((state) => state.isAdmin());

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, isAdmin, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <Card className="flex overflow-hidden shadow-xl rounded-xl border-0">
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <LoginForm />
              </motion.div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] relative overflow-hidden">
            <div className="absolute inset-0 bg-opacity-10 bg-[url('/images/pattern.png')] mix-blend-soft-light"></div>
            <div className="w-full h-full flex items-center justify-center p-12 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-center relative z-10"
              >
                <img
                  src="/images/image4.png"
                  alt="Kén Homestay Logo"
                  className="mx-auto max-w-[80%] drop-shadow-lg"
                />
                <div className="mt-8 text-gray-700">
                  <h3 className="text-xl font-semibold mb-2">
                    Chào mừng đến với Kén Homestay
                  </h3>
                  <p className="text-sm text-gray-600">
                    Đặt phòng và tận hưởng trải nghiệm lưu trú tại nhà riêng của
                    bạn.
                  </p>
                </div>
              </motion.div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-full opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#f8d7da] to-[#f5c6cb] rounded-tr-full opacity-50"></div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
