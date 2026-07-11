/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@better-auth/kysely-adapter', 'kysely'],
  output: "standalone",
  reactCompiler: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 1000,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
