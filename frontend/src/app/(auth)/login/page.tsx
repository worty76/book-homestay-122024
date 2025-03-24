"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { useAuthStore } from "@/store/useAuthStore";
import AnotherHeader from "@/components/main/another-header";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <AnotherHeader
        title="Đăng nhập"
        description="Đăng nhập để trải nghiệm"
        image="/images/login-bg.jpg"
      />
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-800/50 to-primary-950/80 z-10"></div>
          <div className="relative z-20 flex flex-col justify-center items-center w-full h-full px-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-center max-w-md">
              Log in to access your account and enjoy our premium services and
              features.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-md">
            <LoginForm />

            <p className="mt-8 text-center text-sm text-gray-500">
              By logging in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
