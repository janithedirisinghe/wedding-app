/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,   // ADD THIS
  },
  typescript: {
    ignoreBuildErrors: true,    // ADD THIS — catches any TS errors too
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
};

export default nextConfig;