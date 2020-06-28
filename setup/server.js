import restify from 'restify'

export const server = restify.createServer()

server.use(
  restify.plugins.queryParser({
    mapParams: false,
    allowDots: true,
  })
)

server.use(
  restify.plugins.bodyParser({
    mapParams: false,
  })
)

server.start = (onStart) => {
  server.listen(3000, '0.0.0.0', onStart)
  return server
}
