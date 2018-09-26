const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([{
        from: 'node_modules/idb/lib/idb.js',
        to: 'js/idb.js'
      }])
    ]
  },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    debug: true,
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    }
  },
}
