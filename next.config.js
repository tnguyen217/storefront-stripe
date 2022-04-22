/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`firebasestorage.googleapis.com`]
  },
  revalidate: 60
}

module.exports = nextConfig
