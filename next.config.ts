import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
    reactCompiler: true,
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    optimizeServerReact: true,
  },
} satisfies NextConfig;

export default nextConfig;
