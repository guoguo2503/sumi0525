/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_WEBPACK_DISABLE_FILE_SYSTEM_CACHE: 'true',
  },
  webpack: (config, { dev, isServer }) => {
    // Disable the webpack cache
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;