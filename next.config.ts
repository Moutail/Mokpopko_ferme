import type { Configuration } from 'webpack'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Mokpopko_ferme',
  assetPrefix: '/Mokpopko_ferme/',
  trailingSlash: true,
  // Ajout de la configuration des images avec typage correct
  webpack: (config: Configuration) => {
    config.module?.rules?.push({
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
    })
    return config
  },
}

export default nextConfig
