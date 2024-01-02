/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["trakteer.id"],
  },
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push("@sparticuz/chromium");
    return config;
  },
};

module.exports = nextConfig;
