import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/(dashboard)/", "/(auth)/"],
    },
    sitemap: "https://ken-homestay.com/sitemap.xml",
  };
}
