import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kokusen0910",
  allowedDevOrigins: ["localhost", "172.18.128.1", "192.168.4.29"],
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
