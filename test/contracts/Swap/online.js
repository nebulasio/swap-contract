/** Automatically generated code, please do not modify. */
const fs = require('fs')
const path = require('path')
const OnlineBase = require('../../../lib/test_online_base.js')
const NebUtil = require('../../../lib/neb_util.js')


class Online extends OnlineBase {

    constructor(isMainnet) {
        super(isMainnet)
        this.nebUtil = isMainnet ? NebUtil.mainnet : NebUtil.testnet
    }

    get __contractName() {
        return 'Swap'
    }

    get _source() {
        let p = path.join(__dirname, '../../../build/output/Swap.js')
        if (!fs.existsSync(p)) {
            throw p + ' not found.'
        }
        return String(fs.readFileSync(p))
    }

    async _deployTest(wnas) {
        try {
            return this._testResult(await this.nebUtil.deployTest(this._account.getAddressString(), this._source, [wnas]))
        } finally {
            this._reset()
        }
    }
    
    async _deploy(wnas) {
        try {
            return await this._getDeployResult('Swap', await this.nebUtil.oneKeyDeploy(this._account, this._source, [wnas]))
        } finally {
            this._reset()
        }
    }

    async getPairTest(token0, token1) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getPair', [token0, token1]))
        } finally {
            this._reset()
        }
    }

    async getPair(token0, token1) {
        try {
            return await this._getTxResult('Swap.getPair', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getPair', [token0, token1]))
        } finally {
            this._reset()
        }
    }

    async allPairsTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'allPairs', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async allPairs() {
        try {
            return await this._getTxResult('Swap.allPairs', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'allPairs', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async createPairTest(token0, token1, lp) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'createPair', [token0, token1, lp]))
        } finally {
            this._reset()
        }
    }

    async createPair(token0, token1, lp) {
        try {
            return await this._getTxResult('Swap.createPair', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'createPair', [token0, token1, lp]))
        } finally {
            this._reset()
        }
    }

    async quoteTest(amountADesired, reserveA, reserveB) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'quote', [amountADesired, reserveA, reserveB]))
        } finally {
            this._reset()
        }
    }

    async quote(amountADesired, reserveA, reserveB) {
        try {
            return await this._getTxResult('Swap.quote', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'quote', [amountADesired, reserveA, reserveB]))
        } finally {
            this._reset()
        }
    }

    async addLiquidityTest(amountADesired) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'addLiquidity', [amountADesired]))
        } finally {
            this._reset()
        }
    }

    async addLiquidity(amountADesired) {
        try {
            return await this._getTxResult('Swap.addLiquidity', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'addLiquidity', [amountADesired]))
        } finally {
            this._reset()
        }
    }

    async addLiquidityNASTest(amountTokenDesired) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'addLiquidityNAS', [amountTokenDesired]))
        } finally {
            this._reset()
        }
    }

    async addLiquidityNAS(amountTokenDesired) {
        try {
            return await this._getTxResult('Swap.addLiquidityNAS', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'addLiquidityNAS', [amountTokenDesired]))
        } finally {
            this._reset()
        }
    }

    async removeLiquidityTest(liquidity) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'removeLiquidity', [liquidity]))
        } finally {
            this._reset()
        }
    }

    async removeLiquidity(liquidity) {
        try {
            return await this._getTxResult('Swap.removeLiquidity', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'removeLiquidity', [liquidity]))
        } finally {
            this._reset()
        }
    }

    async removeLiquidityNASTest(token) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'removeLiquidityNAS', [token]))
        } finally {
            this._reset()
        }
    }

    async removeLiquidityNAS(token) {
        try {
            return await this._getTxResult('Swap.removeLiquidityNAS', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'removeLiquidityNAS', [token]))
        } finally {
            this._reset()
        }
    }

    async swapExactTokensForTokensTest(typeof path === "string") {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'swapExactTokensForTokens', [typeof path === "string"]))
        } finally {
            this._reset()
        }
    }

    async swapExactTokensForTokens(typeof path === "string") {
        try {
            return await this._getTxResult('Swap.swapExactTokensForTokens', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'swapExactTokensForTokens', [typeof path === "string"]))
        } finally {
            this._reset()
        }
    }

    async swapTokensForExactTokensTest(typeof path === "string") {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'swapTokensForExactTokens', [typeof path === "string"]))
        } finally {
            this._reset()
        }
    }

    async swapTokensForExactTokens(typeof path === "string") {
        try {
            return await this._getTxResult('Swap.swapTokensForExactTokens', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'swapTokensForExactTokens', [typeof path === "string"]))
        } finally {
            this._reset()
        }
    }

    async swapExactNASForTokensTest(amountOutMin, path, toAddress) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'swapExactNASForTokens', [amountOutMin, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapExactNASForTokens(amountOutMin, path, toAddress) {
        try {
            return await this._getTxResult('Swap.swapExactNASForTokens', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'swapExactNASForTokens', [amountOutMin, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapTokensForExactNASTest(amountOut, amountInMax, path, toAddress) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'swapTokensForExactNAS', [amountOut, amountInMax, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapTokensForExactNAS(amountOut, amountInMax, path, toAddress) {
        try {
            return await this._getTxResult('Swap.swapTokensForExactNAS', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'swapTokensForExactNAS', [amountOut, amountInMax, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapExactTokensForNASTest(amountIn, amountOutMin, path, toAddress) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'swapExactTokensForNAS', [amountIn, amountOutMin, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapExactTokensForNAS(amountIn, amountOutMin, path, toAddress) {
        try {
            return await this._getTxResult('Swap.swapExactTokensForNAS', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'swapExactTokensForNAS', [amountIn, amountOutMin, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapNASForExactTokensTest(amountOut, path, toAddress) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'swapNASForExactTokens', [amountOut, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async swapNASForExactTokens(amountOut, path, toAddress) {
        try {
            return await this._getTxResult('Swap.swapNASForExactTokens', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'swapNASForExactTokens', [amountOut, path, toAddress]))
        } finally {
            this._reset()
        }
    }

    async getAmountOutTest(amountIn, reserveIn, reserveOut) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAmountOut', [amountIn, reserveIn, reserveOut]))
        } finally {
            this._reset()
        }
    }

    async getAmountOut(amountIn, reserveIn, reserveOut) {
        try {
            return await this._getTxResult('Swap.getAmountOut', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAmountOut', [amountIn, reserveIn, reserveOut]))
        } finally {
            this._reset()
        }
    }

    async getAmountInTest(amountOut, reserveIn, reserveOut) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAmountIn', [amountOut, reserveIn, reserveOut]))
        } finally {
            this._reset()
        }
    }

    async getAmountIn(amountOut, reserveIn, reserveOut) {
        try {
            return await this._getTxResult('Swap.getAmountIn', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAmountIn', [amountOut, reserveIn, reserveOut]))
        } finally {
            this._reset()
        }
    }

    async getAmountsOutTest(amountIn, path) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAmountsOut', [amountIn, path]))
        } finally {
            this._reset()
        }
    }

    async getAmountsOut(amountIn, path) {
        try {
            return await this._getTxResult('Swap.getAmountsOut', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAmountsOut', [amountIn, path]))
        } finally {
            this._reset()
        }
    }

    async getAmountsInTest(amountOut, path) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAmountsIn', [amountOut, path]))
        } finally {
            this._reset()
        }
    }

    async getAmountsIn(amountOut, path) {
        try {
            return await this._getTxResult('Swap.getAmountsIn', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAmountsIn', [amountOut, path]))
        } finally {
            this._reset()
        }
    }

}


Online.mainnet = new Online(true)
Online.testnet = new Online(false)


module.exports = Online
