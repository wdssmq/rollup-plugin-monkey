import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const monkeyPath = {
  base: path.resolve(__dirname, '../'),
  liveJS: path.resolve(__dirname, '../node_modules/livereload-js/dist/livereload.js'),
}

// console.log(Object.assign({}, { __dirname, __filename }, monkeyPath))

export default monkeyPath

