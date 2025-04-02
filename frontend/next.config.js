/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add output configuration for better Vercel compatibility
  output: "standalone",

  // Enable trailing slash for consistent URL handling
  trailingSlash: true,

  // Add basic rewrites for handling potential path issues
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  images: {
    domains: [
      "source.unsplash.com",
      "example.com",
      "res.cloudinary.com",
      "localhost",
      "127.0.0.1",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
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
