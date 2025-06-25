/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@autocare/ui"],
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig