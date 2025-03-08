/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["localhost"],
  },
  experimental: {
    webpackBuildWorker: true,
  },
};

export default nextConfig;