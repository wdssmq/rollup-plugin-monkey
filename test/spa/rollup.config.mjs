import monkey from '#monkey'

export default {
  input: './app.js',
  output: {
    file: './dist/main.js',
    format: 'esm',
    banner: '/* eslint-disable */'
  },
  plugins: [
    monkey('.')
  ],
  watch: {
    clearScreen: false
  }
}
