import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      /*{
        protocol: 'https',
        hostname: 'imperator-next.web.app',
        port: '',
        pathname: '/**',
      },*/
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '11mb',
    }
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
