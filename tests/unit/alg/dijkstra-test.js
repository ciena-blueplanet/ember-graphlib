import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {dijkstra} = alg
import {describe, it} from 'mocha'

describe('alg.dijkstra', function () {
  it('should assign distance 0 for the source node', function () {
    let g = new Graph()
    g.setNode('source')
    expect(dijkstra(g, 'source')).to.eql({source: {distance: 0}})
  })

  it('should return Number.POSITIVE_INFINITY for unconnected nodes', function () {
    let g = new Graph()
    g.setNode('a')
    g.setNode('b')
    expect(dijkstra(g, 'a')).to.eql({
      a: {distance: 0},
      b: {distance: Number.POSITIVE_INFINITY}
    })
  })

  it('should return the distance and path from the source node to other nodes', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'c'])
    g.setEdge('b', 'd')
    expect(dijkstra(g, 'a')).to.eql({
      a: {distance: 0},
      b: {distance: 1, predecessor: 'a'},
      c: {distance: 2, predecessor: 'b'},
      d: {distance: 2, predecessor: 'b'}
    })
  })

  it('should work for undirected graphs', function () {
    let g = new Graph({directed: false})
    g.setPath(['a', 'b', 'c'])
    g.setEdge('b', 'd')
    expect(dijkstra(g, 'a')).to.eql({
      a: {distance: 0},
      b: {distance: 1, predecessor: 'a'},
      c: {distance: 2, predecessor: 'b'},
      d: {distance: 2, predecessor: 'b'}
    })
  })

  it('should use an optionally supplied weight function', function () {
    let g = new Graph()
    g.setEdge('a', 'b', 1)
    g.setEdge('a', 'c', 2)
    g.setEdge('b', 'd', 3)
    g.setEdge('c', 'd', 3)

    expect(dijkstra(g, 'a', weightFn(g))).to.eql({
      a: {distance: 0},
      b: {distance: 1, predecessor: 'a'},
      c: {distance: 2, predecessor: 'a'},
      d: {distance: 4, predecessor: 'b'}
    })
  })

  it('should use an optionally supplied edge function', function () {
    let g = new Graph()
    g.setPath(['a', 'c', 'd'])
    g.setEdge('b', 'c')

    expect(dijkstra(g, 'd', undefined, function (e) { return g.inEdges(e) }), {
      a: {distance: 2, predecessor: 'c'},
      b: {distance: 2, predecessor: 'c'},
      c: {distance: 1, predecessor: 'd'},
      d: {distance: 0}
    })
  })

  it('should throw an Error if it encounters a negative edge weight', function () {
    let g = new Graph()
    g.setEdge('a', 'b', 1)
    g.setEdge('a', 'c', -2)
    g.setEdge('b', 'd', 3)
    g.setEdge('c', 'd', 3)

    expect(function () { dijkstra(g, 'a', weightFn(g)) }).to.throw()
  })
})

function weightFn (g) {
  return function (e) {
    return g.edge(e)
  }
}
