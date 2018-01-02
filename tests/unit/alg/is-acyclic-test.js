import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {isAcyclic} = alg
import {describe, it} from 'mocha'

describe('alg.isAcyclic', function () {
  it('should return true if the graph has no cycles', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c'])
    expect(isAcyclic(g)).to.equal(true)
  })

  it('should return false if the graph has at least one cycle', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c', 'a'])
    expect(isAcyclic(g)).to.equal(false)
  })

  it('should return false if the graph has a cycle of 1 node', function () {
    let g = new Graph()
    g.setPath(['a', 'a'])
    expect(isAcyclic(g)).to.equal(false)
  })

  it('should rethrow non-CycleException errors', function () {
    expect(function () { isAcyclic(undefined) }).to.throw()
  })
})
