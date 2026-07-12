import { execFile } from 'node:child_process'
import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const templateDir = path.join(rootDir, 'template')
const targetDir = path.join(rootDir, 'test', 'gm')
const targetDirRelative = path.relative(rootDir, targetDir)
const execFileAsync = promisify(execFile)

const gmParams = {
  name: 'gm-test',
  description: 'try to take over the world!',
  match: 'http://127.0.0.1:3000/,http://localhost:3000/',
  namespace: 'https://www.wdssmq.com/',
}

const generatedDir = path.join(templateDir, 'output', gmParams.name)
const targetIndexContent = `<html>
  <head>
    <title>plugin monkey - ${gmParams.name}</title>
  </head>
  <body>
    <p>Hello, world!</p>
  </body>
</html>
`

async function postProcessTarget() {
  const targetRollup = path.join(targetDir, 'rollup.config.mjs')
  const rollupContent = await readFile(targetRollup, 'utf8')
  const alignedRollup = rollupContent
    .replace('// for prod', '// for test')
    .replace('import monkey, { monkeyPath, monkeyRequire } from \'rollup-plugin-monkey\'', 'import monkey, { monkeyPath, monkeyRequire } from \'../../dist/index.mjs\'')
  await writeFile(targetRollup, alignedRollup)

  const targetIndex = path.join(targetDir, 'index.html')
  await writeFile(targetIndex, targetIndexContent)
}

async function main() {
  await execFileAsync('pnpm', [
    '--dir',
    templateDir,
    'run',
    'gen:gm',
    '--',
    '--name',
    gmParams.name,
    '--description',
    gmParams.description,
    '--match',
    gmParams.match,
    '--namespace',
    gmParams.namespace,
  ], {
    cwd: rootDir,
  })

  await rm(targetDir, { recursive: true, force: true })
  await cp(generatedDir, targetDir, { recursive: true, force: true })
  await postProcessTarget()

  process.stdout.write(`Synced template/gm-base to ${targetDirRelative} and applied target-only alignment (name=${gmParams.name})\n`)
}

main().catch((error) => {
  process.stderr.write(`${error?.stack || error}\n`)
  process.exitCode = 1
})
