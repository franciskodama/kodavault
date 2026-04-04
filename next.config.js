/** @type {import('next').NextConfig} */

const nextConfig = {
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
          {
            protocol: "https",
            hostname: "www.gstatic.com",
          },
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
          },
        ],
      },
}

module.exports = nextConfig
