import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/copy-of-menu',
        destination: '/menu',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/menu',
        has: [
          {
            type: 'query',
            key: 'menu',
            value: 'dinner-menu',
          },
        ],
        destination: '/menu',
        permanent: true,
      }
    ];
  },
  images: {
    // Serve WebP/AVIF — smaller file sizes with same visual quality
    formats: ["image/avif", "image/webp"],
    // Common mobile breakpoints to ensure correct srcset sizes are generated
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "fat-chef-pages.vercel.app",
        pathname: "/menu/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/fat-chef-assets/**",
      },
    ],
  },
};

export default nextConfig;
