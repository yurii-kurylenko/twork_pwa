const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/sw/idb.js',
          to: 'js/idb.js'
        },
        {
          from: 'src/sw/sw-background-sync.js',
          to: 'js/sw-background-sync.js'
        },
        {
          from: 'src/sw/sw-push.js',
          to: 'js/sw-push.js'
        }
      ])
    ]
  },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    debug: true,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      importScripts: ['js/idb.js', 'js/sw-background-sync.js', 'js/sw-push.js']
    }
  },
}
