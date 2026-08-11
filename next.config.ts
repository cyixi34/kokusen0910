import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "172.18.128.1", "192.168.4.29"],
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
