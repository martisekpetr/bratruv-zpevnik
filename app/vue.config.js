// vue.config.js
module.exports = {
  chainWebpack: config => {
    // PDF Loader
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'files/[name].[ext]',
      })
      .end()
  },
  // assetsDir: 'static',
  pwa: {
    manifestPath: 'static/manifest.json',
    themeColor: '#fff',
    msTileColor: '#fff',
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      swDest: 'static/service-worker.js',
    },

  },
}
