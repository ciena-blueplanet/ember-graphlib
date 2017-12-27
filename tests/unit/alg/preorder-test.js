import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {preorder} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.preorder', function () {
  it('should return the root for a singleton graph', function () {
    let g = new Graph()
    g.setNode('a')
    expect(preorder(g, 'a')).to.eql(['a'])
  })

  it('should visit each node in the graph once', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'd', 'e'])
    g.setPath(['a', 'c', 'd', 'e'])

    const nodes = preorder(g, 'a')
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd', 'e'])
  })

  it('should work for a tree', function () {
    let g = new Graph()
    g.setEdge('a', 'b')
    g.setPath(['a', 'c', 'd'])
    g.setEdge('c', 'e')

    const nodes = preorder(g, 'a')
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd', 'e'])
    expect(nodes.indexOf('b')).to.be.gt(nodes.indexOf('a'))
    expect(nodes.indexOf('c')).to.be.gt(nodes.indexOf('a'))
    expect(nodes.indexOf('d')).to.be.gt(nodes.indexOf('c'))
    expect(nodes.indexOf('e')).to.be.gt(nodes.indexOf('c'))
  })

  it('should work for an array of roots', function () {
    let g = new Graph()
    g.setEdge('a', 'b')
    g.setEdge('c', 'd')
    g.setNode('e')
    g.setNode('f')

    const nodes = preorder(g, ['a', 'c', 'e'])
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd', 'e'])
    expect(nodes.indexOf('b')).to.be.gt(nodes.indexOf('a'))
    expect(nodes.indexOf('d')).to.be.gt(nodes.indexOf('c'))
  })

  it('should fail if root is not in the graph', function () {
    let g = new Graph()
    g.setNode('a')
    expect(function () { preorder(g, 'b') }).to.throw()
  })
})
