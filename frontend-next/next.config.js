/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from the Django API
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.library.costico.eu",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
