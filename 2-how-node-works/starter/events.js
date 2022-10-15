const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter {
  constructor() {
    super()
  }
}

const myEmitter = new Sales()

myEmitter.on('newSale', () => {
  console.log('There was a new sale!')
})

myEmitter.on('newSale', () => {
  console.log('Customer name: Sebastian')
})

myEmitter.on('newSale', stock => {
  console.log(`There are ${stock} items left in stock.`)
})

myEmitter.emit('newSale', 10)

/////////////////////////////////////////
// create a server and listen for event

const server = http.createServer()

server.on('request', (req, res) => {
  console.log('Request received')
  res.end('Request received')
})

server.on('request', (req, res) => {
  console.log('Another request received')
})

server.on('close', () => {
  console.log('server closing down')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server is listening on port 8000')
})
