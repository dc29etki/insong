module.exports = {
  runtimeCompiler: true,

  devServer: {
      proxy: {
        "/api": {
          target: "localhost"
        }
      }
    },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
