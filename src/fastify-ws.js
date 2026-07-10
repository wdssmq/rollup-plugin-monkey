import wsPlugin from '@fastify/websocket'
import fp from 'fastify-plugin'

function onRefresh(server, filepath) {
  const { websocketServer } = server
  const data = JSON.stringify({
    command: 'reload',
    path: filepath,
  })
  websocketServer.clients.forEach((socket) => {
    if (socket.readyState === 1) {
      socket.send(data)
    }
  })
}
export { onRefresh }

export default fp(async (server) => {
  await server.register(wsPlugin)
  server.get('/livereload', { websocket: true }, (connection, _req) => {
    server.log.info('「livereload」 connection')
    connection.socket.on('message', (message) => {
      try {
        const request = JSON.parse(message.toString())
        server.log.info(`「livereload」 ${request.command}`)
        if (request.command === 'hello') {
          const data = JSON.stringify({
            command: 'hello',
            protocols: ['http://livereload.com/protocols/official-7', 'http://livereload.com/protocols/official-8', 'http://livereload.com/protocols/official-9', 'http://livereload.com/protocols/2.x-origin-version-negotiation', 'http://livereload.com/protocols/2.x-remote-control'],
            serverName: 'node-livereload',
          })
          connection.socket.send(data)
        }
      } catch (err) {
        server.log.warn({ err }, '「livereload」 invalid message')
      }
    })
  })
})
