import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {components} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.components', function () {
  it('should return an empty list for an empty graph', function () {
    expect(components(new Graph({directed: false}))).to.eql([])
  })

  it('should return singleton lists for unconnected nodes', function () {
    let g = new Graph({directed: false})
    g.setNode('a')
    g.setNode('b')

    const result = _.sortBy(components(g), function (arr) { return _.min(arr) })
    expect(result).to.eql([['a'], ['b']])
  })

  it('should return a list of nodes in a component', function () {
    let g = new Graph({directed: false})
    g.setEdge('a', 'b')
    g.setEdge('b', 'c')

    const result = _.map(components(g), function (xs) { return _.sortBy(xs) })
    expect(result).to.eql([['a', 'b', 'c']])
  })

  it('should return nodes connected by a neighbor relationship in a digraph', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c', 'a'])
    g.setEdge('d', 'c')
    g.setEdge('e', 'f')

    const result = _.sortBy(_.map(components(g), function (xs) { return _.sortBy(xs) }),
      '0')
    expect(result).to.eql([['a', 'b', 'c', 'd'], ['e', 'f']])
  })
})
