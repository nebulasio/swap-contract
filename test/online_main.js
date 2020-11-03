/** Automatically generated code, please do not modify. */
const FakeNAX = require('./contracts/FakeNAX/online.js').testnet
const FakeNAXMainnet = require('./contracts/FakeNAX/online.js').mainnet
const LPToken = require('./contracts/LPToken/online.js').testnet
const LPTokenMainnet = require('./contracts/LPToken/online.js').mainnet
const NUSDT = require('./contracts/NUSDT/online.js').testnet
const NUSDTMainnet = require('./contracts/NUSDT/online.js').mainnet
const NUSDTNASLPToken = require('./contracts/NUSDTNASLPToken/online.js').testnet
const NUSDTNASLPTokenMainnet = require('./contracts/NUSDTNASLPToken/online.js').mainnet
const NUSDTNAXLPToken = require('./contracts/NUSDTNAXLPToken/online.js').testnet
const NUSDTNAXLPTokenMainnet = require('./contracts/NUSDTNAXLPToken/online.js').mainnet
const Swap = require('./contracts/Swap/online.js').testnet
const SwapMainnet = require('./contracts/Swap/online.js').mainnet
const WNAS = require('./contracts/WNAS/online.js').testnet
const WNASMainnet = require('./contracts/WNAS/online.js').mainnet
/** Automatically generated code; End. */

const TestKeys = require('../lib/test_keys.js')
const ConfigRunner = require('../lib/config_runner.js')
const ConfigManager = require('../lib/config_manager.js')
const NebUtil = require('../lib/neb_util.js')
const BigNumber = require('bignumber.js')
const TestUtils = require('./utils.js')

async function deploy() {
    await WNAS._deploy()
    // await NUSDT._deploy()
    await FakeNAX._deploy()
    await Swap._deploy(ConfigManager.getOnlineContractAddress(WNAS))
    await LPToken._deploy(ConfigManager.getOnlineContractAddress(Swap), "Nebulas NAS-NAX LPToken", "LP-NAS-NAX", 18)
    await NUSDTNASLPToken._deploy(ConfigManager.getOnlineContractAddress(Swap), "Nebulas nUSDT-NAS LPToken", "LP-nUSDT-NAS", 18)
    await NUSDTNAXLPToken._deploy(ConfigManager.getOnlineContractAddress(Swap), "Nebulas nUSDT-NAX LPToken", "LP-nUSDT-NAX", 18)
}

async function testWNAS() {
    TestUtils.log('WNAS totalSupply', await WNAS.totalSupplyTest())
    await WNAS._setValue(TestUtils.nas(10)).deposit()
    TestUtils.log('WNAS totalSupply', await WNAS.totalSupplyTest())
    TestUtils.log('WNAS balance', await WNAS.balanceOfTest(TestKeys.caller.getAddressString()))

    await WNAS.withdraw(TestUtils.nas(1))
    TestUtils.log('WNAS totalSupply', await WNAS.totalSupplyTest())
    TestUtils.log('WNAS balance', await WNAS.balanceOfTest(TestKeys.caller.getAddressString()))
}

async function testPair() {
    let pairs = await Swap.allPairsTest()
    if (pairs.length === 0) {
        await Swap.createPair(ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(FakeNAX), ConfigManager.getOnlineContractAddress(LPToken))
        await Swap.createPair(ConfigManager.getOnlineContractAddress(NUSDT), ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(NUSDTNASLPToken))
        await Swap.createPair(ConfigManager.getOnlineContractAddress(NUSDT), ConfigManager.getOnlineContractAddress(FakeNAX), ConfigManager.getOnlineContractAddress(NUSDTNAXLPToken))
    }
    TestUtils.log('all pairs', await Swap.allPairsTest())
}

async function testAddLiquidity() {
    TestUtils.log("addLiquidity")
    //nas-nax
    let naxValue = TestUtils.nax(100000000)
    await FakeNAX.mint(naxValue)
    await FakeNAX.approve(ConfigManager.getOnlineContractAddress(Swap), 0, naxValue)
    await Swap._setValue(TestUtils.nas(1000)).addLiquidityNAS(
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        TestUtils.nax(135000), 
        TestUtils.nax(13500), 
        TestUtils.nas(100), 
        TestKeys.caller.getAddressString())

    // let wnasValue = TestUtils.nas(10)
    // await WNAS._setValue(wnasValue).deposit()
    // let allowance = await WNAS.allowanceTest(TestKeys.caller.getAddressString(), ConfigManager.getOnlineContractAddress(Swap))
    // await WNAS.approve(ConfigManager.getOnlineContractAddress(Swap), allowance, wnasValue)
    // await Swap.addLiquidity(
    //     ConfigManager.getOnlineContractAddress(WNAS),
    //     ConfigManager.getOnlineContractAddress(FakeNAX), 
    //     wnasValue, 
    //     TestUtils.nax(100), 
    //     TestUtils.nas(1), 
    //     TestUtils.nax(10),
    //     TestKeys.caller.getAddressString())

    // nUSDT-nas
    let nUSDTValue = TestUtils.usdt(10000)
    // await NUSDT.mint(nUSDTValue)
    await NUSDT.approve(ConfigManager.getOnlineContractAddress(Swap), '0', nUSDTValue)
    await Swap._setValue(TestUtils.nas(1000)).addLiquidityNAS(
        ConfigManager.getOnlineContractAddress(NUSDT), 
        TestUtils.usdt(262), 
        TestUtils.usdt(26), 
        TestUtils.nas(100), 
        TestKeys.caller.getAddressString())

    // nusdt-nax
    await Swap.addLiquidity(
        ConfigManager.getOnlineContractAddress(NUSDT),
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        TestUtils.usdt(194), 
        TestUtils.nax(100000), 
        TestUtils.usdt(19), 
        TestUtils.nax(10000),
        TestKeys.caller.getAddressString())
}

async function testSwap() {
    TestUtils.log("swap")

    // 查询对价信息
    // 取token0,token1对应的储备金reserve0/reserve1的比例
    // {
    //     "createdTime":1603523245,
    //     "token0":"n1qMEjaQCTUXiP2Yg5rMUcs4e2zg6tuiqxs",
    //     "token1":"n1sJjc8T6u6yWkSnakyHoMeLPCtKoWPxxCi",
    //     "reserve0":"100000000000000",
    //     "reserve1":"1000000000",
    //     "blockTimestampLast":1603523657,
    //     "price0CumulativeLast":"0",
    //     "price1CumulativeLast":"0",
    //     "lp":"n1fcNcN5RZafoij4uLZW7j7J6zVzHhZPmnz"
    // }
    TestUtils.log("usdt-nax", await Swap.getPairTest(ConfigManager.getOnlineContractAddress(NUSDT), ConfigManager.getOnlineContractAddress(FakeNAX)))

    // 根据精确的token交换尽量多的token
    await Swap.swapExactTokensForTokens(
        TestUtils.usdt(1), 
        TestUtils.nax(1), 
        [ConfigManager.getOnlineContractAddress(NUSDT), ConfigManager.getOnlineContractAddress(FakeNAX)], 
        TestKeys.caller.getAddressString())

    // 使用尽量少的token交换精确的token
    await Swap.swapTokensForExactTokens(
        TestUtils.nax(1), 
        TestUtils.usdt(1), 
        [ConfigManager.getOnlineContractAddress(NUSDT), ConfigManager.getOnlineContractAddress(FakeNAX)], 
        TestKeys.caller.getAddressString())

    TestUtils.log("nas nax", await Swap.getPairTest(ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(FakeNAX)))
    // 使用精确的nas换取尽量多的token
    await Swap._setValue(TestUtils.nas(1)).swapExactNASForTokens(
        TestUtils.nax(1), 
        [ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(FakeNAX)], 
        TestKeys.caller.getAddressString())

    // 使用token换取精确的nas
    await Swap.swapTokensForExactNAS(
        TestUtils.nas(1), 
        TestUtils.nax(1000), 
        [ConfigManager.getOnlineContractAddress(FakeNAX), ConfigManager.getOnlineContractAddress(WNAS)], 
        TestKeys.caller.getAddressString())

    // 使用精确的token换取nas
    await Swap.swapExactTokensForNAS(
        TestUtils.nax(1000), 
        TestUtils.nas(1),
        [ConfigManager.getOnlineContractAddress(FakeNAX), ConfigManager.getOnlineContractAddress(WNAS)], 
        TestKeys.caller.getAddressString())

    TestUtils.log("nas nUSDT", await Swap.getPairTest(ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(NUSDT)))
    // 使用nas换取精确的token
    await Swap._setValue(TestUtils.nas(10)).swapNASForExactTokens(
        TestUtils.usdt(1), 
        [ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(NUSDT)], 
        TestKeys.caller.getAddressString())
}

async function testRemoveLiquidity() {
    TestUtils.log("removeLiquidity")
    // remove Liquidity
    let liquidity = await LPToken.balanceOfTest(TestKeys.caller.getAddressString())
    await LPToken.approve(ConfigManager.getOnlineContractAddress(Swap), 0, liquidity)
    await Swap.removeLiquidityNAS(
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        liquidity, 
        1, 
        1, 
        TestKeys.caller.getAddressString())

    // remove nUSDT nax
    liquidity = await NUSDTNAXLPToken.balanceOfTest(TestKeys.caller.getAddressString())
    await NUSDTNAXLPToken.approve(ConfigManager.getOnlineContractAddress(Swap), 0, liquidity)
    await Swap.removeLiquidity(
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        ConfigManager.getOnlineContractAddress(NUSDT), 
        liquidity, 
        1, 
        1, 
        TestKeys.caller.getAddressString())
}

async function transferToken() {
    await NUSDT.transfer('n1FBab8bN4muMJrUL3P3VLoozCeKyn4w3qs', TestUtils.usdt(1000))
    await NUSDT.transfer('n1aNmaBsUoGpV9gQL2rciexKuWMF7cfeqWe', TestUtils.usdt(1000))

    await FakeNAX.transfer('n1FBab8bN4muMJrUL3P3VLoozCeKyn4w3qs', TestUtils.nax(10000))
    await FakeNAX.transfer('n1aNmaBsUoGpV9gQL2rciexKuWMF7cfeqWe', TestUtils.nax(10000))
}

async function main() {
    TestUtils.log("deployer", TestKeys.deployer.getAddressString())
    TestUtils.log("caller", TestKeys.caller.getAddressString())

    // await transferToken()
    // return

    // await deploy()

    let addrs = {
        WNAS: ConfigManager.getOnlineContractAddress(WNAS),
        nUSDT: ConfigManager.getOnlineContractAddress(NUSDT),
        NAX: ConfigManager.getOnlineContractAddress(FakeNAX),
        swap: ConfigManager.getOnlineContractAddress(Swap),
        nASNAXLPToken: ConfigManager.getOnlineContractAddress(LPToken),
        nUSDTNASLPToken: ConfigManager.getOnlineContractAddress(NUSDTNASLPToken),
        nUSDTNAXLPToken: ConfigManager.getOnlineContractAddress(NUSDTNAXLPToken)
    }
    TestUtils.log("swap addrs", addrs)
    await NUSDT.transfer("n1dHKZTnMA2hmocLD35UfqG6kwDQ3Uq92nS", TestUtils.usdt("1000"))

    // let inAmount = await Swap.getAmountsInTest(TestUtils.usdt(0.1), [ConfigManager.getOnlineContractAddress(FakeNAX), ConfigManager.getOnlineContractAddress(NUSDT)])
    // TestUtils.log('in', inAmount)

    // await testWNAS()
    // await testPair()
    // await testAddLiquidity()
    // await testSwap()
    // await testRemoveLiquidity()
}

main()
