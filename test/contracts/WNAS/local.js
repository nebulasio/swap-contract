/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const WNAS = require('../../../src/WNAS/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return WNAS
    }

    _deploy() {
        try {
            return _LocalContext._deploy(this._account, WNAS, Array.from(arguments))
        } finally {
            this._reset()
        }
    }

    name() {
        return this._call(WNAS, 'name', this._value, Array.from(arguments))
    }

    symbol() {
        return this._call(WNAS, 'symbol', this._value, Array.from(arguments))
    }

    decimals() {
        return this._call(WNAS, 'decimals', this._value, Array.from(arguments))
    }

    totalSupply() {
        return this._call(WNAS, 'totalSupply', this._value, Array.from(arguments))
    }

    balanceOf(owner) {
        return this._call(WNAS, 'balanceOf', this._value, [owner])
    }

    deposit() {
        return this._call(WNAS, 'deposit', this._value, Array.from(arguments))
    }

    withdraw(value) {
        return this._call(WNAS, 'withdraw', this._value, [value])
    }

    transfer(to, value) {
        return this._call(WNAS, 'transfer', this._value, [to, value])
    }

    transferFrom(from, to, value) {
        return this._call(WNAS, 'transferFrom', this._value, [from, to, value])
    }

    approve(spender, currentValue, value) {
        return this._call(WNAS, 'approve', this._value, [spender, currentValue, value])
    }

    allowance(owner, spender) {
        return this._call(WNAS, 'allowance', this._value, [owner, spender])
    }

}


module.exports = new _Local()
