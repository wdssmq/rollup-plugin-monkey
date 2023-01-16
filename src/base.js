import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const monkeyPath = {
  base: path.resolve(__dirname, '../'),
  liveJS: require.resolve('livereload-js'),
  devJS: require.resolve('#dev'),
}

// console.log(Object.assign({}, { __dirname, __filename }, monkeyPath))

export default monkeyPath

