/* eslint-env node */
'use strict'

const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const path = require('path')

module.exports = {
  name: 'ciena-graphlib',

  /**
   * Workaround needed for 2.12+
   * see: https://github.com/ember-redux/ember-redux/issues/105#issuecomment-288001558
   * @returns {boolean} Set to true to force JS compile
   * @private
   */
  _shouldCompileJS: function () {
    return true
  },

  treeForAddon (tree) {
    const graphlibPath = path.dirname(require.resolve('ciena-graphlib/src/index.js'))

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
