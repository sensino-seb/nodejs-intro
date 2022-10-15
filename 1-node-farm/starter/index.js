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

// helper function
const replaceTemp = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%COUNTRY%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%ID%}/g, product.id)

  // add class if product is not organic
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

  return output
}

// is only executed once and can therefore run in sync mode
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf8'
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf8'
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
const dataObj = JSON.parse(data)

// Creating a http server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })

    // replace placeholders with JSON data
    const cardHtml = dataObj.map(el => replaceTemp(tempCard, el)).join('')
    const output = tempOverview.replace(/%PRODUCT_CARDS%/g, cardHtml)

    res.end(output)

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    const product = dataObj[query.id]
    const output = replaceTemp(tempProduct, product)
    res.end(output)

    // API page
  } else if (pathname === '/api') {
    // tell the broswer that we are sending back json
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })

    // Not found
    res.end('<h1>This page could not be found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Server has been started and is listening on port 8000.')
})
