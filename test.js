var test = require('tape')
var esprima = require('esprima')
var modules = require('./')

test('imports', function (t) {
  t.plan(4)

  var root = esprima.parse(`
    import foo from 'baz';
    import {x as b} from 'qux';
    var foo = require('bar');
    (function(){})(require('foo'))`,
    { sourceType: 'module' })

  var results = modules.imports(root)

  t.is(results[0], root.body[0], 'import declaration')
  t.is(results[1], root.body[1], 'import declaration 2')
  t.is(results[2], root.body[2].declarations[0].init, 'require call')
  t.is(results[3], root.body[3].expression.arguments[0], 'require call 2')
})

test('exports', function (t) {
  t.plan(4)

  var root = esprima.parse(`
    export {foo, bar};
    export default foo;
    module.exports = 123
    exports.bar = 123`,
    { sourceType: 'module' })

  var results = modules.exports(root)

  t.is(results[0], root.body[0], 'export declaration')
  t.is(results[1], root.body[1], 'export declaration 2')
  t.is(results[2], root.body[2].expression, 'exports assignment')
  t.is(results[3], root.body[3].expression, 'exports assignment 2')
})
