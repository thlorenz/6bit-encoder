'use strict'

const assert = require('assert')
const { encode, encode5, decode, decode5 } = require('../')

assert.equal(encode(0b001111), 'F')
assert.equal(encode5(0b011111011111011111011111011111), 'VVVVV')
assert.equal(decode('F'), 0b001111)
assert.equal(decode5('VVVVV'), 0b011111011111011111011111011111)
