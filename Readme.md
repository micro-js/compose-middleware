
# compose-redux-ware

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

True redux middleware composition.

## Installation

    $ npm install @f/compose-redux-ware

## Usage

```js
var composeReduxWare = require('@f/compose-redux-ware')
var redux = require('redux')
var logger = require('redux-logger')
var thunk = require('redux-thunk')

var ware = composeReduxWare([
  thunk,
  logger()
])

var createStore = redux.applyMiddleware(ware)(redux.createStore)
```

## API

### composeReduxWare(middleware)

- `middleware` - An array of redux style middleware.

**Returns:** A single redux style middleware function that is a composition of `middleware`.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/compose-redux-ware.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/compose-redux-ware
[git-image]: https://img.shields.io/github/tag/micro-js/compose-redux-ware.svg
[git-url]: https://github.com/micro-js/compose-redux-ware
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/compose-redux-ware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/compose-redux-ware
