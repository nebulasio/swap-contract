# Swap Contracts

Testnet Addresses:

WNAS
n1i57tzTKie48Gj1Hpa4fNPF4eFExKLGhuq

FNAX
n1kQjF3SckakpdoDQsXFbdZLSjRpvRuxwiC

SWAP
n1fhAhD7yQcJkiTpwVBZey7JrMBvHCXjxuE

LP
n1qwk6nPQTTVAN5ADQTsSrMXSAAXYFPxi7c


# Steps to add a new trading pair

1) Deploy a new LP token manually

with the following constructor parameters:

- swap: The SWAP contract address
- name: "Nebulas Liquidity Provider Token"
- symbol: "NLP" or anything else, for example "NLP_NAS_NAX"
- decimals: 8 is suggested

2) Call createPair with the following parameters:

- token0: The contract address of the first token.
- token1: The contract address of the second token.
- lp: The contract address of the deployed LP token.


# Adding Liquidity

1) swap.addLiquidity, is for adding liquidity on two NRC20 tokens.

- tokenA: The contract address of the first token.
- tokenB: The contract address of the second token.
- amountADesired: The desired amount of the first token.
- amountBDesired: The desired amount of the second token.
- amountAMin: Minimum amount of the first token to add. amountAMin = amountADesired * (1 - slippage). The tx will fail is actually amount is less then it.
- amountBMin: Minimum amount of the second token to add. 
- toAddress: LP token will be sent to this address.

2) swap.addLiquidityNAS, is the same as the above expect one NRC20 token is replaced by NAS.

- token: The contract address of the NRC20 token.
- amountTokenDesired: The desired amount of the NRC20 token.
- amountTokenMin: Minimum amount of the NRC20 token to add.
- amountNASMin: Minimum amount of NAS to add.
- toAddress: LP token will be sent to this address.

The sender of the TX also needs to send the desired amount of NAS.


# Remove liquidity

1) swap.removeLiquidity

- tokenA: The contract address of the first token.
- tokenB: The contract address of the second token.
- liquidity: The amount of LP token to burn.
- amountAMin: Minimum amount of the first token to receive. amountAMin = liquidity / supplyOfLP * reserveOfTokenAInPair * (1 - slippage). The tx will fail is actually amount is less then it.
- amountBMin: Minimum amount of the first token to receive.
- toAddress: tokenA and tokenB will be sent to this address.

2) swap.removeLiquidityNAS, is the same as the above expect one NRC20 token is replaced by NAS.

- token: The contract address of the token.
- liquidity: The amount of LP token to burn.
- amountTokenMin: Minimum amount of the token to receive.
- amountNASMin: Minimum amount of NAS to receive.
- toAddress: token and NAS will be sent to this address.


# Swap functions

1) swap.swapExactTokensForTokens, when the amount of the source token is determined.

- amountIn: The amount of the source token, or "token0".
- amountOutMin: The minimum amount of the destination token, or "tokenN". The tx will fail is actually amount is less then it.
- path: JSON string of ["token0", "Token1", ... "TokenN"]
- toAddress: TokenN will be sent to this address.

2) swap.swapTokensForExactTokens, when the amount of the destination token is determined.

- amountOut: The amount of the destination token, or "tokenN".
- amountInMax: The maximum amount of the source token, or "token0". The tx will fail is actually amount is more then it.
- path: JSON string of ["token0", "Token1", ... "TokenN"]
- toAddress: TokenN will be sent to this address.

3) swap.swapExactNASForTokens, similar to swapExactTokensForTokens, but token0 must be WNAS, and tx sender needs to send NAS.

- amountOutMin
- path
- toAddress

4) swap.swapTokensForExactNAS, similar to swapTokensForExactTokens, but tokenN must be NAS

- amountOut
- amountInMax
- path
- toAddress

5) swap.swapExactTokensForNAS

- amountIn
- amountOutMin
- path
- toAddress

6) swap.swapNASForExactTokens

- amountOut
- path
- toAddress


# Other functions

1) swap.getAmountsOut, estimate swap result given the provided amount, called before swapExactTokensForTokens, 

- amountIn
- path

2) swap.getAmountsIn, estimate need amount given the wanted amount, called before swapTokensForExactTokens

- amountOut
- path

3) swap.getPair, given token0 and token1, get the details of the pair.

- token0
- token1

4) swap.allPairs, no parameter, get all pairs of the swap
