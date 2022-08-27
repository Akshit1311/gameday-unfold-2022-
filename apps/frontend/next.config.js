/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  experimental: {
    images: {
      unoptimized: true,
    },
  },
  images: {
    domains: ["upload.wikimedia.org"],
  },
};
