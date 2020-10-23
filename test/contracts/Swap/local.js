/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const Swap = require('../../../src/Swap/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return Swap
    }

    _deploy(wnas) {
        try {
            return _LocalContext._deploy(this._account, Swap, [wnas])
        } finally {
            this._reset()
        }
    }

    getPair(token0, token1) {
        return this._call(Swap, 'getPair', this._value, [token0, token1])
    }

    allPairs() {
        return this._call(Swap, 'allPairs', this._value, Array.from(arguments))
    }

    createPair(token0, token1, lp) {
        return this._call(Swap, 'createPair', this._value, [token0, token1, lp])
    }

    quote(amountADesired, reserveA, reserveB) {
        return this._call(Swap, 'quote', this._value, [amountADesired, reserveA, reserveB])
    }

    addLiquidity(amountADesired) {
        return this._call(Swap, 'addLiquidity', this._value, [amountADesired])
    }

    addLiquidityNAS(amountTokenDesired) {
        return this._call(Swap, 'addLiquidityNAS', this._value, [amountTokenDesired])
    }

    removeLiquidity(liquidity) {
        return this._call(Swap, 'removeLiquidity', this._value, [liquidity])
    }

    removeLiquidityNAS(token) {
        return this._call(Swap, 'removeLiquidityNAS', this._value, [token])
    }

    swapExactTokensForTokens(typeof path === "string") {
        return this._call(Swap, 'swapExactTokensForTokens', this._value, [typeof path === "string"])
    }

    swapTokensForExactTokens(typeof path === "string") {
        return this._call(Swap, 'swapTokensForExactTokens', this._value, [typeof path === "string"])
    }

    swapExactNASForTokens(amountOutMin, path, toAddress) {
        return this._call(Swap, 'swapExactNASForTokens', this._value, [amountOutMin, path, toAddress])
    }

    swapTokensForExactNAS(amountOut, amountInMax, path, toAddress) {
        return this._call(Swap, 'swapTokensForExactNAS', this._value, [amountOut, amountInMax, path, toAddress])
    }

    swapExactTokensForNAS(amountIn, amountOutMin, path, toAddress) {
        return this._call(Swap, 'swapExactTokensForNAS', this._value, [amountIn, amountOutMin, path, toAddress])
    }

    swapNASForExactTokens(amountOut, path, toAddress) {
        return this._call(Swap, 'swapNASForExactTokens', this._value, [amountOut, path, toAddress])
    }

    getAmountOut(amountIn, reserveIn, reserveOut) {
        return this._call(Swap, 'getAmountOut', this._value, [amountIn, reserveIn, reserveOut])
    }

    getAmountIn(amountOut, reserveIn, reserveOut) {
        return this._call(Swap, 'getAmountIn', this._value, [amountOut, reserveIn, reserveOut])
    }

    getAmountsOut(amountIn, path) {
        return this._call(Swap, 'getAmountsOut', this._value, [amountIn, path])
    }

    getAmountsIn(amountOut, path) {
        return this._call(Swap, 'getAmountsIn', this._value, [amountOut, path])
    }

}


module.exports = new _Local()
