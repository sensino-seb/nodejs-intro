// Class declaration

// class Calculator {
//   add(a, b) {
//     return a + b
//   }

//   subtract(a, b) {
//     return a - b
//   }

//   multiply(a, b) {
//     return a * b
//   }

//   divide(a, b) {
//     return b != 0 ? a / b : 'You cannot divide by 0'
//   }
// }

// export as class expression
module.exports = class {
  add(a, b) {
    return a + b
  }

  subtract(a, b) {
    return a - b
  }

  multiply(a, b) {
    return a * b
  }

  divide(a, b) {
    return b != 0 ? a / b : 'You cannot divide by 0'
  }
}
