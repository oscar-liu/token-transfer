// const web3 = require('./cwv');
const web3 = require('./web3.provider');
const utils = require('./utils');
const Tx = require("ethereumjs-tx");

//cwv合约
// const abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "agent", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "agent", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "agent", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "agent", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "agent", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"slogan","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenContract","type":"address"},{"name":"payee","type":"address"},{"name":"amount","type":"uint256"}],"name":"refundERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"payee","type":"address"},{"name":"amount","type":"uint256"}],"name":"refundETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_slogan","type":"string"}],"name":"ownerChangeSlogan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_initSupply","type":"uint256"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"payee","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"RefundETH","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"payee","type":"address"},{"indexed":true,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"RefundERC20","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldSlogan","type":"string"},{"indexed":true,"name":"newSlogan","type":"string"}],"name":"SloganChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
const contractAddress = "0x8b39e2f1d1ec71e694c89c77026b4df553d322dc"; //合约地址
const Cwv = new web3.eth.Contract(abi, contractAddress);


class web3Api {

    /**
     * 获取当前链的区块高度
     */
    static async getBlockNumber() {
        let blockNumber = await web3.eth.getBlockNumber();
        return blockNumber;
    }

    /**
     * 创建账户
     * @param {String} passwd 创建账户的密码
     */
    static async createAccounts ( passwd ) {
        let account = await web3.eth.accounts.create(passwd);
        return account;
    }

    /**
     * 查询 cwv 余额
     * @param {String} address 账户地址
     * @returns number
     */
    static async balanceOf(address) {
        let balanceNum = await Cwv.methods.balanceOf(address).call();
        //格式化单位
        let numFromWei = web3.utils.fromWei(balanceNum, "ether");
        return numFromWei;
    }

    /**
     * 发币交易
     * @param {String} _to 要发送到的地址
     * @param {Number} _value 交易币的数量
     * @param {String} _from 发起交易方的来源地址
     * @param {Function} callback 回调函数
     */
    static async transfer(_to,_value,_from,_callbackurl) {
        let result = {
            status : 0,
            receipt: {},
            hash: ''
        };
        console.log(_to,_value,_from,_callbackurl)
        let num = web3.utils.toWei(String(_value), "ether");
        Cwv.methods.transfer(_to,num).send({
            from : _from,
            gas: '1000000'
        }).on('transactionHash', function(hash){
            console.log('transactionHash=>',hash)
        })
        .on('receipt', function(receipt){
            // console.log('receipt=>',receipt.transactionHash); 
            console.log('receipt->status = ' , receipt.status )
        });
        //.on('error', function(err){});
    }

    /**
     * 发送签名交易
     * @param {address} from 发起交易方地址
     * @param {address} to 接收交易地址
     * @param {number} value 交易币数量
     * @param {string} fromAddrKey 私钥
     */
    static async signTransfer(from, to, value, fromAddrKey) {
        let _from = from,
            _value = value,
            _to = to,
            _privateKey = fromAddrKey;
        var contract = new web3.eth.Contract(abi, contractAddress, {
            from: _from, // default from address
        });
        let num = web3.utils.toWei(String(_value), "ether"); //交易数量
        let numHex = web3.utils.toHex(num); 
        
        //定义transaction
        var rawTx = {
            to: contractAddress, //合约地址
            value: '0x00',   //转移的以太币数量
            data: contract.methods.transfer(_to, num).encodeABI() //要调用的合约函数，用的ERC20标准
        }

        //获取当前gas价格
        web3.eth.getGasPrice().then(function(p) {
            rawTx.gasPrice = web3.utils.toHex(p);
            rawTx.gasLimit = web3.utils.toHex(200000);

            // console.log(rawTx);
            
            //Insufficient funds for gas * price + value
            //当前地址的余额不足以支付gasLimit乘以gasPrice再加上转账的value值。
            //异常中的gas指的就是gasLimit，price就是gasPrice，value指的是发起交易转账的以太币。

            //获取nonce
            web3.eth.getTransactionCount(from,
            function(err, r) {
                rawTx.nonce = web3.utils.toHex(r);
                rawTx.from = from;
                    //初始化transaction
                    var tx = new Tx(rawTx);
                    var privateKey = _privateKey; 
                        if ('0x' == privateKey.substr(0, 2)) {
                            privateKey = privateKey.substr(2)
                        }
                        privateKey = new Buffer(privateKey, 'hex');
                        //签名
                        tx.sign(privateKey);
                    
                    var serializedTx = '0x' + tx.serialize().toString('hex');
                    //发送原始transaction
                    web3.eth.sendSignedTransaction(serializedTx)
                        .on('transactionHash', function(hash){
                            console.log('transactionHash=>',hash)
                            let postData = {
                                to: _to, 
                                value: _value, 
                                from: _from,  
                                transactionHash : hash
                            };
                            //回调Api Service
                            utils.callbackHash(postData);
                        })
                        .on('receipt', function(receipt){
                            // console.log('receipt=>',receipt); 
                            console.log('receipt->status = ' , receipt.status )
                            let postReceiptData = {
                                hash : receipt.transactionHash,
                                status : receipt.status,
                                address : _from,   //发起者地址
                                value : _value,   //交易金额
                                receipt : JSON.stringify(receipt),
                            };
                            //回调Api Service
                            utils.callbackReceipt(postReceiptData);
                        })
                        .on('error', function(err){
                            //todo 一般就是gas不足
                            console.log('error=>',err);
                            //交易回滚
                        });
            })
        })
    }

    /** -------------- ETH  --------------------- */

    /**
     * 查询 cwv 余额
     * @param {String} address 账户地址
     * @returns number
     */
    static async getEthBalance(address) {
        if(!web3.utils.isAddress(address)) {
            console.log("不是一个有效的钱包地址");
            return;
        }
        let ethNum;
        await web3.eth.getBalance(address).then(function(res) {
            ethNum = web3.utils.fromWei(res, "ether");
        });
        return ethNum;
    }

    /**
     * eth 交易
     */
    static async ethTransfer(data){
        let _ethNum = web3.utils.toWei(String(data.num), "ether");
        let raw = {
            from: data.from,
            to: data.to,
            value: _ethNum
          };
        web3.eth.sendTransaction(raw)
            .on('transactionHash', function(hash){
                console.log('transactionHash=>',hash)
            })
            .on('receipt', function(receipt){
                console.log('210online receipt-> ' , receipt )
                let data = {
                    value: data.num, 
                    address: data.to,  
                    hash : receipt.transactionHash,
                    status : receipt.status,
                    callbackurl: data.callbackurl
                }
                utils.callbackEthUpAccounts(data);
            })
            .on('error', function(err){
                //todo 一般就是gas不足
                console.log('error=>',err);
            });
    }

}

module.exports = web3Api;