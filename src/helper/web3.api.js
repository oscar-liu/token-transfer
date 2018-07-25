// const web3 = require('./cwv');
const web3 = require('./web3.provider');
const utils = require('./utils');
const Tx = require("ethereumjs-tx");

//cwv合约
const abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "agent", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "agent", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "agent", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "agent", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "agent", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];
const contractAddress = "0xed494c9e2f8e34e53bdd0ea9b4d80305cb15c5c2"; //合约地址
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
    static async transfer(_to,_value,_from) {
        let result = {
            status : 0,
            receipt: {},
            hash: ''
        };
        let num = web3.utils.toWei(String(_value), "ether");
        Cwv.methods.transfer(_to,num).send({
            from : _from,
            gas: '1000000'
        }).on('transactionHash', function(hash){
            console.log('transactionHash=>',hash)
            // console.log(callbackurl_hash)
            let postData = {
                to: _to, 
                value: _value, 
                from: _from,  
                transactionHash : hash
            };
            //回调Api Service
            utils.callbackHash(postData);
        })
        // .on('confirmation', function(confirmationNumber, receipt){
        //     console.log('confirmation=>')
        //     console.log(confirmationNumber,receipt)
        // })
        .on('receipt', function(receipt){
            // console.log('receipt=>',receipt.transactionHash); 
            console.log('receipt->status = ' , receipt.status )
            let postReceiptData = {
                hash : receipt.transactionHash,
                status : receipt.status,
                receipt : JSON.stringify(receipt),
            };
            //回调Api Service
            utils.callbackReceipt(postReceiptData);
        });
        //.on('error', function(err){});
    }

    //签名交易
    static async signTransfer(data) {
        
        web3Api.transferSign(data.from, data.to, data.num, data.fromAddrKey, function(res){
            //成功后的回调
            console.log(res)
        }, function(res){
            //失败后的回调
            console.log(res)
        })
       

    }

    //弃用
    static async signTransfer2(data) {
        //cwv 代币的合约地址
        var contract = new web3.eth.Contract(abi, contractAddress, {
            from: data.from, // default from address
        });
        let fromKey = data.fromAddrKey; 
        let _gas = data.gas || '1000000'; //汽油
        let amount = web3.utils.toWei(String(data.num), "ether");
            amount = amount - _gas;
            amount = web3.utils.toHex(amount); //转成16进制
        let result = {
            status : 0,
            receipt: {},
            hash: ''
        };
        // let balanceNum = await web3Api.balanceOf(data.to);
        // console.log( amount + ' amount -> gas'+ _gas);
        // console.log( 'balanceNum->' , web3.utils.toWei(String(balanceNum), "ether") );
        
        console.log(amount);
        // return;
        console.log('web3 signTransaction')
        web3.eth.accounts.signTransaction({
            to: contractAddress,
            value: amount,
            gas: _gas,
            data: contract.methods.transfer(data.to, amount).encodeABI()
        }, fromKey, function(err, res) {
            if (!err) {
                console.log('web3 sendSignedTransaction');
                web3.eth.sendSignedTransaction(res.rawTransaction, function(err, res) {
                    console.log(err,res);
                    if (!err) {
                        result.status = 1;
                        result.hash = res;
                    } else {
                        result.status = 0;
                    }
                });
            }
        })
        return result;

    }
    

    static async transferSign(from, to, value, fromAddrKey, success,  error) {
        try {
            //定义transaction
            var rawTx = {
                to: to, //contractAddress, // 因为是调用合约，所以这个是合约地址
                value: '0x00', //转移的以太币数量为0
                data: Cwv.methods.transfer(to, value).encodeABI() //要调用的合约函数，用的ERC20标准
            }
        } catch(e) {
            if(undefined==error){
                error=console.log
            }
            console.log('error=>',e)
            // 很可能是to地址错误
            error(1)
            return
        }
        // console.log(rawTx);
        //获取当前gas价格
        web3.eth.getGasPrice().then(function(p) {
            rawTx.gasPrice = web3.utils.toHex(p);
            //获取nonce
            web3.eth.getTransactionCount(from,
            function(err, r) {
                rawTx.nonce = web3.utils.toHex(r);
                rawTx.from = from;
                //暂时没用预估，代码先保留
                web3.eth.estimateGas(rawTx,
                function(err, gas) {
                    gas = '150000';
                    rawTx.gasLimit = web3.utils.toHex(gas);
                    // console.log('rawTx=>',rawTx)
                    //初始化transaction
                    var tx = new Tx(rawTx);
                    var privateKey = fromAddrKey; 
                    if ('0x' == privateKey.substr(0, 2)) {
                        privateKey = privateKey.substr(2)
                    }
                    privateKey = new Buffer(privateKey, 'hex');
                    //签名
                    tx.sign(privateKey);
                    
                    var serializedTx = '0x' + tx.serialize().toString('hex');
                    // console.log('serializedTx=>',serializedTx)
                    //发送原始transaction
                    web3.eth.sendSignedTransaction(serializedTx,
                    function(err, r) {
                        if(!err){
                            web3.eth.getTransaction(r,
                            function(err, r) {
                                success(r)
                            })
                        }
                    }).catch(function(err){
                        console.log('eth gas 不足');
                        //gas不足
                        error(err)
                    });
                })
            })
            return this
        })
    }


}

module.exports = web3Api;