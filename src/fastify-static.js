import { resolve } from 'node:path'
import staticPlugin from '@fastify/static'
import fp from 'fastify-plugin'

export default fp(async (server, { basePath, dirs }) => {
  const prefix = basePath
  const root = dirs.map(dir => resolve(dir))
  server.register(staticPlugin, { prefix, root })
})
