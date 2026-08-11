import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell webpack not to bundle these Node.js-only packages for the browser
  serverExternalPackages: ["mysql2"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
