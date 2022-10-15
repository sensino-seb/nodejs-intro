// console.log(arguments)
// console.log(require('module').wrapper)

// module.exports
const Calculator = require('./test-module-1')
const calc1 = new Calculator()
console.log(calc1.add(2, 3))

// exports
const { add, subtract, multiply, divide } = require('./test-module-2')
console.log(subtract(10, 6))

// caching - logging only appears once
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()
