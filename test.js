var ctx = require('./index')
var should = require('chai').should()

describe('mocha-lambda', function() {
	describe('backwards compatible', function() {
		this.re

		before('before', function() {
			this.should.equal(_tst)
			this.should.equal(ctx())
		})
	
		after('after', function() {
			this.should.equal(_tst)
		})
	
		beforeEach('beforEach', function() {
			this.should.equal(_tst)
		})
	
		afterEach('afterEach', function() {
			this.should.equal(_tst)
		})
	
		it('it', function() {
			this.should.equal(_tst)
		})

		it('it w/done', function(done) {
			this.should.equal(_tst)
			done()
		})

		it('it w/async', async function() {
			this.should.equal(_tst)
		})
	})

	describe('with lambdas', () => {
		before('before', () => {
			_tst.before = 1
		})
	
		beforeEach('beforEach', () => {
			should.exist(_tst)
			_tst.beforeEach = 42
		})
	
		it('it changes beforeEach', () => {
			_tst.beforeEach = 0
			_tst.before = 0
		})

		it('it should have reset beforeEach', () => {
			_tst.beforeEach.should.equal(42)
		})

		it('it w/done', (done) => {
			_tst.beforeEach = 0
			done()
		})

		it('it w/async', async () => {
			_tst.beforeEach.should.equal(42)
		})

		it('it has not reset before', async () => {
			_tst.before.should.equal(0)
		})
	})

	describe('with lambdas and different global', () => {
		before('before', () => {
			ctx('mo').before = 1
		})
	
		beforeEach('beforEach', () => {
			should.exist(mo)
			mo.beforeEach = 42
		})
	
		it('it changes beforeEach', () => {
			mo.beforeEach = 0
			mo.before = 10
		})

		it('it should have reset beforeEach', () => {
			mo.beforeEach.should.equal(42)
		})

		it('it w/done', (done) => {
			mo.beforeEach = 10
			done()
		})

		it('it w/async', async () => {
			mo.beforeEach.should.equal(42)
		})

		it('it has not reset before', async () => {
			mo.before.should.equal(10)
		})
	})
})
