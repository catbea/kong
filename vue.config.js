var resolve = require('path').resolve

module.exports = {
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 80,
    disableHostCheck: true
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('COMP', resolve(__dirname, './src/components'))
      .set('SERVICE', resolve(__dirname, './src/services'))
      .set('ASSETS', resolve(__dirname, './src/assets'))
      .set('IMG', resolve(__dirname, './src/assets/img'))
  }
}
