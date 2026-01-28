import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude @react-pdf/renderer from serverless bundling
  serverExternalPackages: ['@react-pdf/renderer'],
};

export default nextConfig;
