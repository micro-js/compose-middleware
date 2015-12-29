/**
 * Modules
 */

var identity = require('@f/identity')

/**
 * Expose composeReduxWare
 */

module.exports = composeReduxWare['default'] = composeReduxWare

/**
 * Compose redux style middlewares
 * @param  {Array} middleware
 * @return {Function} A single redux middleware that is a composition of `middleware`.
 * @api public
 */

function composeReduxWare (middleware) {
  return function (ctx) {
    var chain = middleware.map(function (mw) {
      return mw(ctx)
    })
    return function (next) {
      var dispatch = compose(chain, next)
      return function (action) {
        return dispatch(action)
      }
    }
  }
}

/**
 * Compose funcs
 * @param  {Array} funcs
 * @param  {Function} next function to call
 * @return {Function} A function obtained by composing funcs from right to left.
 * @api private
 */

function compose (funcs, next) {
  var last = funcs[funcs.length - 1]
  var rest = funcs.slice(0, -1)
  return rest.reduceRight(function (composed, f) {
    return f(composed)
  }, last(next || identity))
}
