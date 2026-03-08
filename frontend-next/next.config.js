/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't strip trailing slashes — Django API requires them.
  skipTrailingSlashRedirect: true,

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
