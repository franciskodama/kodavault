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
        ],
      },
}

module.exports = nextConfig
