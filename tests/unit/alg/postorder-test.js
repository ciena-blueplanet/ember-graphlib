import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {postorder} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.postorder', function () {
  it('should return the root for a singleton graph', function () {
    let g = new Graph()
    g.setNode('a')
    expect(postorder(g, 'a')).to.eql(['a'])
  })

  it('should visit each node in the graph once', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'd', 'e'])
    g.setPath(['a', 'c', 'd', 'e'])

    const nodes = postorder(g, 'a')
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd', 'e'])
  })

  it('should work for a tree', function () {
    let g = new Graph()
    g.setEdge('a', 'b')
    g.setPath(['a', 'c', 'd'])
    g.setEdge('c', 'e')

    const nodes = postorder(g, 'a')
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd', 'e'])
    expect(nodes.indexOf('b')).to.be.lt(nodes.indexOf('a'))
    expect(nodes.indexOf('c')).to.be.lt(nodes.indexOf('a'))
    expect(nodes.indexOf('d')).to.be.lt(nodes.indexOf('c'))
    expect(nodes.indexOf('e')).to.be.lt(nodes.indexOf('c'))
  })

  it('should work for an array of roots', function () {
    let g = new Graph()
    g.setEdge('a', 'b')
    g.setEdge('c', 'd')
    g.setNode('e')
    g.setNode('f')

    const nodes = postorder(g, ['a', 'b', 'c', 'e'])
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd', 'e'])
    expect(nodes.indexOf('b')).to.be.lt(nodes.indexOf('a'))
    expect(nodes.indexOf('d')).to.be.lt(nodes.indexOf('c'))
  })

  it('should work for multiple connected roots', function () {
    let g = new Graph()
    g.setEdge('a', 'b')
    g.setEdge('a', 'c')
    g.setEdge('d', 'c')

    const nodes = postorder(g, ['a', 'd'])
    expect(_.sortBy(nodes)).to.eql(['a', 'b', 'c', 'd'])
    expect(nodes.indexOf('b')).to.be.lt(nodes.indexOf('a'))
    expect(nodes.indexOf('c')).to.be.lt(nodes.indexOf('a'))
    expect(nodes.indexOf('c')).to.be.lt(nodes.indexOf('d'))
  })

  it('should fail if root is not in the graph', function () {
    let g = new Graph()
    g.setNode('a')
    expect(function () { postorder(g, 'b') }).to.throw()
  })
})
