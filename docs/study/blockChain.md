<!--
 * @Author: lcz
 * @Date: 2021-12-30 11:11:34
 * @LastEditTime: 2022-01-05 17:59:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\study\blockChain.md
-->

### 去中心化

> 淘宝微信都是中心化的，因为存数据到数据库里，不能共用
> 去中心化就是 账号在链上，多个网站都可以用，用 web3 在都安装的 metamask 链接钱包,去中心化的世界是没有服务器的，用户自己保存自己的数据

### 去中心化的 ID（DID）

> 在链上的 Id
> 类似于

```html
did:example:123456789abcdefghi
```

> 每一个 DID 都有自己的一个公钥，也一起存放到链上，用户可以用私钥来进行认证和授权。
> 中心化的方式下，用户根本没有必要待在 App 里面，每次我需要一个执行某个操作，只需要出示我的签名即可，用签名向 DApp 其它参与者证明我是有某项权力的。类似的，授权过程也是通过私钥签名来完成的，例如，我要允许哪些朋友查看我的帖子，哪些人可以编辑我的文档等等，这些都是可以实现的。以上就是，去中心化 ID 的基本原理了。

## 区块链特征

1. p2p 网络路由， 点对点，用户对用户（传递的方式）每个人都是信息的接收者，也是信息的传递者
2. 分布式账本 （人人手上都有同步的账本）
3. 共识机制 （选一个用户进行打包，有费用）
4. 难以篡改（要改只能把所有节点的账本都改了，所有用户，不太现实）

## 交易原理

1. 实际在签名之前，会先对交易信息进行 Hash 运算得到摘要信息，然后对摘要信息进行签名

```js
hash('
    {"付款地址"："2A39CBa2390FDe",
    "收款地址"："AAC9CBa239aFcc",
    "金额"："0.2btc"
    }')
```

2. 用私钥对交易摘要进行签名

```js
sign("8aDB23CDEA6", "J78sknJhidhLIqdngalket") -> "3cdferdadgadg"
```

3. 广播给其他节点
4. 节点在收到广播信息之后，会验证签名信息是不是付款方用私钥对交易原始信息签名产生的，如果验证通过说明确实是付款方本人发出的交易，说明交易有效，才会记录到账本中去。
5. 验证过程实际是签名过程的逆运算

```js
verify("3cdferdadgadg", "2A39CBa2390FDe") -> "8aDB23CDEA6"
```

6. 如果验证输出的信息和原始交易信息的 hash 一致，则验证通过，记录账本，用代码表示大概是这样：

```js
if(verify("3cdferdadgadg", "2A39CBa2390FDe")
    == hash('{"付款地址"："2A39CBa2390FDe",
              "收款地址"："AAC9CBa239aFcc",
              "金额"："0.2btc"}')) :
    // 写入账本
    // 广播
else:
```

## 挖矿的原理

我们了解到记账是把交易记录、交易时间、账本序号、上一个 Hash 值等信息计算 Hash 打包的过程。 我们知道所有的计算和存贮是需要消耗计算机资源的，既然要付出成本，那节点为什么还要参与记账呢？在中本聪（比特币之父）的设计里，完成记账的节点可以获得系统给与的一定数量的比特币奖励，这个奖励的过程也就是比特币的发行过程，因此大家形象的把记账称为“挖矿”

1. 一段时间内（10 分钟左右，具体时间会与密码学难题难度相互影响）只有一人可以记账成功
2. 通过解决密码学难题（即工作量证明）竞争获得唯一记账权
3. 其他节点复制记账结果
   > 不过在进行工作量证明之前，记账节点会做进行如下准备工作：
4. 收集广播中还没有被记录账本的原始交易信息
5. 检查每个交易信息中付款地址有没有足够的余额
6. 验证交易是否有正确的签名
7. 把验证通过的交易信息进行打包记录
8. 添加一个奖励交易：给自己的地址增加 12.5 比特币
   如果节点争夺记账权成功的话，就可以得到 12.5 比特币的奖励。

> 为什么挖矿难度大
> Hash 值是由数字和大小写字母构成的字符串，每一位有 62 种可能性（可能为 26 个大写字母、26 个小写字母，10 个数字中任一个），假设任何一个字符出现的概率是均等的，那么第一位为 0 的概率是 1/62（其他位出现什么字符先不管），理论上需要尝试 62 次 Hash 运算才会出现一次第一位为 0 的情况，如果前两 2 位为 0，就得尝试 62 的平方次 Hash 运算，以 n 个 0 开头就需要尝试 62 的 n 次方次运算。

## 拜占庭将军

就是（分布式系统一致性问题），

> 经济学分析
> 工作量证明其实相当于提高了做叛徒（发布虚假区块）的成本，在工作量证明下，只有第一个完成证明的节点才能广播区块，竞争难度非常大，需要很高的算力，如果不成功其算力就白白的耗费了（算力是需要成本的），如果有这样的算力作为诚实的节点，同样也可以获得很大的收益（这就是矿工所作的工作），这也实际就不会有做叛徒的动机，整个系统也因此而更稳定。

## 以太坊网络

选择以太坊官网测试网络 Testnet
测试网络中，我们可以很容易获得免费的以太币，缺点是需要发很长时间初始化节点。

使用私有链
创建自己的以太币私有测试网络，通常也称为私有链，我们可以用它来作为一个测试环境来开发、调试和测试智能合约。
通过上面提到的 Geth 很容易就可以创建一个属于自己的测试网络，以太币想挖多少挖多少，也免去了同步正式网络的整个区块链数据。

使用开发者网络(模式)
相比私有链，开发者网络(模式)下，会自动分配一个有大量余额的开发者账户给我们使用。

使用模拟环境
另一个创建测试网络的方法是使用 Ganache，Ganache 是普通的应用程序，它在本地使用内存模拟的一个以太坊区块链环境，对于开发调试来说，更方便快捷。而且 Ganache 会在启动时帮我们创建 10 个存有资金的测试账户。
进行合约开发时，可以在 Ganache 中测试通过后，再部署到 Geth 节点中去。

## windows 搭建 eth 私有链 参考地址(https://learnblockchain.cn/2018/03/18/create_private_blockchain/)

1. 百度网盘安装 geth
2. geth -h 查看是否安装完成
3. genesis.json

```json
{
  "config": {
    "chainId": 10,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "alloc": {},
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "",
  "gasLimit": "0x2fefd8",
  "nonce": "0x0000000000000042",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}
```

4. 写入创世链

```js
cd privatechain
geth --datadir data0 init genesis.json
```

5. 启动私有链

```js
geth --datadir data0 --networkid 1108 console
```

6. 查看私有链自己的账户

```js
eth.accounts //[]
```

7. 创建账户

```js
> personal.newAccount()
> Passphrase: jil557749
> Repeat passphrase: jil557749
//0xd35b0a0ca4c887370013e3304ea5f51cfccc2e9b
```

8. 查看账户余额

```js
eth.getBalance(eth.accounts[0])
```

9. 开启挖矿

```js
miner.start(10)
```

10. 停止挖矿

```js
miner.stop()
```

11. 挖矿所得的奖励会进入矿工的账户

```js
eth.coinbase //查看进入的账户
```

12. 让其他账户进入 coinbase

```js
miner.setEtherbase(eth.accounts[1])
```

13. 查看账户实际有多少 eth

```js
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
```

14. 发送交易

```js
eth.getBalance(eth.accounts[1]) //查看账户1余额

amount = web3.toWei(10, 'ether')
;('10000000000000000000')
eth.sendTransaction({ from: eth.accounts[0], to: eth.accounts[1], value: amount })
//Error: authentication needed: password or unlock  账户被锁定了不能交易
//  at web3.js:3143:20
//  at web3.js:6347:15
//  at web3.js:5081:36
//  at <anonymous>:1:1
personal.unlockAccount(eth.accounts[0]) //解锁发送的账户
//重复交易
// fullhash=0x1b21bba16dd79b659c83594b0c41de42debb2738b447f6b24e133d51149ae2a6 recipient=0x46B24d04105551498587e3C6CE2c3341d5988938
// "0x1b21bba16dd79b659c83594b0c41de42debb2738b447f6b24e133d51149ae2a6" 表示交易成功
//这时候钱还没到账户1，在链上 还没被处理  需要挖矿
miner.start(1)
admin.sleepBlocks(1)
miner.stop()
// 查看账户1
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')
```

15. 查看区块信息

```js
eth.blockNumber
```

16. 查看交易

```js
eth.getBlock(66)
```

17. 通过交易 hash 查看

```js
eth.getTransaction('0x0aaec862ad25edf1da4f66131a7553c49d1d996e0911e13c47f72e3fdb03f2f3')
// 0x0aaec862ad25edf1da4f66131a7553c49d1d996e0911e13c47f72e3fdb03f2f3"
// {
//   blockHash: "0x1cb368a27cc23c786ff5cdf7cd4351d48f4c8e8aea2e084a5e9d7c480449c79a",
//   blockNumber: 463,
//   from: "0x4a3b0216e1644c1bbabda527a6da7fc5d178b58f",
//   gas: 90000,
//   gasPrice: 18000000000,
//   hash: "0x1b21bba16dd79b659c83594b0c41de42debb2738b447f6b24e133d51149ae2a6",
//   input: "0x",
//   nonce: 0,
//   r: "0x31d22686e0d408a16497becf6d47fbfdffe6692d91727e5b7ed3d73ede9e66ea",
//   s: "0x7ff7c14a20991e2dfdb813c2237b08a5611c8c8cb3c2dcb03a55ed282ce4d9c3",
//   to: "0x46b24d04105551498587e3c6ce2c3341d5988938",
//   transactionIndex: 0,
//   v: "0x38",
//   value: 10000000000000000000
// }
```

18. 推出后如何重新进入（查看 5）

19. 查看私钥
    npm i keythereum

```js
let keythereum = require('keythereum')
let datadir = 'D:\\geth\\privatechain\\data0'
let keyObject = keythereum.importFromFile('0xd35b0a0ca4c887370013e3304ea5f51cfccc2e9b', datadir)
let privateKey = keythereum.recover('jil557749', keyObject)
console.log(privateKey.toString('hex'))
```

## web3 调用合约方法

```js
 var infoContract = web3.eth.contract(ABI INFO);

    var info = infoContract.at('CONTRACT ADDRESS');

    info.getInfo(function(error, result){
        if(!error)
            {
                $("#info").html(result[0]+' ('+result[1]+' years old)');
                console.log(result);
            }
        else
            console.error(error);
    });

    $("#button").click(function() {
        info.setInfo($("#name").val(), $("#age").val());
    });
```

## 或者使用监听合约的方式

```js
var instructorEvent = info.Instructor()
instructorEvent.watch(function (error, result) {
  if (!error) {
    $('#info').html(result.args.name + ' (' + result.args.age + ' years old)')
  } else {
    console.log(error)
  }
})
```
