# 6bit-encoder [![build status](https://secure.travis-ci.org/thlorenz/6bit-encoder.svg?branch=master)](http://travis-ci.org/thlorenz/6bit-encoder)

Encodes 6bit numbers (0..63) to URL safe chars.

```js
const assert = require('assert')
const { encode, encode5, decode, decode5 } = require('6bit-encoder')

assert.equal(encode(0b001111), 'F')
assert.equal(encode5(0b011111011111011111011111011111), 'VVVVV')
assert.equal(decode('F'), 0b001111)
assert.equal(decode5('VVVVV'), 0b011111011111011111011111011111)
```

## Installation

    npm install 6bit-encoder

## [API](https://thlorenz.github.io/6bit-encoder)


## License

MIT
