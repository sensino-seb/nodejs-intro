const fs = require('fs')
const http = require('http')
const url = require('url')

/////////////////////////////////////////
// FILES

// Blocking synchronous way
/* const fin = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(fin)
const fout = `This is what we know about the avocado: \n ${fin} \n Created on: ${Date.now()}`
fs.writeFileSync('./txt/output.txt', fout)
console.log('File written') */

// Non-blocking asynchronous way
/* fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3)
      const new_output = `${data1}\n${data2}\n${data3}`
      fs.writeFile('./txt/new_outline.txt', new_output, 'utf-8', err => {
        console.log('Your file has been written')
      })
    })
  })
})
console.log('Will read file:') */

/////////////////////////////////////////
// SERVER

// is only executed once and can therefore run in sync mode
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
const dataObj = JSON.parse(data)

// Creating a http server
const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('Hello from /')
  } else if (pathName === '/product') {
    res.end('Hello from product')
  } else if (pathName === '/api') {
    // tell the broswer that we are sending back json
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    })
    res.end('<h1>This page could not be found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Server has been started and is listening on port 8000.')
})
