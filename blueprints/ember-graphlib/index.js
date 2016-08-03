module.exports = {
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-lodash-shim', target: '0.1.2'}
      ]
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}
