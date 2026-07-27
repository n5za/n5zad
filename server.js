const http = require('http')
const fs = require('fs')
const path = require('path')

const LOG_FILE = path.join(__dirname, 'visitors.log')
const PORT = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // View logs
  if (req.url === '/logs' && req.method === 'GET') {
    fs.readFile(LOG_FILE, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('No logs yet')
        return
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(data)
    })
    return
  }

  // Track endpoint (or /track)
  if (req.url === '/track' || req.url === '/') {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const ua = req.headers['user-agent'] || 'unknown'
    const time = new Date().toISOString()
    const ref = req.headers['referer'] || 'direct'
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      const line = `[${time}] IP: ${ip} | UA: ${ua} | Referer: ${ref} | Data: ${body}\n`
      fs.appendFile(LOG_FILE, line, (err) => {
        if (err) console.error('Write error:', err)
      })
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('ok')
    })
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(PORT, () => {
  console.log(`Tracker running on port ${PORT}`)
  console.log(`Logging to ${LOG_FILE}`)
})
