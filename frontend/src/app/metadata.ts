import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ken Homestay",
  description: "Book your perfect homestay experience",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
};
