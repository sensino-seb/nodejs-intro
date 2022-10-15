const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  // Solution 1 - test-file is entirely loaded into memory
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err)
  //   res.end(data)
  // })

  // Solution 2 - using streams
  // creates a readable stream to respond to the client
  // const readable = fs.createReadStream('test-ffile.txt')
  // create an event listener on the readable input stream
  // readable.on('data', dataChunk => {
  //   // streaming chunks of data to the client - sent file piece by piece to the client
  //   res.write(dataChunk)
  // })
  // readable.on('end', () => {
  //   // signal that the stream will not send more data and reached the end
  //   res.end('the end')
  // })

  // readable.on('error', err => {
  //   console.log(err)
  //   res.statusCode = 500
  //   res.end('File not found')
  // })

  // Solution 3 - streams with pipe
  // works like this:
  // readableSource.pipe(writeableDestination)
  // fixex the problem of back pressure automatically
  const readable = fs.createReadStream('test-file.txt')
  readable.pipe(res)
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server is listening')
})
