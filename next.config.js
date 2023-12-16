/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ['lh3.googleusercontent.com','s.gravatar.com','stack-image-save-bucket.s3.ap-northeast-1.amazonaws.com'],
  },
  env: {
    SITE_TITLE: process.env.SITE_TITLE,
    API_ROOT_URL: process.env.API_ROOT_URL,
  },
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
}

module.exports = nextConfig
