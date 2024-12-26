/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'default',
    path: '',
  },
  assetPrefix: '/Mokpopko_ferme', // Corrigé ici : on utilise un slash au début au lieu de './'
  basePath: '/Mokpopko_ferme',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: 'static/media/[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig
