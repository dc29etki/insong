module.exports = {
  runtimeCompiler: true,
  devServer: {
      proxy: {
        "/api": {
          target: "localhost"
        }
      }
    }
}