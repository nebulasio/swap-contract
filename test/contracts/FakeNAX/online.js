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
        return 'FakeNAX'
    }

    get _source() {
        let p = path.join(__dirname, '../../../build/output/FakeNAX.js')
        if (!fs.existsSync(p)) {
            throw p + ' not found.'
        }
        return String(fs.readFileSync(p))
    }

    async _deployTest() {
        try {
            return this._testResult(await this.nebUtil.deployTest(this._account.getAddressString(), this._source, Array.from(arguments)))
        } finally {
            this._reset()
        }
    }
    
    async _deploy() {
        try {
            return await this._getDeployResult('FakeNAX', await this.nebUtil.oneKeyDeploy(this._account, this._source, Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async nameTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'name', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async name() {
        try {
            return await this._getTxResult('FakeNAX.name', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'name', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async symbolTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'symbol', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async symbol() {
        try {
            return await this._getTxResult('FakeNAX.symbol', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'symbol', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async decimalsTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'decimals', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async decimals() {
        try {
            return await this._getTxResult('FakeNAX.decimals', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'decimals', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async totalSupplyTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'totalSupply', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async totalSupply() {
        try {
            return await this._getTxResult('FakeNAX.totalSupply', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'totalSupply', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async balanceOfTest(owner) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'balanceOf', [owner]))
        } finally {
            this._reset()
        }
    }

    async balanceOf(owner) {
        try {
            return await this._getTxResult('FakeNAX.balanceOf', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'balanceOf', [owner]))
        } finally {
            this._reset()
        }
    }

    async mintTest(value) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'mint', [value]))
        } finally {
            this._reset()
        }
    }

    async mint(value) {
        try {
            return await this._getTxResult('FakeNAX.mint', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'mint', [value]))
        } finally {
            this._reset()
        }
    }

    async transferTest(to, value) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'transfer', [to, value]))
        } finally {
            this._reset()
        }
    }

    async transfer(to, value) {
        try {
            return await this._getTxResult('FakeNAX.transfer', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'transfer', [to, value]))
        } finally {
            this._reset()
        }
    }

    async transferFromTest(from, to, value) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'transferFrom', [from, to, value]))
        } finally {
            this._reset()
        }
    }

    async transferFrom(from, to, value) {
        try {
            return await this._getTxResult('FakeNAX.transferFrom', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'transferFrom', [from, to, value]))
        } finally {
            this._reset()
        }
    }

    async approveTest(spender, currentValue, value) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'approve', [spender, currentValue, value]))
        } finally {
            this._reset()
        }
    }

    async approve(spender, currentValue, value) {
        try {
            return await this._getTxResult('FakeNAX.approve', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'approve', [spender, currentValue, value]))
        } finally {
            this._reset()
        }
    }

    async allowanceTest(owner, spender) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'allowance', [owner, spender]))
        } finally {
            this._reset()
        }
    }

    async allowance(owner, spender) {
        try {
            return await this._getTxResult('FakeNAX.allowance', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'allowance', [owner, spender]))
        } finally {
            this._reset()
        }
    }

}


Online.mainnet = new Online(true)
Online.testnet = new Online(false)


module.exports = Online
