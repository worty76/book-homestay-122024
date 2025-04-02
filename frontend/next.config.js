/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Remove trailing slash to match Vercel config
  trailingSlash: false,

  // Configure rewrites to handle assets and routes properly
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "/images/:path*", // Maps to public/images directory
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
    unoptimized: true, // Disable image optimization in Next.js
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
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",

  // Ensure CSS is properly extracted and loaded
  webpack: (config, { isServer, dev }) => {
    // Ensure Tailwind CSS processing works correctly
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    // Make sure CSS processing includes PostCSS with Tailwind
    if (rules) {
      rules.forEach((rule) => {
        if (rule.use && Array.isArray(rule.use)) {
          const cssLoader = rule.use.find(
            (u) => u.loader && u.loader.includes("css-loader")
          );
          if (cssLoader && cssLoader.options) {
            // Ensure importLoaders is set correctly for PostCSS
            cssLoader.options.importLoaders =
              rule.use.length - rule.use.indexOf(cssLoader) - 1;
          }
        }
      });
    }

    return config;
  },

  // Disable certain optimizations for debugging
  experimental: {
    scrollRestoration: true,
    // Disable optimizeCss for debugging purposes (re-enable in production)
    optimizeCss: false,
  },
};

module.exports = nextConfig;
