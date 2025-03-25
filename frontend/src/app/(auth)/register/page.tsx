"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import AnotherHeader from "@/components/main/another-header";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <div className="flex bg-center bg-cover bg-[url('/images/testimonial-bg.png')] bg-gray-50 py-14">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
} 