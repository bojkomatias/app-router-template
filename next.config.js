/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/**/*',
      },
    ],
  }
}

module.exports = nextConfig
