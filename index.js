'use strict'

const mergeTrees = require('broccoli-merge-trees')
const path = require('path')

module.exports = {
  name: 'graphlib',

  treeForAddon (tree) {
    const graphlibPath = path.dirname(require.resolve('graphlib/index.js'))
    const graphlibTree = this.treeGenerator(graphlibPath)

    if (!tree) {
      return this._super.treeForAddon.call(this, graphlibTree)
    }

    const trees = mergeTrees([graphlibTree, tree], {
      overwrite: true
    })

    return this._super.treeForAddon.call(this, trees)
  }
}
