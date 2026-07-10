import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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
export function indexOfAll(str, arr) {
  let bolRlt = true
  arr.forEach((s) => {
    if (!str.includes(s))
      bolRlt = false
  })
  return bolRlt
}
