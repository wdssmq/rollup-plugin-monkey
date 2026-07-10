import monkeyPath, { indexOfAll } from './base.js'
import defConfig from './config'
import Fastify from './fastify'
import { onRefresh } from './fastify-ws'

import watcher from './watcher'

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function mergeConfig(base, extra) {
  const merged = { ...base }
  Object.keys(extra || {}).forEach((key) => {
    const baseValue = base?.[key]
    const extraValue = extra[key]
    if (isPlainObject(baseValue) && isPlainObject(extraValue)) {
      merged[key] = mergeConfig(baseValue, extraValue)
      return
    }
    merged[key] = extraValue
  })
  return merged
}

export default (opts = {}) => {
  let booted = false
  return {
    name: 'dev-monkey',
    async writeBundle() {
      if (booted)
        return
      booted = true
      try {
        const config = mergeConfig(defConfig, opts)
        if (!this.meta.watchMode) {
          if (!config.force)
            return
          else this.warn('Starting dev-monkey even though we\'re not in watch mode')
        }
        const web = new Fastify()
        await web.init(config)
        web.start()
        if (config.livereload) {
          watcher(config.watch, (event, path) => {
            // const isInfo = path.indexOf('__info') > -1
            const isDevMain = indexOfAll(path, ['dev', 'main.js'])
            web.server.log.info(`${event} ${path}`)
            if (isDevMain) {
              onRefresh(web.server, path)
            }
          })
        }
      } catch (err) {
        this.error(err)
      }
    },
  }
}

function monkeyRequire(arrOpts) {
  const entryList = []
  const apiList = []
  arrOpts.forEach((s) => {
    entryList.push(s.url)
    apiList.push(s.func)
  })
  return {
    gm_entry: JSON.stringify(entryList),
    gm_api: JSON.stringify(apiList),
    gm_require: arrOpts.map(s => `// @require      ${s.url}`).join('\n'),
  }
}

export {
  monkeyPath,
  monkeyRequire,
}
