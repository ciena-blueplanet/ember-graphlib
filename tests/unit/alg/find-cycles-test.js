import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {findCycles} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.findCycles', function () {
  it('should return an empty array for an empty graph', function () {
    expect(findCycles(new Graph())).to.eql([])
  })

  it('should return an empty array if the graph has no cycles', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c'])
    expect(findCycles(g)).to.eql([])
  })

  it('should return a single entry for a cycle of 1 node', function () {
    let g = new Graph()
    g.setPath(['a', 'a'])
    expect(sort(findCycles(g))).to.eql([['a']])
  })

  it('should return a single entry for a cycle of 2 nodes', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'a'])
    expect(sort(findCycles(g))).to.eql([['a', 'b']])
  })

  it('should return a single entry for a triangle', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c', 'a'])
    expect(sort(findCycles(g))).to.eql([['a', 'b', 'c']])
  })

  it('should return multiple entries for multiple cycles', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'a'])
    g.setPath(['c', 'd', 'e', 'c'])
    g.setPath(['f', 'g', 'g'])
    g.setNode('h')
    expect(sort(findCycles(g))).to.eql([['a', 'b'], ['c', 'd', 'e'], ['g']])
  })
})

// A helper that sorts components and their contents
function sort (cmpts) {
  return _.sortBy(_.map(cmpts, function (cmpt) {
    return _.sortBy(cmpt)
  }), function (cmpts) { return cmpts[0] })
}
