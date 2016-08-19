module.exports = {
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-lodash-shim', target: '^1.0.0'}
      ]
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}
