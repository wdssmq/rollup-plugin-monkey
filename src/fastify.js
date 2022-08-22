import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyStatic from './fastify-static'
import fastifyWS from './fastify-ws'
import defConfig from './config'

import monkeyPath from './base'
import fs from 'fs'

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
    }, (err, address) => {
      if (err) {
        this.server.log.error(err)
        // process.exit(1)
      }
    })
    if (this.config.onListen) {
      this.config.onListen(this)
    }
  }
  livereload() {
    this.server.get('/livereload.js', function (req, reply) {
      // console.log(monkeyPath.liveJS)
      // reply.type('text/javascript').sendFile('livereload.js', monkeyPath.livePath)
      fs.readFile(monkeyPath.liveJS, (err, fileBuffer) => {
        reply.type('text/javascript').send(err || fileBuffer)
      })
    })
  }
}

export default Server
