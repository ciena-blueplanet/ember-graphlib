import chai from '../chai'
const {expect} = chai
import {alg, Graph} from 'ciena-graphlib'
const {dijkstraAll} = alg
import {describe, it} from 'mocha'

import allShortestPathsTest from './all-shortest-paths'

describe('alg.dijkstraAll', function () {
  allShortestPathsTest.tests(dijkstraAll)

  it('throws an Error if it encounters a negative edge weight', function () {
    var g = new Graph()
    g.setEdge('a', 'b', 1)
    g.setEdge('a', 'c', -2)
    g.setEdge('b', 'd', 3)
    g.setEdge('c', 'd', 3)

    expect(function () { dijkstraAll(g, weight(g)) }).to.throw()
  })
})

function weight (g) {
  return function (e) {
    return g.getEdge(e)
  }
}
