/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@maker-test-one/schema', '@maker-test-one/hooks', '@maker-test-one/ui'],
};

module.exports = nextConfig;
