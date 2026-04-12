import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@hafan/ui', '@hafan/api', '@hafan/auth', '@hafan/db'],
};

export default nextConfig;
