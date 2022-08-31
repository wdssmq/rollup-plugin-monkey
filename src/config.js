const serverDefaults = Object.freeze({
  ignoreTrailingSlash: true,
  disableRequestLogging: true
})

const pluginServer = Object.freeze({
  logger: {
    transport: {
      target: '#pinoPretty',
      // target: "pino-pretty",
      options: {
        colorize: true,
      },
    }
  }
})

const defConfig = {
  cors: {
    origin: '*',
    methods: ['GET']
  },
  static: {
    basePath: undefined,
    dirs: [''],
  },
  listen: {
    host: 'localhost',
    port: 3000,
  },
  server: {
    ...pluginServer,
    ...serverDefaults
  },
  watch: {

  },
  livereload: true,
  force: false,
  extend: undefined,
  onListen: undefined
}

export default defConfig
