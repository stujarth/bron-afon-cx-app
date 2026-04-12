import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@hafan/ui', '@hafan/api', '@hafan/auth', '@hafan/db'],
};

export default withNextIntl(nextConfig);
