<!--
 * @Author: your name
 * @Date: 2022-02-10 18:08:05
 * @LastEditTime: 2022-02-10 18:11:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\study\react_web3_core.md
-->

## 是否经授权 登录metamask
```js
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { injected } from '../web3/connect'

export default function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
      // 是否经授权 登录metamask
      injected.isAuthorized().then(isAuthorized => {
          if (isAuthorized) {
              activate(injected, undefined, true).catch(() => {
                  setTried(true)
              })
          } else {
              setTried(true)
          }
      })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
      if (!tried && active) {
          setTried(true)
      }
  }, [tried, active])

  return tried
}
```
## 断开链接的操作监听
```js
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { injected } from '../web3/connect'
export default function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()
  useEffect(() => {
    const { ethereum } = window
    // 断开链接的操作监听
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = chainId => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected)
      }
      const handleAccountsChanged = accounts => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = networkId => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}

```

## 错误集合封装
```js
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return '未检测到以太坊浏览器扩展，请在桌面安装MetaMask或在移动端通过dApp浏览器访问.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "您连接到一个不支持的网络。."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return '请授权本网站访问您的以太坊账户...'
  } else {
    console.error(error)
    return '发生了未知错误。查看控制台了解更多细节。.'
  }
}

```

## 链切换 链添加
```js
/*
 * @Author: your name
 * @Date: 2022-02-10 10:26:09
 * @LastEditTime: 2022-02-10 11:45:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dapp\react-mobile\r-mobile\src\web3\chainRequest.js
 */
import { ChainId } from './connect'
const SCAN_ADDRESS = {
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BNB]: 'https://testnet.bscscan.com/',
}
const networkConf = {
  [ChainId.BSC]: {
    chainId: `0x${(56).toString(16)}`,
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
  [ChainId.BNB]: {
    chainId: `0x${(97).toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BNB]],
  },
}

export const changeNetwork = chainId => {
  return new Promise(reslove => {
    const { ethereum } = window
    if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        })
        .then(() => {
          reslove()
        })
        .catch(error => {
          const { code } = error
          if (code === 4902) {
            ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    ...networkConf[chainId],
                  },
                ],
              })
              .then(() => {
                setTimeout(reslove, 500)
              })
          }
        })
    } else {
      reslove()
    }
  })
}

```

## 链链接
```js
/*
 * @Author: lcz
 * @Date: 2022-02-09 10:24:49
 * @LastEditTime: 2022-02-10 10:58:55
 * @LastEditors: Please set LastEditors
 * @Description: web3的链接
 * @FilePath: \dapp\react-mobile\r-mobile\src\web3\connect.js
 */

// env: {
//   RPC_URL_1: 'https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f',
//   RPC_URL_4: 'https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f',
//   FORTMATIC_API_KEY: 'pk_test_A6260FCBAA2EBDFB',
//   MAGIC_API_KEY: 'pk_test_398B82F5F0E88874',
//   PORTIS_DAPP_ID: 'e9be171c-2b7f-4ff0-8db9-327707511ee2',
//   SQUARELINK_CLIENT_ID: '5f2a2233db82b06b24f9'
// }
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

// 链ID 16进制
export const ChainId = {
  BSC: `0x${(56).toString(16)}`, // binance smart chain 0x38 56
  BNB: `0x${(97).toString(16)}`, // binance smart chain testnet 0x61 97
  GANACHE: 1337, // Ganache 5777 1337
}
// 链ID 10进制
export const ChainId10 = {
  BSC: 56, // binance smart chain 0x38 56
  BNB: 97, // binance smart chain testnet 0x61 97
  GANACHE: 1337, // Ganache 5777 1337
}
const supportedChainIds = [ChainId10.BSC, ChainId10.BNB, ChainId10.GANACHE]
// metamask链接注入
export const injected = new InjectedConnector({
  supportedChainIds,
})



export const getRpcUrl = chainId => {
  const RPC_URLS = {
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainId.BNB]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    [ChainId.GANACHE]: 'http://127.0.0.1:7545',
  }
  return RPC_URLS[chainId]
}
// wallectConnent 链接 扫码连接配置
export const POLLING_INTERVAL = 8000

export const wallet = new WalletConnectConnector({
  // supportedChainIds
  rpc: { [ChainId.BNB]: getRpcUrl(ChainId.BNB) },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})



```

### Account
```jsx
/*
 * @Author: your name
 * @Date: 2022-02-09 12:00:38
 * @LastEditTime: 2022-02-09 12:06:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dapp\react-mobile\r-mobile\src\components\web3\Account.jsx
 */
import { useWeb3React } from '@web3-react/core'

const Account = () => {
  var { account } = useWeb3React()

  return (
    <>
      <span>Account</span>
      <span>
        {account === null
          ? '-'
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ''}
      </span>
    </>
  )
}
export default Account

```

## Balance
```jsx
/*
 * @Author: your name
 * @Date: 2022-02-09 12:02:44
 * @LastEditTime: 2022-02-10 13:01:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dapp\react-mobile\r-mobile\src\components\web3\Balance.jsx
 */
import { useWeb3React } from '@web3-react/core'
import React, { useState, useEffect } from 'react'
import { formatEther } from '@ethersproject/units' //单位转换

const Balance = () => {
  var { account, chainId, library } = useWeb3React()
  const [balance, setBalance] = useState()
  useEffect(() => {
    if (!!account) {
      let stale = false
      // console.log(library,222)
      library.eth
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, chainId, library])
  
  return (
    <>
      <span>Balance:</span>
      {/* <span>{balance === null ? '无' : `${formatEther(balance)}`}</span> */}
      {/* <span>{balance === null ? '无' : balance ? formatEther(balance) : ''}</span> */}
      <span>{balance === null ? '无' : balance ? library?.utils.fromWei(balance,'ether') ?? '' : ''}</span>
    </>
  )
}
export default Balance

```

## BlockNumber
```jsx
/*
 * @Author: your name
 * @Date: 2022-02-09 11:24:19
 * @LastEditTime: 2022-02-10 13:01:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dapp\react-mobile\r-mobile\src\components\web3\BlockNumber.jsx
 */
import React, { useState, useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

// 获取块高度
const BlockNumber = () => {
  const { chainId, library } = useWeb3React()
  const [blockNumber, setBlockNumber] = useState()
  useEffect(() => {
    // console.log(library, 232)
    if (!!library) {
      let stale = false
      library.eth
        .getBlockNumber()
        .then(blockNumber => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = blockNumber => {
        setBlockNumber(blockNumber)
      }

      if (library.on) {
        library.on('block', updateBlockNumber)
      }

      return () => {
        stale = true
        if (library.on) {
          library.removeListener('block', updateBlockNumber)
        }
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId])
  return (
    <>
      <span>Block Number:</span>
      <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
    </>
  )
}
export default BlockNumber

```

## 链ID
```jsx
/*
 * @Author: your name
 * @Date: 2022-02-09 11:58:42
 * @LastEditTime: 2022-02-09 11:58:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dapp\react-mobile\r-mobile\src\components\web3\ChainId.jsx
 */
import { useWeb3React } from '@web3-react/core'

const ChainId = () => {
  const { chainId } = useWeb3React()

  return (
    <>
      <span>Chain Id</span>
      <span>{chainId ?? ''}</span>
    </>
  )
}
export default ChainId
```

## Dapp 测试页面
```jsx
/*
 * @Author: your name
 * @Date: 2022-02-09 10:06:40
 * @LastEditTime: 2022-02-10 17:52:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dapp\react-mobile\r-mobile\src\pages\dapp\index.jsx
 */
import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { injected, wallet } from '../../web3/connect'
import { getErrorMessage } from '../../web3/error'
import BlockNumber from '../../components/web3/BlockNumber'
import ChainId from '../../components/web3/ChainId'
import Balance from '../../components/web3/Balance'
import { changeNetwork } from '../../web3/chain'
import { StorageSet, StorageRemove, StorageGet } from '../../utils/storage'
import { ISCHAINCONNENT } from '../../utils/enum'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import useEagerConnect  from '../../hooks/useEagerConnect'
import useInactiveListener  from '../../hooks/useInactiveListener'
const Dapp = () => {
  // 当前连接的library
  // deactivate 断开连接的方法
  // chainId 当前连接的链id
  // account 当前连接的钱包账户地址
  // active  当前连接的状态，是否连接
  // error 错误
  const { active, account, library, connector, chainId, activate, deactivate, error } = useWeb3React()

  const [signAddress, setSignAddress] = useState()
  const [heyues, setheyue] = useState()
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager)
  // // 本地显示链链接
  // useAsyncEffect(async () => {
  //   if (StorageGet(ISCHAINCONNENT)) {
  //     await activate(injected)
  //   }
  // }, [])

  // // 设置链是否链接 存本地
  // useEffect(() => {
  //   if (active) {
  //     StorageSet(ISCHAINCONNENT, true)
  //   } else {
  //     StorageRemove(ISCHAINCONNENT)
  //   }
  // }, [active])

  const connectMetaMask = useCallback(async () => {
    try {
      console.log('start to connect MetaMask')
      await deactivate()
      await activate(injected)
      await changeNetwork(`0x${(97).toString(16)}`)
      console.log('MetaMask connected')
    } catch (ex) {
      console.error('connect error', ex)
    }
  }, [activate])

  const disconnectMetaMask = useCallback(async () => {
    try {
      deactivate()
    } catch (ex) {
      console.error('disconnect error', ex)
    }
  }, [deactivate])

  const connectWallet = useCallback(async () => {
    try {
      console.log('start to connect Wallet')
      await activate(wallet)
      console.log('Wallet connected')
    } catch (ex) {
      console.error('connect error', ex)
    }
  }, [activate])

  const disconnectWallet = useCallback(async () => {
    try {
      deactivate()
    } catch (ex) {
      console.error('disconnect error', ex)
    }
  }, [deactivate])

  // 发币
  const sendCoin = () => {
    let _amount = 1
    let txnObject = {
      from: account,
      to: '0xE864C7d948848C20d8c1059d0E8AA5A55D938D75',
      value: library.utils.toWei(_amount.toString(), 'ether'),
    }
    library.eth.sendTransaction(txnObject, (error, result) => {
      if (error) {
        console.log('错误')
      }
      if (result) {
        console.log(result)
      }
    })
  }

  //签名
  const sign = () => {
    if (!!active) {
      library.eth.personal.sign('1231', account).then(res => {
        setSignAddress(res)
      })
    }
  }

  const linkContract = ()=>{
    const address= '0x4c2F07e52380743684DA42fD833522709eC5EF48';
    const abi = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "withdraw_amount",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      }
    ]
    let heyue = new library.eth.Contract(
      abi,
      address,
    )
    console.log('合约链接成功')
    setheyue(heyue)
  }

  const contractTransfor = async ()=>{
    const {methods} = heyues
    await methods.withdraw(10000).send({ from: account })
    console.log(heyues,2323)
  }

  return (
    <div>
      <div>{active ? '🟢' : error ? '🔴' : '🟠'}</div>
      <div>{active ? account : ''}</div>
      <div>
        <ChainId></ChainId>
      </div>
      <button onClick={connectMetaMask}>Connect to MetaMask</button>
      <button onClick={disconnectMetaMask}>断开链接metamask</button>
      <button onClick={connectWallet}>Connect to Wallet</button>
      <button onClick={disconnectWallet}>断开 Wallet</button>
      <button onClick={sendCoin}>发送</button>
      <button onClick={sign}>签名</button>
      <button onClick={linkContract}>链接合约</button>
      <button onClick={contractTransfor}>合约交易提现</button>
      <div>地址签名:{signAddress ? signAddress : ''}</div>
      <div>
        <Balance></Balance>
      </div>
      <div>
        <BlockNumber></BlockNumber>
      </div>
      {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
    </div>
  )
}
export default Dapp

```