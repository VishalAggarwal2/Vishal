/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
