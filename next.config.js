/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ['lh3.googleusercontent.com','s.gravatar.com'],
  },
  env: {
    SITE_TITLE: process.env.SITE_TITLE,
  },
}

module.exports = nextConfig
