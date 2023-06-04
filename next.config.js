/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cloud.appwrite.io',
      port : '',


    }
    ],

  },
};

module.exports = nextConfig;
