/** Automatically generated code, please do not modify. */
const FakeNAX = require('./contracts/FakeNAX/online.js').testnet
const FakeNAXMainnet = require('./contracts/FakeNAX/online.js').mainnet
const LPToken = require('./contracts/LPToken/online.js').testnet
const LPTokenMainnet = require('./contracts/LPToken/online.js').mainnet
const MultiSig = require('./contracts/MultiSig/online.js').testnet
const MultiSigMainnet = require('./contracts/MultiSig/online.js').mainnet
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
    // await WNAS._deploy()
    // await NUSDT._deploy()
    // await FakeNAX._deploy()
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
    // let naxValue = TestUtils.nax(100000000)
    // await FakeNAX.mint(naxValue)
    // await FakeNAX.approve(ConfigManager.getOnlineContractAddress(Swap), '0', naxValue)
    // await Swap._setValue(TestUtils.nas(1000)).addLiquidityNAS(
    //     ConfigManager.getOnlineContractAddress(FakeNAX), 
    //     TestUtils.nax(132000), 
    //     TestUtils.nax(13200), 
    //     TestUtils.nas(100), 
    //     TestKeys.caller.getAddressString())

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
    let nUSDTValue = TestUtils.usdt(5000)
    // await NUSDT.mint(nUSDTValue)
    await NUSDT.approve(ConfigManager.getOnlineContractAddress(Swap), '0', nUSDTValue)
    await Swap._setValue(TestUtils.nas(1000)).addLiquidityNAS(
        ConfigManager.getOnlineContractAddress(NUSDT), 
        TestUtils.usdt(245), 
        TestUtils.usdt(24), 
        TestUtils.nas(100), 
        TestKeys.caller.getAddressString())

    // nusdt-nax
    await Swap.addLiquidity(
        ConfigManager.getOnlineContractAddress(NUSDT),
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        TestUtils.usdt(186), 
        TestUtils.nax(100000), 
        TestUtils.usdt(15), 
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
    // remove nas nax
    let liquidity = await LPToken.balanceOfTest(TestKeys.caller.getAddressString())
    let allowance = await LPToken.allowanceTest(TestKeys.caller.getAddressString(), ConfigManager.getOnlineContractAddress(Swap))
    TestUtils.log('nas nax lp balance', liquidity)
    TestUtils.log('nas nax lp allowance', allowance)
    await LPToken.approve(ConfigManager.getOnlineContractAddress(Swap), allowance, liquidity)
    await Swap.removeLiquidityNAS(
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        liquidity, 
        1, 
        1, 
        TestKeys.caller.getAddressString())

    // remove nUSDT nax
    liquidity = await NUSDTNAXLPToken.balanceOfTest(TestKeys.caller.getAddressString())
    allowance = await NUSDTNAXLPToken.allowanceTest(TestKeys.caller.getAddressString(), ConfigManager.getOnlineContractAddress(Swap))
    TestUtils.log('nUSDT nax lp balance', liquidity)
    TestUtils.log('nUSDT nax lp allowance', allowance)
    await NUSDTNAXLPToken.approve(ConfigManager.getOnlineContractAddress(Swap), allowance, liquidity)
    await Swap.removeLiquidity(
        ConfigManager.getOnlineContractAddress(FakeNAX), 
        ConfigManager.getOnlineContractAddress(NUSDT), 
        liquidity, 
        1, 
        1, 
        TestKeys.caller.getAddressString())

    // remove nas nUSDT
    liquidity = await NUSDTNASLPToken.balanceOfTest(TestKeys.caller.getAddressString())
    allowance = await NUSDTNASLPToken.allowanceTest(TestKeys.caller.getAddressString(), ConfigManager.getOnlineContractAddress(Swap))
    TestUtils.log('nUSDT nas lp balance', liquidity)
    TestUtils.log('nUSDT nas lp allowance', allowance)
    await NUSDTNASLPToken.approve(ConfigManager.getOnlineContractAddress(Swap), allowance, liquidity)
    await Swap.removeLiquidityNAS(
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

async function testMultiSig() {
    // await MultiSig._deploy(['n1MFYkKX28Urr1ByeERWK5vu6XgZDBHTLTV','n1U1U1xZa95gJbByUXKNQ3A6zswYtDxz2z6','n1FHjH2A4kzEBHGEth9Wi8uM1Rzjp3Aj5Fn','n1Q5GFCpjMPakGfx1m5CgcePrTRuTWu9yqj'], 2)
    TestUtils.log('multisig', ConfigManager.getOnlineContractAddress(MultiSig))
    TestUtils.log('owners', await MultiSig.getOwnersTest())
    TestUtils.log('require', await MultiSig.getRequiredTest())
    // await MultiSig.addProposal(null, '0','_addOwner',['n1aNmaBsUoGpV9gQL2rciexKuWMF7cfeqWe'])
    // TestUtils.log('proposal count', await MultiSig.getProposalCountTest())
    // await MultiSig.confirmProposal(0)
    // await MultiSig._setAccount(TestKeys.deployer).confirmProposal(0)
    // TestUtils.log('owners', await MultiSig.getOwnersTest())
    // TestUtils.log('require', await MultiSig.getRequiredTest())
    await MultiSig.addProposal(ConfigManager.getOnlineContractAddress(Swap), '0', 'transferOwnership', [TestKeys.deployer.getAddressString()])
    let count = await MultiSig.getProposalCountTest()
    TestUtils.log('proposal count', count)
    await MultiSig.confirmProposal(count-1)
    await MultiSig._setAccount(TestKeys.deployer).confirmProposal(count-1)
    TestUtils.log('owner', await Swap.getOwnerTest())
}

async function main() {
    TestUtils.log("deployer", TestKeys.deployer.getAddressString())
    TestUtils.log("caller", TestKeys.caller.getAddressString())

    // await transferToken()
    // return

    // await deploy()
    //old nax n1mMUcxeDY6TWzyiTLFFUAQAb4bXUrYtvFb

    TestUtils.log('owner', await Swap.getOwnerTest())
    await Swap.transferOwnership(ConfigManager.getOnlineContractAddress(MultiSig))
    TestUtils.log('owner', await Swap.getOwnerTest())
    await testMultiSig()
    return

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
    TestUtils.log("swap pair", await Swap.getPairTest(ConfigManager.getOnlineContractAddress(NUSDT), ConfigManager.getOnlineContractAddress(FakeNAX)))
    // await NUSDT.transfer("n1dHKZTnMA2hmocLD35UfqG6kwDQ3Uq92nS", TestUtils.usdt("1000"))
    // await FakeNAX.transfer("n1dHKZTnMA2hmocLD35UfqG6kwDQ3Uq92nS", TestUtils.nax("1000"))

    // let inAmount = await Swap.getAmountsInTest(TestUtils.usdt(1), [ConfigManager.getOnlineContractAddress(WNAS), ConfigManager.getOnlineContractAddress(NUSDT)])
    // TestUtils.log('nas-nax amountsIn', inAmount)

    // await testWNAS()
    // await testPair()
    // await testAddLiquidity()
    // await testSwap()
    // await testRemoveLiquidity()

    // TestUtils.log("nax balance", await FakeNAX.balanceOfTest(TestKeys.caller.getAddressString()))
    // TestUtils.log("nUSDT balance", await NUSDT.balanceOfTest(TestKeys.caller.getAddressString()))
}

main()
