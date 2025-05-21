/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com", "res.cloudinary.com", "localhost", "127.0.0.1", "player.cloudinary.com", "ddypjdqmq.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "player.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
