# Provide mocha `this` context to lambda functions
This is a prototype, alpha solution enabling effective use of lambdas with mocha in a backwards compatible way

## The quick way

```javascript
require('mocha-lambda')
// global '_tst' can now be used where 'this' was before

describe('mocha-lambda', () => {
  it('provides "this" as "_tst"', function() {
    assert(this === _tst)
  })

  beforeEach(() => {
    _tst.answer = 42
  })
	
  it('works', () => {
    assert(_tst.answer === 42)
    _tst.skip()
  })
	
  it('works with done', done => {
    done()
  })
	
  it('works with async', async() => {
    _tst.timeout(100)
    await someAsync()
  })
})
```

## The other way(s)

```javascript
var ctx = require('mocha-lambda')
// 'ctx' is a function that returns mocha 'this' context when called

describe('mocha-lambda', () => {
  it('provides "this" as "_tst"', function() {
    assert(this === ctx())
  })

  beforeEach(() => {
    ctx().answer = 42
  })
	
  it('works', () => {
    assert(_tst.answer === 42)
    ctx().skip()
  })
})

// 'ctx()' can also change name of global
ctx('mo')
describe('mocha-lambda', () => {
  it('provides "this" as "_tst"', function() {
    assert(this === mo)
  })

  beforeEach(() => {
    mo.answer = 42
  })
	
  it('works', () => {
    assert(mo.answer === 42)
    mo.skip()
  })
})

```

## If mocha interface needs to be explicitly imported, import from 'mocha-lamba' rather than 'mocha' (if this project is merged into mocha, this wont be required)
```javascript
import ctx, {describe: d, it: i, beforeEach: b} from 'mocha-lambda'
ctx('t')
d('mocha-lambda', () => {
  i('provides "this" as "_tst"', function() {
    assert(this === t)
  })

  b(() => {
    t.answer = 42
  })
	
  i('works', () => {
    assert(mo.answer === 42)
    t.skip()
  })
})
```