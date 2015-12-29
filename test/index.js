/**
 * Imports
 */

var composeReduxWare = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should return result of middleware', t => {
  var dispatch = compose([ctx => next => action =>
    action
  ])
  t.equal(dispatch(1), 1)
  t.end()
})

test('should return result of final next middleware', t => {
  var dispatch = compose([ctx => next => action =>
    next(action)
  ])
  t.equal(dispatch(1), 1)
  t.end()
})

test('should pass to return result of next', t => {
  var dispatch = compose([
    ctx => next => action => next(action + 1),
    ctx => next => action => next(action + 1)
  ])
  t.equal(dispatch(1), 3)
  t.end()
})

test('should bypass next', t => {
  var dispatch = compose([
    ctx => next => action => action + 1,
    ctx => next => action => next(action + 1)
  ])
  t.equal(dispatch(1), 2)
  t.end()
})

test('should work recursively', t => {
  var dispatch = compose([
    ctx => next => action => next(action + 1),
    ctx => next => action => action === 2 ? ctx.dispatch(action) : next(action),
    ctx => next => action => next(action + 1)
  ])
  t.equal(dispatch(1), 4)
  t.end()
})

function compose (middleware) {
  var ctx = {dispatch: dispatch}
  ctx.dispatch = composeReduxWare(middleware)(ctx)()
  return ctx.dispatch

  function dispatch (action) {
    return ctx.dispatch(action)
  }
}
