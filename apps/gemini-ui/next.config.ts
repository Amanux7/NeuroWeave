import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/weaver/:path*",
        destination: "http://weaver:8000/api/:path*", // Proxy to Weaver engine
      },
      {
        source: "/api/drift-guard/:path*",
        destination: "http://drift-guard:8001/api/:path*", // Proxy to Drift-Guard engine
      },
      {
        source: "/api/context-bridge/:path*",
        destination: "http://context-bridge:8002/api/:path*", // Proxy to Context-Bridge engine
      },
    ];
  },
};

export default nextConfig;
