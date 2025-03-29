/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com", "res.cloudinary.com", "localhost", "127.0.0.1"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
