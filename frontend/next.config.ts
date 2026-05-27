import type { NextConfig } from "next";

const BACKEND = process.env.BACKEND_HOST || "http://localhost:7001";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      { source: "/api/backend/:path*", destination: `${BACKEND}/api/:path*` },
    ];
  },
};

export default nextConfig;
