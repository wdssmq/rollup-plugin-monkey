import { resolve } from 'node:path'
import process from 'node:process'
import chokidar from 'chokidar'

const defaultExclusions = [/\.git\//, /\.svn\//, /\.hg\//, /node_modules\//]

export default function (config, act = () => { }) {
  const exclusions = (config.exclusions || []).concat(defaultExclusions)
  const dirs = config.dirs || ''
  let paths
  if (Array.isArray(dirs)) {
    paths = dirs.map(item => resolve(process.cwd(), item))
  } else {
    paths = resolve(process.cwd(), dirs)
  }
  return chokidar.watch(paths, {
    ignoreInitial: true,
    usePolling: false,
    ignored: exclusions,
  }).on('all', (event, path) => {
    if (event === 'add' || event === 'change' || event === 'unlink') {
      act(event, path)
    }
  })
}
