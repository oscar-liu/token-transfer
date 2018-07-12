// const web3 = require('./cwv');
const web3 = require('./web3.provider');

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
    static async transfer(_to,_value,_from,callback) {
        let result = {
            status : 0,
            receipt: {},
            hash: ''
        };
        
        let num = web3.utils.toWei(String(_value), "ether");
        let txhash = Cwv.methods.transfer(_to,num).send({
            from : _from,
            gas: '1000000'
        },function(err,res){
            if(!err){
                result.status = 1;
                result.hash = res;
            }else{
                result.status = 0;
                console.log(err);
            }
            callback(result);
        });


    }
    




}

module.exports = web3Api;