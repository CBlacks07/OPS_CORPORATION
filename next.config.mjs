import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  typedRoutes: true,
  turbopack: {}
};

export default withNextIntl(nextConfig);