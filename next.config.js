/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ignore type errors
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
