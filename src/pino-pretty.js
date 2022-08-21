import pinoPretty from 'pino-pretty'
import { bold, green, blue } from 'femtocolor'

const header = blue('⚡︎dev-server')

export default opts => pinoPretty({
  ...opts,
  messageFormat: (log, messageKey) => {
    // if (log.reqId) return ""
    // console.log(log, messageKey)
    if (log.msg) {
      if (log.msg.includes('Server listening')) {
        const startup = log.msg.replace('Server listening', header).split('at')
        log.msg = startup[0] + 'listening on' + bold(green(startup[1]))
      }
      return log.msg
    }
  }
})
