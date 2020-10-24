module.exports = {
  runtimeCompiler: true,
 
  devServer: {
      https: false,
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
