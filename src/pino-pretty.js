import pinoPretty from 'pino-pretty'
import { bold, green, blue } from 'femtocolor'

const header = blue('⚡︎dev-server')
const _url = (url) => bold(green(url))

export default opts => pinoPretty({
  ...opts,
  messageFormat: (log, messageKey) => {
    // if (log.reqId) return ""
    // console.log(log, messageKey)
    if (log.msg) {
      if (log.msg.includes('Server listening')) {
        const startup = log.msg.replace('Server listening', header).split('at')
        log.msg = startup[0] + 'listening on' + _url(startup[1])
      }
      log.msg = log.msg.replace('{{url}}', _url(log.url))
      log.msg = log.msg.replace('{{header}}', header)
      // 删除字段
      delete log.url
      delete log.reqId
      return log.msg
    }
  }
})
