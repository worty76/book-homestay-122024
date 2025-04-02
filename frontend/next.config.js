/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add output configuration for better Vercel compatibility
  output: "standalone",

  // Enable trailing slash for consistent URL handling
  trailingSlash: true,

  // Configure rewrites to handle potential 404 errors
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/",
        destination: "/",
      },
    ];
  },

  // Add proper basePath if your app isn't deployed at the root
  // basePath: '',

  images: {
    domains: [
      "source.unsplash.com",
      "res.cloudinary.com",
      "localhost",
      "127.0.0.1",
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
    ],
  },

  // Ensure proper static handling
  distDir: "build",

  // Add experimental features to help with routing
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
