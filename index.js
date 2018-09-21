var mocha = require('mocha')

var g = global || window || {}

var _globalName = '_tst'
var _ctx = null

function ctx(globalName) {
	if(globalName) _globalName = globalName
	return _ctx
}

function setCtx(ctx) {
	_ctx = ctx
	if(_globalName) g[_globalName] = ctx	
}

function withCtx(fn) {
	if(fn.length > 0)
		return function _async(done) {
			setCtx(this)
			return fn.call(this, done)
		}
	
	return function _sync() {
		setCtx(this)
		return fn.call(this)
	}	
}

function describe(title, fn) {
	if(!fn) return mocha.describe(title)
	return mocha.describe(title, withCtx(fn))
}
describe.only = mocha.describe.only
describe.skip = mocha.describe.skip

function makeHookOrTest(original) {
	return function (titleOrFn, fn) {
		if(typeof titleOrFn !== 'string') {
			fn = titleOrFn
			titleOrFn = undefined
		}
	
		if(!fn) return original(titleOrFn)
	
		var fnWithCtx = withCtx(fn)
		if(titleOrFn) return original(titleOrFn, fnWithCtx)
		return original(fnWithCtx)
	}
}

var it = makeHookOrTest(mocha.it)
it.only = mocha.it.only
it.skip = mocha.it.skip
it.retries = mocha.it.retries

var before = makeHookOrTest(mocha.before)
var after = makeHookOrTest(mocha.after)
var beforeEach = makeHookOrTest(mocha.beforeEach)
var afterEach = makeHookOrTest(mocha.afterEach)

var patch = {
	before: before,
	after: after,
	beforeEach: beforeEach,
	afterEach: afterEach,
	describe: describe,
	context: describe,
	xdescribe: mocha.xdescribe,
	xcontext: mocha.xcontext,
	it: it,
	specify: it,
	xit: mocha.xit,
	xspecify: mocha.xspecify,
	suiteSetup: before,
	suiteTeardown: after,
	setup: beforeEach,
	teardown: afterEach,
	suite: describe,
	test: it,
}

Object.assign(ctx, patch)
if(g.describe === mocha.describe)
	Object.keys(patch).forEach(key => {
		g[key] = (g[key] === mocha[key] ? patch : g)[key]
	})

module.exports = ctx
module.exports.default = ctx
