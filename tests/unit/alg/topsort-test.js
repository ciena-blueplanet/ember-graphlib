import {expect} from 'chai'
import {Graph, alg} from 'ciena-graphlib'
const {topsort} = alg
import _ from 'lodash'
import {describe, it} from 'mocha'

describe('alg.topsort', function () {
  it('should return an empty array for an empty graph', function () {
    expect(topsort(new Graph())).to.eql([])
  })

  it('should sort nodes such that earlier nodes have directed edges to later nodes', function () {
    let g = new Graph()
    g.setPath(['b', 'c', 'a'])
    expect(topsort(g)).to.eql(['b', 'c', 'a'])
  })

  it('should work for a diamond', function () {
    let g = new Graph()
    g.setPath(['a', 'b', 'd'])
    g.setPath(['a', 'c', 'd'])

    const result = topsort(g)
    expect(_.indexOf(result, 'a')).to.equal(0)
    expect(_.indexOf(result, 'b')).to.be.lt(_.indexOf(result, 'd'))
    expect(_.indexOf(result, 'c')).to.be.lt(_.indexOf(result, 'd'))
    expect(_.indexOf(result, 'd')).to.equal(3)
  })

  it('should throw CycleException if there is a cycle #1', function () {
    let g = new Graph()
    g.setPath(['b', 'c', 'a', 'b'])
    expect(function () { topsort(g) }).to.throw(topsort.CycleException)
  })

  it('should throw CycleException if there is a cycle #2', function () {
    let g = new Graph()
    g.setPath(['b', 'c', 'a', 'b'])
    g.setEdge('b', 'd')
    expect(function () { topsort(g) }).to.throw(topsort.CycleException)
  })

  it('should throw CycleException if there is a cycle #3', function () {
    let g = new Graph()
    g.setPath(['b', 'c', 'a', 'b'])
    g.setNode('d')
    expect(function () { topsort(g) }).to.throw(topsort.CycleException)
  })
})
