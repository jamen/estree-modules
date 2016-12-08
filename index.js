var step = require('estree-walk').step

exports.imports = importNodes
exports.exports = exportNodes

function importNodes (node) {
  var nodes = []

  // Collect nodes that import things
  for (var pending = [node]; pending.length;) {
    var select = pending.shift()

    if (
      // A `import`
      select.type === 'ImportDeclaration' ||
      // A `require` call
      select.type === 'CallExpression' &&
      select.callee.name === 'require'
    ) {
      nodes.push(select)
    }

    // Walk tree
    step(select, pending)
  }

  return nodes
}

function exportNodes (node) {
  var nodes = []

  // Collect nodes that export things
  for (var pending = [node]; pending.length;) {
    var select = pending.shift()

    if (
      // An `export`declaration
      select.type === 'ExportDefaultDeclaration' ||
      select.type === 'ExportNamedDeclaration' ||
      select.type === 'ExportAllDeclaration' ||
      // An `exports` or `module.exports` assignment
      (select.type === 'AssignmentExpression' &&
      select.operator === '=' &&
      (select.left.object.name === 'exports' ||
      select.left.object.name === 'module' &&
      select.left.property.name === 'exports'))
    ) {
      nodes.push(select)
    }

    step(select, pending)
  }

  return nodes
}
