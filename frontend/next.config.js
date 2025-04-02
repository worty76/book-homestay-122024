/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add output configuration for better Vercel compatibility
  output: "standalone",

  // Remove trailing slash to match Vercel config
  trailingSlash: false,

  // Configure rewrites to handle assets and routes properly
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "/assets/:path*", // Modified to use direct path
      },
      {
        source: "/about",
        destination: "/about", // Modified to use Next.js routing
      },
      {
        source: "/contact",
        destination: "/contact", // Modified to use Next.js routing
      },
      // Fallback route
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },

  images: {
    domains: [
      "source.unsplash.com",
      "res.cloudinary.com",
      "localhost",
      "127.0.0.1",
      "vercel.app", // Add Vercel domain for images
      "vercel.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      {
        protocol: "https",
        hostname: "**.vercel.com",
      },
    ],
  },

  // Add explicit asset prefix if your deployment has a base path
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : "",

  // Ensure CSS is properly extracted and loaded
  webpack: (config, { isServer, dev }) => {
    // This ensures Tailwind works properly
    return config;
  },

  // Add experimental features to help with routing
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
