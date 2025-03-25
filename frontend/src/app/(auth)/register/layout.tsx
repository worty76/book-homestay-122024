import AnotherHeader from "@/components/main/another-header";
import { Footer } from "@/components/main/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Create a new account",
  description: "Create a new account to get started",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnotherHeader
        title="Đăng ký"
        description="Đăng ký để trải nghiệm"
        image="/images/login-bg.jpg"
      />
      {children} 
    </>
  );
} 