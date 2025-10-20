/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CV',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
