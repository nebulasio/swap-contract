/** Automatically generated code, please do not modify. */
const FakeNAX = require('./contracts/FakeNAX/local.js')
const LPToken = require('./contracts/LPToken/local.js')
const NUSDT = require('./contracts/NUSDT/local.js')
const NUSDTNASLPToken = require('./contracts/NUSDTNASLPToken/local.js')
const NUSDTNAXLPToken = require('./contracts/NUSDTNAXLPToken/local.js')
const Swap = require('./contracts/Swap/local.js')
const WNAS = require('./contracts/WNAS/local.js')
/** Automatically generated code; End. */

const TestKeys = require('../lib/test_keys.js')
const LocalContext = require('../lib/neblocal.js').LocalContext
const ConfigRunner = require('../lib/config_runner.js')
const BigNumber = require('bignumber.js')
const TestUtils = require('./utils.js')

// 清空模拟环境数据
LocalContext.clearData()

async function deploy() {
    WNAS._deploy()
    NUSDT._deploy()
    FakeNAX._deploy()
    Swap._deploy(LocalContext.getContractAddress(WNAS))
    LPToken._deploy(LocalContext.getContractAddress(Swap), "Nebulas NAS-NAX LPToken", "LP-NAS-NAX", 18)
    NUSDTNASLPToken._deploy(LocalContext.getContractAddress(Swap), "Nebulas nUSDT-NAS LPToken", "LP-nUSDT-NAS", 18)
    NUSDTNAXLPToken._deploy(LocalContext.getContractAddress(Swap), "Nebulas nUSDT-NAX LPToken", "LP-nUSDT-NAX", 18)


    let addrs = {
        WNAS: LocalContext.getContractAddress(WNAS),
        nUSDT: LocalContext.getContractAddress(NUSDT),
        nax: LocalContext.getContractAddress(FakeNAX),
        swap: LocalContext.getContractAddress(Swap),
        NASNAXLPToken: LocalContext.getContractAddress(LPToken),
        NUSDTNASLPToken: LocalContext.getContractAddress(NUSDTNASLPToken),
        NUSDTNAXLPToken: LocalContext.getContractAddress(NUSDTNAXLPToken)
    }

    TestUtils.log("swap addrs", addrs)
}

async function testWNAS() {
    TestUtils.log('WNAS totalSupply', WNAS.totalSupply())
    WNAS._setValue(TestUtils.nas(100)).deposit()
    TestUtils.log('WNAS totalSupply', WNAS.totalSupply())
    TestUtils.log('WNAS balance', WNAS.balanceOf(TestKeys.caller.getAddressString()))

    WNAS.withdraw(TestUtils.nas(10))
    TestUtils.log('WNAS totalSupply', WNAS.totalSupply())
    TestUtils.log('WNAS balance', WNAS.balanceOf(TestKeys.caller.getAddressString()))
}

async function testPair() {
    Swap.createPair(LocalContext.getContractAddress(WNAS), LocalContext.getContractAddress(FakeNAX), LocalContext.getContractAddress(LPToken))

    try {
        Swap.createPair(LocalContext.getContractAddress(FakeNAX), LocalContext.getContractAddress(WNAS), LocalContext.getContractAddress(LPToken))
    } catch (e) {
        TestUtils.log('create pair duplicated', e)
    }

    TestUtils.log('all pairs', Swap.allPairs())

    Swap.createPair(LocalContext.getContractAddress(NUSDT), LocalContext.getContractAddress(WNAS), LocalContext.getContractAddress(NUSDTNASLPToken))
    Swap.createPair(LocalContext.getContractAddress(NUSDT), LocalContext.getContractAddress(FakeNAX), LocalContext.getContractAddress(NUSDTNAXLPToken))

    TestUtils.log('all pairs', Swap.allPairs())
}

async function testAddLiquidity() {
    TestUtils.log("addLiquidity")
    //nas-nax
    let naxValue = TestUtils.nax(10000000)
    FakeNAX.mint(naxValue)
    FakeNAX.approve(LocalContext.getContractAddress(Swap), 0, naxValue)
    Swap._setValue(TestUtils.nas(100)).addLiquidityNAS(
        LocalContext.getContractAddress(FakeNAX), 
        TestUtils.nax(10000), 
        TestUtils.nax(1000), 
        TestUtils.nas(10), 
        TestKeys.caller.getAddressString())

    let wnasValue = TestUtils.nas(10)
    WNAS._setValue(wnasValue).deposit()
    let allowance = WNAS.allowance(TestKeys.caller.getAddressString(), LocalContext.getContractAddress(Swap))
    WNAS.approve(LocalContext.getContractAddress(Swap), allowance, wnasValue)
    Swap.addLiquidity(
        LocalContext.getContractAddress(WNAS),
        LocalContext.getContractAddress(FakeNAX), 
        wnasValue, 
        TestUtils.nax(100), 
        TestUtils.nas(1), 
        TestUtils.nax(10),
        TestKeys.caller.getAddressString())

    // nUSDT-nas
    let nUSDTValue = TestUtils.usdt(100000)
    NUSDT.mint(nUSDTValue)
    NUSDT.approve(LocalContext.getContractAddress(Swap), 0, nUSDTValue)
    Swap._setValue(TestUtils.nas(3000)).addLiquidityNAS(
        LocalContext.getContractAddress(NUSDT), 
        TestUtils.usdt(1000), 
        TestUtils.usdt(70), 
        TestUtils.nas(70), 
        TestKeys.caller.getAddressString())

    // nusdt-nax
    Swap.addLiquidity(
        LocalContext.getContractAddress(NUSDT),
        LocalContext.getContractAddress(FakeNAX), 
        TestUtils.usdt(1000), 
        TestUtils.nax(100000), 
        TestUtils.usdt(50), 
        TestUtils.nax(9000),
        TestKeys.caller.getAddressString())
}

async function testSwap() {
    TestUtils.log("swap")

    // 根据精确的token交换尽量多的token
    Swap.swapExactTokensForTokens(
        TestUtils.usdt(1), 
        TestUtils.nax(1), 
        [LocalContext.getContractAddress(NUSDT), LocalContext.getContractAddress(FakeNAX)], 
        TestKeys.caller.getAddressString())

    // 使用尽量少的token交换精确的token
    Swap.swapTokensForExactTokens(
        TestUtils.nax(1), 
        TestUtils.usdt(1), 
        [LocalContext.getContractAddress(NUSDT), LocalContext.getContractAddress(FakeNAX)], 
        TestKeys.caller.getAddressString())

    // 使用精确的nas换取尽量多的token
    Swap._setValue(TestUtils.nas(1)).swapExactNASForTokens(
        TestUtils.nax(1), 
        [LocalContext.getContractAddress(WNAS), LocalContext.getContractAddress(FakeNAX)], 
        TestKeys.caller.getAddressString())

    // 使用token换取精确的nas
    Swap.swapTokensForExactNAS(
        TestUtils.nas(1), 
        TestUtils.nax(1000), 
        [LocalContext.getContractAddress(FakeNAX), LocalContext.getContractAddress(WNAS)], 
        TestKeys.caller.getAddressString())

    // 使用精确的token换取nas
    Swap.swapExactTokensForNAS(
        TestUtils.nax(1000), 
        TestUtils.nas(1),
        [LocalContext.getContractAddress(FakeNAX), LocalContext.getContractAddress(WNAS)], 
        TestKeys.caller.getAddressString())

    // 使用nas换取精确的token
    Swap._setValue(TestUtils.nas(100)).swapNASForExactTokens(
        TestUtils.usdt(1), 
        [LocalContext.getContractAddress(WNAS), LocalContext.getContractAddress(FakeNAX), LocalContext.getContractAddress(NUSDT)], 
        TestKeys.caller.getAddressString())
}

async function testRemoveLiquidity() {
    TestUtils.log("removeLiquidity")
    // remove Liquidity
    let liquidity = LPToken.balanceOf(TestKeys.caller.getAddressString())
    LPToken.approve(LocalContext.getContractAddress(Swap), 0, liquidity)
    Swap.removeLiquidityNAS(
        LocalContext.getContractAddress(FakeNAX), 
        liquidity, 
        1, 
        1, 
        TestKeys.caller.getAddressString())

    try {
        Swap.removeLiquidityNAS(
            LocalContext.getContractAddress(FakeNAX), 
            liquidity, 
            1, 
            1, 
            TestKeys.caller.getAddressString())
    } catch (e) {
        TestUtils.log('out of liquidity remove', e)
    }

    // remove nUSDT nax
    liquidity = NUSDTNAXLPToken.balanceOf(TestKeys.caller.getAddressString())
    NUSDTNAXLPToken.approve(LocalContext.getContractAddress(Swap), 0, liquidity)
    Swap.removeLiquidity(
        LocalContext.getContractAddress(FakeNAX), 
        LocalContext.getContractAddress(NUSDT), 
        liquidity, 
        1, 
        1, 
        TestKeys.caller.getAddressString())
}

async function main() {

    LocalContext.transfer(null, TestKeys.caller.getAddressString(), TestUtils.nas('10000000'))
    TestUtils.log("deployer", TestKeys.deployer.getAddressString())
    TestUtils.log("caller", TestKeys.caller.getAddressString())

    await deploy()
    await testWNAS()
    await testPair()
    await testAddLiquidity()
    await testSwap()
    await testRemoveLiquidity()
}

main()
