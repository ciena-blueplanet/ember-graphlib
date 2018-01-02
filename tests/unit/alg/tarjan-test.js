import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {tarjan} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.tarjan', function () {
  it('should return an empty array for an empty graph', function () {
    expect(tarjan(new Graph())).to.eql([])
  })

  it('should return singletons for nodes not in a strongly connected component', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c'])
    g.setEdge('d', 'c')
    expect(sort(tarjan(g))).to.eql([['a'], ['b'], ['c'], ['d']])
  })

  it('should return a single component for a cycle of 1 edge', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'a'])
    expect(sort(tarjan(g))).to.eql([['a', 'b']])
  })

  it('should return a single component for a triangle', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c', 'a'])
    expect(sort(tarjan(g))).to.eql([['a', 'b', 'c']])
  })

  it('should find multiple components', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'a'])
    g.setPath(['c', 'd', 'e', 'c'])
    g.setNode('f')
    expect(sort(tarjan(g))).to.eql([['a', 'b'], ['c', 'd', 'e'], ['f']])
  })
})

// A helper that sorts components and their contents
function sort (cmpts) {
  return _.sortBy(_.map(cmpts, function (cmpt) {
    return _.sortBy(cmpt)
  }), function (cmpts) { return cmpts[0] })
}
