import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  exportTrailingSlash: true,
  images: {
    domains:['pixabay.com', 'source.unsplash.com', 'cdn.pixabay.com'],
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
