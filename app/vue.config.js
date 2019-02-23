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
}
