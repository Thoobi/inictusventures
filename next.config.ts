import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 95 is used for small source photos (e.g. DAM guests) that look soft at 75.
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
