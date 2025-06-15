/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
      },
      // hostname "b.scdn.gr" 
      /**
       * Error: Invalid src prop (https://d.scdn.gr/images/sku_main_images/033342/33342178/large_20220107170157_samsung_galaxy_s21_fe_5g_8gb_256gb_white.jpeg) on `next/image`, hostname "d.scdn.gr" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
       */
      {
        protocol: 'https',
        hostname: '*.scdn.gr',
        port: '',
        pathname: '/images/**',
      },
      // https://storage.googleapis.com/minas-phone-product-images-dev/1699625155009.jpeg
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/minas-phone-product-images-dev/**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig))
