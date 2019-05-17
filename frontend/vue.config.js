module.exports = {
  configureWebpack: {
    optimization: {
        splitChunks: {
            minSize: 100000,
            maxSize: 2500000
        }
    },
    performance: {
      maxAssetSize: 1000000,
      maxEntrypointSize: 4000000
    }
  },
  publicPath: '/',
  outputDir: '../backend/public/dist'
}