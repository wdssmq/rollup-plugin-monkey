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

// 一个函数，判断输入字符串同时含有数组中的所有元素
export const indexOfAll = (str, arr) => {
  let bolRlt = true
  arr.forEach((s) => {
    if (str.indexOf(s) === -1) bolRlt = false
  })
  return bolRlt
}
