/** @type {import('next').NextConfig} */

const nextConfig = {
    // experimental: {
    //     serverActions: true
    // }
    images: {
        unoptimized: false,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**.cloudfront.net",
          },
        ],
        domains: [
          "alternative.me",
        ],
      },
}

module.exports = nextConfig
