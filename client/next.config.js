/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Provide the path to the messages that you're using in `AppConfig`
    createMessagesDeclaration: './messages/el.json'
  }
}
);

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
      // Allow images from all domains for testing
      {
        protocol: "https",
        hostname: "*", // Allow images from all domains
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
