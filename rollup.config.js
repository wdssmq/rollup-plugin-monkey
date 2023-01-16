import pkg from './package.json'

const banner = '/* eslint-disable */'
const external = [
  'fs',
  'node:module',
  'path',
  'url',
  ...Object.keys(pkg.dependencies)
]

export default [
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs', banner, exports: 'named' },
      { file: pkg.module, format: 'esm', banner }
    ],
    external
  },
  {
    input: 'src/__pino-pretty.js',
    output: [
      { file: pkg.imports['#pinoPretty'], format: 'esm', banner }
    ],
    external
  },
  {
    input: 'src/__dev.js',
    output: [
      { file: pkg.imports['#dev'], format: 'esm', banner }
    ],
    external
  }
]
