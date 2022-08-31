import fp from 'fastify-plugin'
import wsPlugin from '@fastify/websocket'

const onRefresh = (server, filepath) => {
  const { websocketServer } = server
  const data = JSON.stringify({
    command: 'reload',
    path: filepath,
  })
  websocketServer.clients.forEach(socket => {
    socket.send(data)
  })
}
export { onRefresh }

export default fp(async (server) => {
  await server.register(wsPlugin)
  server.get('/livereload', { websocket: true }, (connection, req) => {
    server.log.info('「livereload」 connection')
    connection.socket.on('message', message => {
      const request = JSON.parse(message.toString())
      server.log.info(`「livereload」 ${request.command}`)
      if (request.command === 'hello') {
        const data = JSON.stringify({
          command: 'hello',
          protocols: ['http://livereload.com/protocols/official-7', 'http://livereload.com/protocols/official-8', 'http://livereload.com/protocols/official-9', 'http://livereload.com/protocols/2.x-origin-version-negotiation', 'http://livereload.com/protocols/2.x-remote-control'],
          serverName: 'node-livereload'
        })
        connection.socket.send(data)
      }
    })
  })
})

