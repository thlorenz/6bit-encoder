'use strict'
/* eslint-disable yoda */

const assert = require('assert')
const ENCODE_OUTOFBOUNDS = 'The number to be encoded is out of bounds '

/*
 * A URL safe char that is not part of the encoding table and
 * can be used as a separator
 *
 * @name SEPARATOR
 */
const SEPARATOR = '*'

function maskForBits(n) {
  return (0b1 << n) - 1
}

function isolate(bits, idx, len) {
  return (bits >> idx) & maskForBits(len)
}

function getDecodingTable(arr) {
  const map = new Map()
  for (var i = 0; i < arr.length; i++) {
    map.set(arr[i], i)
  }
  return map
}

// Based on: https://stackoverflow.com/a/40415059/97443 the following are safe
// A-Z a-z 0-9 - . _ ~ ( ) ' ! * : @ ,
// safe+unsafe: ; $ - _ . + ! * ' ( ),
// Also see: http://www.blooberry.com/indexdot/html/topics/urlencoding.htm
// Two major differences to standard base64: (http://www.motobit.com/util/wiki/Base64)
//  - number digits are encoded at correct index, thus that they don't need to be encoded/decoded
//  - idxs 62 and 63 have been changed to characters that are url safe (from + and =)
const encodingTable = [
  '0', '1', '2', '3', '4', '5', '6', '7',   // 00-07
  '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',   // 08-15
  'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',   // 16-23
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',   // 24-31
  'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',   // 32-39
  'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',   // 40-47
  'm', 'n', 'o', 'p', 'q', 'r', 's', 't',   // 48-55
  'u', 'v', 'w', 'x', 'y', 'z', '-', '_'    // 56-63
]

const decodingTable = getDecodingTable(encodingTable)

/**
 * Decodes one char into a 6 bit number
 *
 * @name decode
 *
 * @param {String} s the char to decode
 * @returns {Number} a 6 bit number
 */
function decode(s) {
  assert.equal(s.length, 1)
  return decodingTable.get(s)
}

/**
 * Decodes two chars into a 12 bit number
 *
 * @name decode2
 *
 * @param {String} s the chars to decode
 * @returns {Number} a 12 bit number
 */
function decode2(s) {
  assert.equal(s.length, 2)
  const [ upper, lower ] = s
  return (decode(upper) << 6) | decode(lower)
}

/**
 * Decodes three chars into an 18 bit number
 *
 * @name decode3
 *
 * @param {String} s the chars to decode
 * @returns {Number} an 18 bit number
 */
function decode3(s) {
  assert.equal(s.length, 3)
  const [ upper, mid, lower ] = s
  return (decode(upper) << 12) | (decode(mid) << 6) | decode(lower)
}

/**
 * Decodes four chars into an 24 bit number
 *
 * @name decode4
 *
 * @param {String} s the chars to decode
 * @returns {Number} a 24 bit number
 */
function decode4(s) {
  assert.equal(s.length, 4)
  const [ upper, belowUpper, aboveLower, lower ] = s
  return (decode(upper) << 18) | (decode(belowUpper) << 12)
    | (decode(aboveLower) << 6) | decode(lower)
}

/**
 * Decodes five chars into an 30 bit number
 *
 * @name decode5
 *
 * @param {String} s the chars to decode
 * @returns {Number} a 30 bit number
 */
function decode5(s) {
  assert.equal(s.length, 5)
  const [ upper, belowUpper, mid, aboveLower, lower ] = s
  return (decode(upper) << 24) | (decode(belowUpper) << 18)
    | (decode(mid) << 12) | (decode(aboveLower) << 6) | decode(lower)
}

/**
 * Encodes a 6 bit number into a URL safe char
 *
 * @name encode
 *
 * @param {Number} n a 6 bit number
 * @returns {String} the char
 */
function encode(n) {
  assert(0 <= n && n <= 0x3f, ENCODE_OUTOFBOUNDS + n)
  // 6 bits -> 1 digit
  return encodingTable[n]
}

/**
 * Encodes a 12 bit number into two URL safe chars
 *
 * @name encode2
 *
 * @param {Number} n a 12 bit number
 * @returns {String} the chars
 */
function encode2(n) {
  assert(0 <= n && n <= 0xfff, ENCODE_OUTOFBOUNDS + n)
  // 12 bits -> 2 digits
  const lower = isolate(n, 0, 6)
  const upper = isolate(n, 6, 6)
  return encode(upper) + encode(lower)
}

/**
 * Encodes a 18 bit number into three URL safe chars
 *
 * @name encode3
 *
 * @param {Number} n a 18 bit number
 * @returns {String} the chars
 */
function encode3(n) {
  assert(0 <= n && n <= 0x3ffff, ENCODE_OUTOFBOUNDS + n)
  // 18 bits -> 3 digits
  const lower = isolate(n, 0, 6)
  const mid = isolate(n, 6, 6)
  const upper = isolate(n, 12, 6)
  return encode(upper) + encode(mid) + encode(lower)
}

/**
 * Encodes a 24 bit number into four URL safe chars
 *
 * @name encode4
 *
 * @param {Number} n a 24 bit number
 * @returns {String} the chars
 */
function encode4(n) {
  assert(0 <= n && n <= 0xffffff, ENCODE_OUTOFBOUNDS + n)
  // 24 bits -> 4 digits
  const lower = isolate(n, 0, 6)
  const aboveLower = isolate(n, 6, 6)
  const belowUpper = isolate(n, 12, 6)
  const upper = isolate(n, 18, 6)
  return encode(upper) + encode(belowUpper)
    + encode(aboveLower) + encode(lower)
}

/**
 * Encodes a 30 bit number into five URL safe chars
 *
 * @name encode5
 *
 * @param {Number} n a 30 bit number
 * @returns {String} the chars
 */
function encode5(n) {
  assert(0 <= n && n <= 0x3fffffff, ENCODE_OUTOFBOUNDS + n)
  // 30 bits -> 5 digits
  const lower = isolate(n, 0, 6)
  const aboveLower = isolate(n, 6, 6)
  const mid = isolate(n, 12, 6)
  const belowUpper = isolate(n, 18, 6)
  const upper = isolate(n, 24, 6)
  return encode(upper) + encode(belowUpper)
    + encode(mid) + encode(aboveLower) + encode(lower)
}

/**
 * Get a decode function to decode n chars
 *
 * @name decodeFor
 *
 * @param {Number} n the number of chars to decode
 * @returns {function} the matching decoding function
 */
function decodeFor(n) {
  return (
      n === 1 ? decode
    : n === 2 ? decode2
    : n === 3 ? decode3
    : n === 4 ? decode4
    : decode5
  )
}

/**
 * Get an encode function to encode an `n * 6` bit number
 *
 * @name encodeFor
 *
 * @param {Number} n number of 6 bits to encode
 * @returns {function} the matching encoding function
 */
function encodeFor(n) {
  return (
      n === 1 ? encode
    : n === 2 ? encode2
    : n === 3 ? encode3
    : n === 4 ? encode4
    : encode5
  )
}

module.exports = {
    encode
  , encode2
  , encode3
  , encode4
  , encode5
  , encodeFor
  , decode
  , decode2
  , decode3
  , decode4
  , decode5
  , decodeFor
  , SEPARATOR
}
