const http = require('http')
const fs = require('fs')
const path = require('path')

const LOG_FILE = path.join(__dirname, 'visitors.log')
const PORT = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const ua = req.headers['user-agent'] || 'unknown'
  const time = new Date().toISOString()
  const ref = req.headers['referer'] || 'direct'
  const line = `[${time}] IP: ${ip} | UA: ${ua} | Referer: ${ref}\n`

  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error('Write error:', err)
  })

  // CORS for all origins
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
  })
  res.end('ok')
})

server.listen(PORT, () => {
  console.log(`Tracker running on port ${PORT}`)
  console.log(`Logging to ${LOG_FILE}`)
})
