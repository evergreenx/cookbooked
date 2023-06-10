/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
   
      },
      // cloudinary
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",

        //   // path: '/dofqucuyy/image/upload/v1634173899/',
      },
    ],
  },
};

module.exports = nextConfig;
