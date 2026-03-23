import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
