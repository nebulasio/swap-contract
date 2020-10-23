/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const FakeNAX = require('../../../src/FakeNAX/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return FakeNAX
    }

    _deploy() {
        try {
            return _LocalContext._deploy(this._account, FakeNAX, Array.from(arguments))
        } finally {
            this._reset()
        }
    }

    name() {
        return this._call(FakeNAX, 'name', this._value, Array.from(arguments))
    }

    symbol() {
        return this._call(FakeNAX, 'symbol', this._value, Array.from(arguments))
    }

    decimals() {
        return this._call(FakeNAX, 'decimals', this._value, Array.from(arguments))
    }

    totalSupply() {
        return this._call(FakeNAX, 'totalSupply', this._value, Array.from(arguments))
    }

    balanceOf(owner) {
        return this._call(FakeNAX, 'balanceOf', this._value, [owner])
    }

    mint(value) {
        return this._call(FakeNAX, 'mint', this._value, [value])
    }

    transfer(to, value) {
        return this._call(FakeNAX, 'transfer', this._value, [to, value])
    }

    transferFrom(from, to, value) {
        return this._call(FakeNAX, 'transferFrom', this._value, [from, to, value])
    }

    approve(spender, currentValue, value) {
        return this._call(FakeNAX, 'approve', this._value, [spender, currentValue, value])
    }

    allowance(owner, spender) {
        return this._call(FakeNAX, 'allowance', this._value, [owner, spender])
    }

}


module.exports = new _Local()
