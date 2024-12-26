/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  basePath: '/Mokpopko_ferme',
  assetPrefix: '/Mokpopko_ferme/',
  trailingSlash: true,
  // Ajout de la configuration des images
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig
