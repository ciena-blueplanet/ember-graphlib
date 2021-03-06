import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {prim} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.prim', function () {
  it('should return an empty graph for an empty input', function () {
    const source = new Graph()

    const g = prim(source, weightFn(source))
    expect(g.nodeCount()).to.equal(0)
    expect(g.edgeCount()).to.equal(0)
  })

  it('should return a single node graph for a graph with a single node', function () {
    const source = new Graph()
    source.setNode('a')

    const g = prim(source, weightFn(source))
    expect(g.nodes()).to.eql(['a'])
    expect(g.edgeCount()).to.equal(0)
  })

  it('should return a deterministic result given an optimal solution', function () {
    const source = new Graph()
    source.setEdge('a', 'b', 1)
    source.setEdge('b', 'c', 2)
    source.setEdge('b', 'd', 3)
    // This edge should not be in the min spanning tree
    source.setEdge('c', 'd', 20)
    // This edge should not be in the min spanning tree
    source.setEdge('c', 'e', 60)
    source.setEdge('d', 'e', 1)

    const g = prim(source, weightFn(source))
    expect(_.sortBy(g.neighbors('a'))).to.eql(['b'])
    expect(_.sortBy(g.neighbors('b'))).to.eql(['a', 'c', 'd'])
    expect(_.sortBy(g.neighbors('c'))).to.eql(['b'])
    expect(_.sortBy(g.neighbors('d'))).to.eql(['b', 'e'])
    expect(_.sortBy(g.neighbors('e'))).to.eql(['d'])
  })

  it('should throw an Error for unconnected graphs', function () {
    const source = new Graph()
    source.setNode('a')
    source.setNode('b')

    expect(function () { prim(source, weightFn(source)) }).to.throw()
  })
})

function weightFn (g) {
  return function (edge) {
    return g.edge(edge)
  }
}
