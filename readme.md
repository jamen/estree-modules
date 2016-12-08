# estree-modules

> Get module imports and exports from a node.

```js
var esprima = require('esprima')
var modules = require('estree-modules')

var node = esprima.parse(/* ... */)

var importNodes = modules.imports(node)
var exportNodes = modules.exports(node)
```

## Installation

```sh
$ npm install --save estree-modules
```

## Usage

### `modules.imports(node)`

Get an array of `require` and `import` nodes.

```js
modules.imports(node);
// [ ImportDeclaration { ... },
//   ImportDeclaration { ... },
//   CallExpression { ... } ]
```

(Using [`estree-ancestors`](https://www.npmjs.com/package/estree-ancestors) on the `CallExpression` nodes can give more useful info)

### `modules.exports(node)`

Get an array of `module.exports`/`exports` assignment nodes or `export` declaration nodes.

```js
modules.exports(node)
[ ExportNamedDeclaration { ... },
  AssignmentExpression { ... },
  AssignmentExpression { ... } ]
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/estree-modules.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/estree-modules.svg?style=flat-square)](https://travis-ci.org/jamen/estree-modules) [![downloads](https://img.shields.io/npm/dt/estree-modules.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/estree-modules.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/estree-modules
