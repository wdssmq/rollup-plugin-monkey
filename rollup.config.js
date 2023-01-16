import pkg from './package.json'

export default [
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'esm', banner: '/* eslint-disable */' }
    ],
    external: ['path', ...Object.keys(pkg.dependencies)]
  },
  {
    input: 'src/__pino-pretty.js',
    output: [
      { file: pkg.imports['#pinoPretty'], format: 'esm', banner: '/* eslint-disable */' }
    ],
    external: ['path', ...Object.keys(pkg.dependencies)]
  },
  {
    input: 'src/__dev.js',
    output: [
      { file: pkg.imports['#dev'], format: 'esm', banner: '/* eslint-disable */' }
    ],
    external: ['path', ...Object.keys(pkg.dependencies)]
  }
]
