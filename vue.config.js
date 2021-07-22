module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "style/_variable.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        common: '@/common',
        components: '@/components',
        views: '@/views',
        network: '@/network',
        assets: '@/assets',
        style: '@/style'
      }
    }
  }
}
