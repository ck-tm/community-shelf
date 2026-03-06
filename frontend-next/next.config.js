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

  // Proxy /api requests to Django — avoids CORS issues in dev
  // and keeps client-side fetches same-origin so cookies work.
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
