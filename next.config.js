/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
    images: {
        unoptimized: false,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**.cloudfront.net",
          },
          {
            protocol: "https",
            hostname: "alternative.me",
          },
          {
            protocol: "https",
            hostname: "coin-images.coingecko.com",
          },
        ],
      },
}

module.exports = nextConfig
