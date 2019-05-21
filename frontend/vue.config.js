module.exports = {
  configureWebpack: {
    optimization: {
        splitChunks: {
            minSize: 100000,
            maxSize: 2500000
        }
    },
    performance: {
      maxAssetSize: 100000000,
      maxEntrypointSize: 400000000
    }
  },
  publicPath: '/',
  outputDir: '../backend/public/dist'
}