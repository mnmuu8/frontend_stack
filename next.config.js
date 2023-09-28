/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ['lh3.googleusercontent.com','s.gravatar.com'],
  },
  env: {
    SITE_TITLE: process.env.SITE_TITLE,
    API_ROOT_URL: process.env.API_ROOT_URL,
  },
}

module.exports = nextConfig
