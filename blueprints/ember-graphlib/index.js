module.exports = {
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'ciena-graphlib', target: '^1.0.1'}
    ])
      .then(() => {
        return this.addAddonsToProject({
          packages: [
            {name: 'ember-lodash-shim', target: '^2.0.0'}
          ]
        })
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}
