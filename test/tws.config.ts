
export default () => ({
  include: ['test/**/*.tsx'],
  watch: true,
  globalStyle: './test/global.css',
  output: {
    global: './css/global.css',
  },
})
