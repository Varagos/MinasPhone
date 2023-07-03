/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    modularizeImports: {
      '@mui/material/?(((\\w*)?/?)*)': {
        transform: '@mui/material/{{ matches.[1] }}/{{member}}',
      },
    },
  },
  images: {
    // Domains of images used
    domains: ['www.brokencare.in', 'i.ibb.co'],
  },
};

module.exports = nextConfig;
