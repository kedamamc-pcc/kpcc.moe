module.exports = {
  proxy: {
    '/stats-data': {
      target: 'https://kedamamc-pcc.github.io',
      changeOrigin: true,
    },
  },
}
