/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const NUSDTNAXLPToken = require('../../../src/NUSDTNAXLPToken/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return NUSDTNAXLPToken
    }

    _deploy(swap, name, symbol, decimals) {
        try {
            return _LocalContext._deploy(this._account, NUSDTNAXLPToken, [swap, name, symbol, decimals])
        } finally {
            this._reset()
        }
    }

    swap() {
        return this._call(NUSDTNAXLPToken, 'swap', this._value, Array.from(arguments))
    }

    name() {
        return this._call(NUSDTNAXLPToken, 'name', this._value, Array.from(arguments))
    }

    symbol() {
        return this._call(NUSDTNAXLPToken, 'symbol', this._value, Array.from(arguments))
    }

    decimals() {
        return this._call(NUSDTNAXLPToken, 'decimals', this._value, Array.from(arguments))
    }

    totalSupply() {
        return this._call(NUSDTNAXLPToken, 'totalSupply', this._value, Array.from(arguments))
    }

    balanceOf(owner) {
        return this._call(NUSDTNAXLPToken, 'balanceOf', this._value, [owner])
    }

    mint(to, value) {
        return this._call(NUSDTNAXLPToken, 'mint', this._value, [to, value])
    }

    burn(value) {
        return this._call(NUSDTNAXLPToken, 'burn', this._value, [value])
    }

    burnFrom(from, value) {
        return this._call(NUSDTNAXLPToken, 'burnFrom', this._value, [from, value])
    }

    transfer(to, value) {
        return this._call(NUSDTNAXLPToken, 'transfer', this._value, [to, value])
    }

    transferFrom(from, to, value) {
        return this._call(NUSDTNAXLPToken, 'transferFrom', this._value, [from, to, value])
    }

    approve(spender, currentValue, value) {
        return this._call(NUSDTNAXLPToken, 'approve', this._value, [spender, currentValue, value])
    }

    allowance(owner, spender) {
        return this._call(NUSDTNAXLPToken, 'allowance', this._value, [owner, spender])
    }

}


module.exports = new _Local()
