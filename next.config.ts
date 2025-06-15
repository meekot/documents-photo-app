import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    // гарантирует что Turbopack не пытается обрабатывать UMD
    transpilePackages: ['@tensorflow-models/face-landmarks-detection'],
  }
};

export default nextConfig;
