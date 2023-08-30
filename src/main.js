import defConfig from './config'
import fastify from './fastify'
import watcher from './watcher'
import { onRefresh } from './fastify-ws'

import monkeyPath, { indexOfAll } from './base.js'

export default (opts = {}) => {
  let booted = false
  return {
    name: 'dev-monkey',
    async writeBundle() {
      if (booted) return
      booted = true
      try {
        const config = Object.assign({}, defConfig, opts)
        if (!this.meta.watchMode) {
          if (!config.force) return
          else this.warn('Starting dev-monkey even though we\'re not in watch mode')
        }
        const web = new fastify()
        await web.init(config)
        web.start()
        if (config.livereload) {
          watcher(config.watch, (event, path) => {
            // const isInfo = path.indexOf('__info') > -1
            const isDevMain = indexOfAll(path, ["dev", "main.js"])
            web.server.log.info(`${event} ${path}`)
            if (isDevMain) {
              onRefresh(web.server, path)
            }
          })
        }
      } catch (err) {
        this.error(err)
      }
    }
  }
}

const monkeyRequire = (arrOpts) => {
  const entryList = []
  const apiList = []
  arrOpts.forEach((s) => {
    entryList.push(s.url)
    apiList.push(s.func)
  })
  return {
    gm_entry: JSON.stringify(entryList),
    gm_api: JSON.stringify(apiList),
    gm_require: arrOpts.map((s) => `// @require      ${s.url}`).join('\n'),
  }
}

export {
  monkeyPath,
  monkeyRequire
}
