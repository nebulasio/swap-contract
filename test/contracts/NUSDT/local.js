/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const NUSDT = require('../../../src/NUSDT/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return NUSDT
    }

    _deploy() {
        try {
            return _LocalContext._deploy(this._account, NUSDT, Array.from(arguments))
        } finally {
            this._reset()
        }
    }

    name() {
        return this._call(NUSDT, 'name', this._value, Array.from(arguments))
    }

    symbol() {
        return this._call(NUSDT, 'symbol', this._value, Array.from(arguments))
    }

    decimals() {
        return this._call(NUSDT, 'decimals', this._value, Array.from(arguments))
    }

    totalSupply() {
        return this._call(NUSDT, 'totalSupply', this._value, Array.from(arguments))
    }

    balanceOf(owner) {
        return this._call(NUSDT, 'balanceOf', this._value, [owner])
    }

    mint(value) {
        return this._call(NUSDT, 'mint', this._value, [value])
    }

    transfer(to, value) {
        return this._call(NUSDT, 'transfer', this._value, [to, value])
    }

    transferFrom(from, to, value) {
        return this._call(NUSDT, 'transferFrom', this._value, [from, to, value])
    }

    approve(spender, currentValue, value) {
        return this._call(NUSDT, 'approve', this._value, [spender, currentValue, value])
    }

    allowance(owner, spender) {
        return this._call(NUSDT, 'allowance', this._value, [owner, spender])
    }

}


module.exports = new _Local()
