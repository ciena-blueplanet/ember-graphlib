import {expect} from 'chai'
import {describe, it} from 'mocha'

import {
  alg,
  Graph,
  json,
  version
} from 'graphlib'

describe('graphlib', () => {
  it('exports alg', () => {
    expect(alg).to.be.defined
  })

  it('exports Graph', () => {
    expect(Graph).to.be.defined
  })

  it('exports json', () => {
    expect(json).to.be.defined
  })

  it('exports version', () => {
    expect(version).to.be.defined
  })
})
