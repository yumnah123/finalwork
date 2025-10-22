import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // allow images from your Keystone local server
  },
};

export default nextConfig;
