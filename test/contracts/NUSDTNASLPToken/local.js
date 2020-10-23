/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const NUSDTNASLPToken = require('../../../src/NUSDTNASLPToken/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return NUSDTNASLPToken
    }

    _deploy(swap, name, symbol, decimals) {
        try {
            return _LocalContext._deploy(this._account, NUSDTNASLPToken, [swap, name, symbol, decimals])
        } finally {
            this._reset()
        }
    }

    swap() {
        return this._call(NUSDTNASLPToken, 'swap', this._value, Array.from(arguments))
    }

    name() {
        return this._call(NUSDTNASLPToken, 'name', this._value, Array.from(arguments))
    }

    symbol() {
        return this._call(NUSDTNASLPToken, 'symbol', this._value, Array.from(arguments))
    }

    decimals() {
        return this._call(NUSDTNASLPToken, 'decimals', this._value, Array.from(arguments))
    }

    totalSupply() {
        return this._call(NUSDTNASLPToken, 'totalSupply', this._value, Array.from(arguments))
    }

    balanceOf(owner) {
        return this._call(NUSDTNASLPToken, 'balanceOf', this._value, [owner])
    }

    mint(to, value) {
        return this._call(NUSDTNASLPToken, 'mint', this._value, [to, value])
    }

    burn(value) {
        return this._call(NUSDTNASLPToken, 'burn', this._value, [value])
    }

    burnFrom(from, value) {
        return this._call(NUSDTNASLPToken, 'burnFrom', this._value, [from, value])
    }

    transfer(to, value) {
        return this._call(NUSDTNASLPToken, 'transfer', this._value, [to, value])
    }

    transferFrom(from, to, value) {
        return this._call(NUSDTNASLPToken, 'transferFrom', this._value, [from, to, value])
    }

    approve(spender, currentValue, value) {
        return this._call(NUSDTNASLPToken, 'approve', this._value, [spender, currentValue, value])
    }

    allowance(owner, spender) {
        return this._call(NUSDTNASLPToken, 'allowance', this._value, [owner, spender])
    }

}


module.exports = new _Local()
