module.exports = {
  devServer: {
    // host: 'localhost',
    port: 9000,
    proxy: {
      '/api/': {
        target: process.env.SERVER_PROXY
      }
    }
  }
}
