import { blue, bold, green } from 'femtocolor'
import pinoPretty from 'pino-pretty'

const header = blue('⚡︎dev-server')
const _url = url => bold(green(url))

export default opts => pinoPretty({
  ...opts,
  messageFormat: (log, _messageKey) => {
    // if (log.reqId) return ""
    // console.log(log, messageKey)
    if (log.msg) {
      log.msg = log.msg.replace('{{url}}', _url(log.url))
      log.msg = log.msg.replace('{{header}}', header)
      // 删除字段
      delete log.url
      delete log.reqId
      return log.msg
    }
  },
})
