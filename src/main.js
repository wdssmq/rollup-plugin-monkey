import defConfig from './config'
import fastify from './fastify'
import watcher from './watcher'
import { onRefresh } from './fastify-ws'

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
            web.server.log.info(`${event} ${path}`)
            onRefresh(web.server, path)
          })
        }
      } catch (err) {
        this.error(err)
      }
    }
  }
}

import monkeyPath from './base'

export {
  monkeyPath
}
