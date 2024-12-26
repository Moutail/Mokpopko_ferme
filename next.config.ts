/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Mokpopko_ferme' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Mokpopko_ferme/' : '',
}

module.exports = nextConfig
