module.exports = {
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'Noto Sans',
        'Helvetica Neue',
        'Helvetica',
        'Nimbus Sans L',
        'Arial',
        'Liberation Sans',
        'PingFang SC',
        'Hiragino Sans GB',
        'Noto Sans CJK SC',
        'Source Han Sans SC',
        'Source Han Sans CN',
        'Noto Sans SC',
        'Microsoft YaHei',
        'Wenquanyi Micro Hei',
        'WenQuanYi Zen Hei',
        'ST Heiti',
        'SimHei',
        'WenQuanYi Zen Hei Sharp',
        'sans-serif',
      ],
    },
    fontWeight: {
      normal: '400',
      bold: '700',
      black: '900',
    },
  },
  purge: [
    './**/*.vue',
  ],
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
