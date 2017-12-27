import {expect} from 'chai'
import PriorityQueue from 'ciena-graphlib/data/priority-queue'
import _ from 'lodash'
import {beforeEach, describe, it} from 'mocha'

describe('data.PriorityQueue', function () {
  let pq

  beforeEach(function () {
    pq = new PriorityQueue()
  })

  describe('size', function () {
    it('should return 0 for an empty queue', function () {
      expect(pq.size()).to.equal(0)
    })

    it('should return the number of elements in the queue', function () {
      pq.add('a', 1)
      expect(pq.size()).to.equal(1)
      pq.add('b', 2)
      expect(pq.size()).to.equal(2)
    })
  })

  describe('keys', function () {
    it('should return all of the keys in the queue', function () {
      pq.add('a', 1)
      pq.add(1, 2)
      pq.add(false, 3)
      pq.add(undefined, 4)
      pq.add(null, 5)
      expect(_.sortBy(pq.keys())).to.eql(
        _.sortBy(['a', '1', 'false', 'undefined', 'null']))
    })
  })

  describe('has', function () {
    it('should return true if the key is in the queue', function () {
      pq.add('a', 1)
      expect(pq.has('a')).to.equal(true)
    })

    it('should return false if the key is not in the queue', function () {
      expect(pq.has('a')).to.equal(false)
    })
  })

  describe('priority', function () {
    it('should return the current priority for the key', function () {
      pq.add('a', 1)
      pq.add('b', 2)
      expect(pq.priority('a')).to.equal(1)
      expect(pq.priority('b')).to.equal(2)
    })

    it('should return undefined if the key is not in the queue', function () {
      expect(pq.priority('foo')).to.equal(undefined)
    })
  })

  describe('min', function () {
    it('should throw an error if there is no element in the queue', function () {
      expect(function () { pq.min() }).to.throw()
    })

    it('should return the smallest element', function () {
      pq.add('b', 2)
      pq.add('a', 1)
      expect(pq.min()).to.equal('a')
    })

    it('should not remove the minimum element from the queue', function () {
      pq.add('b', 2)
      pq.add('a', 1)
      pq.min()
      expect(pq.size()).to.equal(2)
    })
  })

  describe('add', function () {
    it('should add the key to the queue', function () {
      pq.add('a', 1)
      expect(pq.keys()).to.eql(['a'])
    })

    it('should return true if the key was added', function () {
      expect(pq.add('a', 1)).to.equal(true)
    })

    it('should return false if the key already exists in the queue', function () {
      pq.add('a', 1)
      expect(pq.add('a', 1)).to.equal(false)
    })
  })

  describe('removeMin', function () {
    it('should remove the minimum element from the queue', function () {
      pq.add('b', 2)
      pq.add('a', 1)
      pq.add('c', 3)
      pq.add('e', 5)
      pq.add('d', 4)
      expect(pq.removeMin()).to.equal('a')
      expect(pq.removeMin()).to.equal('b')
      expect(pq.removeMin()).to.equal('c')
      expect(pq.removeMin()).to.equal('d')
      expect(pq.removeMin()).to.equal('e')
    })

    it('should throw an error if there is no element in the queue', function () {
      expect(function () { pq.removeMin() }).to.throw()
    })
  })

  describe('decrease', function () {
    it('should decrease the priority of a key', function () {
      pq.add('a', 1)
      pq.decrease('a', -1)
      expect(pq.priority('a')).to.equal(-1)
    })

    it('should raise an error if the key is not in the queue', function () {
      expect(function () { pq.decrease('a', -1) }).to.throw()
    })

    it('should raise an error if the new priority is greater than current', function () {
      pq.add('a', 1)
      expect(function () { pq.decrease('a', 2) }).to.throw()
    })
  })
})
