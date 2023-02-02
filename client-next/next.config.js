/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // Domains of images used
    domains: ['www.brokencare.in', 'i.ibb.co'],
  },
};

module.exports = nextConfig;
