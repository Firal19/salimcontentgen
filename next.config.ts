import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable standalone output for better deployment compatibility
  output: 'standalone',
  // Disable experimental features for stability
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk']
  },
  // Ensure API routes work properly
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
};

export default nextConfig;