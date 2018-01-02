// These are smoke tests to make sure the bundles look like they are working
// correctly.

import {expect} from 'chai'
import graphlib from 'ciena-graphlib'
import {describe, it} from 'mocha'

describe('index', function () {
  it('should export graphlib', function () {
    expect(graphlib).to.be.an('object')
    expect(graphlib.Graph).to.be.a('function')
    expect(graphlib.json).to.be.a('object')
    expect(graphlib.alg).to.be.a('object')
  })

  it('should do simple graph operations', function () {
    let g = new graphlib.Graph()
    g.setNode('a')
    g.setNode('b')
    g.setEdge('a', 'b')
    expect(g.hasNode('a')).to.equal(true)
    expect(g.hasNode('b')).to.equal(true)
    expect(g.hasEdge('a', 'b')).to.equal(true)
  })

  it('should serialize to json and back', function () {
    let g = new graphlib.Graph()
    g.setNode('a')
    g.setNode('b')
    g.setEdge('a', 'b')

    const json = graphlib.json.write(g)
    const g2 = graphlib.json.read(json)
    expect(g2.hasNode('a')).to.equal(true)
    expect(g2.hasNode('b')).to.equal(true)
    expect(g2.hasEdge('a', 'b')).to.equal(true)
  })
})
