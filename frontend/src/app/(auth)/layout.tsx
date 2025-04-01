import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Create a new account",
  description: "Create a new account to get started",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
