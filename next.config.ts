import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "1000mb", // or "50mb"
    },
  },
  /* config options here */
};

export default nextConfig;
