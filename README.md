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

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

-   [API](#api)
    -   [SEPARATOR](#separator)
    -   [decode](#decode)
    -   [decode2](#decode2)
    -   [decode3](#decode3)
    -   [decode4](#decode4)
    -   [decode5](#decode5)
    -   [encode](#encode)
    -   [encode2](#encode2)
    -   [encode3](#encode3)
    -   [encode4](#encode4)
    -   [encode5](#encode5)
    -   [decodeFor](#decodefor)
    -   [encodeFor](#encodefor)
-   [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [API](https://thlorenz.github.io/6bit-encoder)

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### SEPARATOR

A URL safe char that is not part of the encoding table and
can be used as a separator: `'*'`

Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### SEPARATORS

Remaining URL safe chars that are not part of the encoding table and
can be used as a separator: `; , . ~ ( ' ) ! * : @`

Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### decode

Decodes one char into a 6 bit number

**Parameters**

-   `s` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the char to decode

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 6 bit number

### decode2

Decodes two chars into a 12 bit number

**Parameters**

-   `s` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars to decode

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 12 bit number

### decode3

Decodes three chars into an 18 bit number

**Parameters**

-   `s` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars to decode

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** an 18 bit number

### decode4

Decodes four chars into an 24 bit number

**Parameters**

-   `s` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars to decode

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 24 bit number

### decode5

Decodes five chars into an 30 bit number

**Parameters**

-   `s` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars to decode

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 30 bit number

### encode

Encodes a 6 bit number into a URL safe char

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 6 bit number

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the char

### encode2

Encodes a 12 bit number into two URL safe chars

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 12 bit number

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars

### encode3

Encodes a 18 bit number into three URL safe chars

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 18 bit number

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars

### encode4

Encodes a 24 bit number into four URL safe chars

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 24 bit number

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars

### encode5

Encodes a 30 bit number into five URL safe chars

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a 30 bit number

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the chars

### decodeFor

Get a decode function to decode n chars

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the number of chars to decode

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** the matching decoding function

### encodeFor

Get an encode function to encode an `n * 6` bit number

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of 6 bits to encode

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** the matching encoding function

## License

MIT
