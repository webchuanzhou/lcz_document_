<!--
 * @Description: web3 合约
 * @Autor: lcz
 * @Date: 2022-05-23 11:24:12
 * @LastEditors: lcz
 * @LastEditTime: 2022-05-23 11:59:32
-->

# 实践项目

- javaLong pool play
- scyz sendCoin
- NFT 链游

## 实现链接方式

- 1.PC metamask
- 2.PC ConnectConnector
- 3.mobile TP

## 合约链接方式

- connect.js

```jsx
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
  rpc: { [ChainId.BNB]: getRpcUrl(ChainId.BNB), [ChainId.BSC]: getRpcUrl(ChainId.BSC) },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})
```

## 切链

```js
import { Toast } from 'antd-mobile'
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
    // console.log(ethereum,ethereum.isMetaMask,networkConf[chainId],chainId,networkConf,222)
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
          // 客户的安卓手机拿不到code
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
          if (!code) {
            Toast.show(`place link 0x${Number(process.env.REACT_APP_DEFAULTCHANGECHAINID).toString(16)} chain`)
          }
        })
    } else {
      reslove()
    }
  })
}
```

## error.js

- 监听 web3 链报错

```js
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { Toast } from 'antd-mobile'
export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return Toast.show({
      icon: 'fail',
      content:
        'Ethereum browser extension is not detected. Please install metamask on the desktop or access it through DAPP browser on the mobile terminal.',
    })
  } else if (error instanceof UnsupportedChainIdError) {
    return Toast.show({
      icon: 'fail',
      content: 'You are connected to an unsupported network.',
    })
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return Toast.show({
      icon: 'fail',
      content: 'Please authorize this website to access your Ethereum account',
    })
  } else {
    return Toast.show({
      icon: 'fail',
      content: 'An unknown error has occurred. See the console for more details',
    })
  }
}
```

## abi 文件

- abi.js
  > 目前 abi 方法都放一个文件里了 后续要拆开拿区,不然代码太混了,存放方式需要改进

## 全局 index.jsx Web3ReactProvider

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from '@/router/App'
// import 'lib-flexible'
import '@/utils/flexible'
import { BrowserRouter } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import './styles/pagetheme.scss' //黑白css变量
// library 注入web3
function getLibrary(provider) {
  const library = new Web3(provider)
  library.pollingInterval = 8000
  return library
}

ReactDOM.render(
  <BrowserRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

## 懒链接 hooks

- useEagerConnect.js

```jsx
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

## 链接监听 hooks

```jsx
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

## 全局公共部分需要调用的 web3

- 比如公共头部 等

```jsx
import useEagerConnect from '@/hooks/useEagerConnect'
import useInactiveListener from '@/hooks/useInactiveListener'
import { getErrorMessage } from '@/web3/error'
// 懒连接
const triedEager = useEagerConnect()
useInactiveListener(!triedEager)
useEffect(() => {
  error && getErrorMessage()
}, [error])
```

## 扫码链接钱包 以及 metamask 链接

```jsx
import { wallet, injected } from '@/web3/connect'
//扫码链接
const walletconnect = () => {
  activate(wallet)
}
//metamask 链接
const connectMetaMask = useCallback(async () => {
  const { ethereum, location } = window
  console.log(ethereum?.isMetaMask, 22)
  if (ethereum?.isMetaMask) {
    try {
      console.log('start to connect MetaMask')
      await deactivate()
      await activate(injected)
      //  闭坑 字符串的16进制转换跟 数字的16进制转换值不一样
      await changeNetwork(`0x${Number(process.env.REACT_APP_DEFAULTCHANGECHAINID).toString(16)}`)
    } catch (ex) {
      console.error('connect error', ex)
    }
  } else {
    if (detectDeviceType() === 'Mobile') {
      location.href = `tpdapp://open?params={"url": "${location.origin}"}`
    } else {
      console.error('connect error 失败')
    }
  }
  // 走metamask 需要https
  // location.href = `https://metamask.app.link/dapp/${location.host}`
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [deactivate, activate])
```

## 链接合约

```jsx
let mmtContract = await new library.eth.Contract(ABI, 合约地址)
```

## 授权

- 币种合约授权给业务合约

```jsx
// 授权
const approve = async () => {
  try {
    if (active) {
      const { decimals, approve } = coinContract.methods
      const exp = await decimals().call()
      const approveNumber = 10000000000000000000000000000000000000000
      let quantityToWei = new BigNumber(approveNumber).times(new BigNumber(10).pow(exp)).toFixed(0)
      let approveInfo = await approve(process.env.REACT_APP_CONTRACTADDRESS, quantityToWei).send({ from: account })
      console.log(approveInfo, 332211)
      setIsApprove(true)
      Toast.show('approve success')
    }
  } catch (error) {
    console.log(error)
  }
}
```

## 合约写入方法试列

```jsx
//质押
const deposit = async () => {
  if (active) {
    try {
      if (lock) return false
      let index = coinArr[currentCoin].id
      const { deposit } = zyContract.methods
      const { decimals } = coinContract.methods
      const exp = await decimals().call()
      let TransToWei = new BigNumber(amount).times(new BigNumber(10).pow(exp)).toFixed(0)
      //pid amount
      setLock(true)
      if (currentCoin === 'USDT') {
        let zyOperty = await deposit(index, TransToWei).send({
          from: account,
        })
        console.log(zyOperty)
      } else {
        let zyOperty = await deposit(index, TransToWei).send({
          from: account,
          value: TransToWei,
        })
        console.log(zyOperty)
      }
      let copy = JSON.parse(JSON.stringify(coinArr))
      let currentObj = copy[currentCoin]
      currentObj.staked = TransToWei
      setCoinArr(pre => ({
        ...pre,
        [currentCoin]: currentObj,
      }))
      setFormPop(false)
      setLock(false)
      getUserLastLockTime(index)
      getUSDGAmount()
    } catch (error) {
      setLock(false)
      console.log(error)
    }
  }
}
```

## 合约读方法试列

```jsx
const getUSDGAmount = useAsyncCallBack(async () => {
  const { balanceOf, decimals } = coinContract.methods
  const exp = await decimals().call()
  let result = await balanceOf(account).call()
  result = new BigNumber(result).div(new BigNumber(10).pow(exp)).toString()
  setCoinArr(pre => ({
    ...pre,
    USDT: {
      ...pre.USDT,
      balance: result,
    },
  }))
  getWeb3Current()
})
```

## 读取当前链币种的金额

```jsx
// 获取当前币种金额
const getWeb3Current = useAsyncCallBack(async () => {
  if (!!account) {
    const { decimals } = coinContract.methods
    const exp = await decimals().call()
    library.eth
      .getBalance(account)
      .then(balance => {
        let result = new BigNumber(balance).div(new BigNumber(10).pow(exp)).toString()
      })
      .catch(() => {})
  }
})
```

## 工具函数

1. 限制输入数字以及小数位数

```js
export const inputIsNumber = (newValue, accuracy = 8) => {
  newValue = newValue.replace(/[^\d.]/g, '')
  //必须保证第一个为数字而不是.
  newValue = newValue.replace(/^\./g, '')
  //保证.只出现一次，而不能出现两次以上
  newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  if (accuracy > 0) {
    // eslint-disable-next-line no-useless-escape
    newValue = newValue.replace(/^(\-)*(\d+)\.(\d{8}).*$/, '$1$2.$3')
    // newValue = newValue.replace(`/^(\\-)*(\\d+)\\.(\\d{${accuracy}}).*$/`, '$1$2.$3')
  } else {
    newValue = newValue.replace(/[^0-9]/g, '')
  }
  // newValue = newValue.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
  if (newValue.includes('.')) {
    let arr = newValue.split('.')
    newValue = Number(arr[0]) + (arr[1] === undefined ? '' : '.' + arr[1]) // 去掉开头多余的0
  }
  return newValue
}
```

2. 地址脱敏

```js
export const addressTunMin = (val, firstNumber = 2, lastNumber = 1) => {
  return val.substr(0, firstNumber) + '****' + val.substr(val.length - lastNumber)
}
```
