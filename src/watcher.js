import chokidar from 'chokidar'
import { resolve } from 'path'

const defaultExclusions = [/\.git\//, /\.svn\//, /\.hg\//]

export default function (config, act = () => { }) {
  config.exclusions = config.exclusions || []
  config.exclusions = config.exclusions.concat(defaultExclusions)
  config.dirs = config.dirs || ''
  let paths
  if (Array.isArray(config.dirs)) {
    paths = config.dirs.map(item => resolve(process.cwd(), item))
  } else {
    paths = resolve(process.cwd(), config.dirs)
  }
  return chokidar.watch(paths, {
    ignoreInitial: true,
    ignored: config.exclusions,
    usePolling: config.usePolling
  }).on('all', (event, path) => {
    if (event === 'add' || event === 'change' || event === 'unlink') {
      act(event, path)
    }
  })
}
