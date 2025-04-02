/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add output configuration for better Vercel compatibility
  output: "standalone",

  // Enable trailing slash for consistent URL handling
  trailingSlash: true,

  // Optional: Cleaned-up rewrites (if not needed, you can remove this block)
  async rewrites() {
    return [];
  },

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
      },
    ],
  },
};

module.exports = nextConfig;
