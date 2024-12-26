/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Mokpopko_ferme',
  assetPrefix: '/Mokpopko_ferme/',
  trailingSlash: true,
}

module.exports = nextConfig
