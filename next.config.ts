import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  exportTrailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com'
      }
    ],
  },
};

export default nextConfig;
