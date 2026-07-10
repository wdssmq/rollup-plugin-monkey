import fs from 'node:fs'
import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import monkeyPath from './base'
import defConfig from './config'

import fastifyStatic from './fastify-static'
import fastifyWS from './fastify-ws'

class Server {
  async init(config = defConfig) {
    this.config = config
    this.server = fastify(config.server)
    if (config.livereload) {
      this.server.register(fastifyWS)
      this.livereload()
    }
    this.server.register(fastifyStatic, config.static)
    this.server.register(fastifyCors, config.cors)
    await this.server.ready()
    return this
  }

  start() {
    this.server.listen({
      host: this.config.listen.host,
      port: this.config.listen.port,
    }, (err, _address) => {
      if (err) {
        this.server.log.error(err)
        // process.exit(1)
      } else {
        if (this.config.onListen) {
          this.config.onListen(this)
        }
      }
    })
  }

  livereload() {
    this.server.get('/livereload.js', (req, reply) => {
      // console.log(monkeyPath.liveJS)
      // reply.type('text/javascript').sendFile('livereload.js', monkeyPath.livePath)
      fs.readFile(monkeyPath.liveJS, (err, fileBuffer) => {
        if (err) {
          reply.code(500).type('text/plain').send('Failed to load livereload.js')
          return
        }
        reply.type('text/javascript').send(fileBuffer)
      })
    })
  }
}

export default Server
