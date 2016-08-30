'use strict'

const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const path = require('path')

module.exports = {
  name: 'graphlib',

  treeForAddon (tree) {
    const graphlibPath = path.dirname(require.resolve('graphlib/src/index.js'))

    const graphlibFunnel = new Funnel(graphlibPath, {
      include: [
        '**/*.js'
      ]
    })

    if (!tree) {
      return this._super.treeForAddon.call(this, graphlibFunnel)
    }

    const trees = mergeTrees([graphlibFunnel, tree], {
      overwrite: true
    })

    return this._super.treeForAddon.call(this, trees)
  }
}
