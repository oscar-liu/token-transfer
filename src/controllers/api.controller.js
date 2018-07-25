const web3Api = require('../helper/web3.api')
const config = require('../config')
const axios = require('axios')

class ApiController {

    static async error ( ctx ) {
        ctx.body = 'Error Index';
    }

    //获取当前区块高度
    static async getBlockNumber(ctx) {
        let blockNumber = await web3Api.getBlockNumber();
        ctx.body = blockNumber;
    }

    //创建账号
    static async createAccount(ctx) {
        let req = ctx.request.body;
        let data = {}, 
            passwd = 'cwv2018';
        if(req && req.passwd){
            data = JSON.parse(req);
            passwd = data.passwd;
        }
            // console.log(passwd)
        let assounts = await web3Api.createAccounts(passwd);
        ctx.body = assounts
    }
    
    //查询账户余额
    static async balanceOf(ctx) {
        let req = ctx.request.body;
        let data = {};
        if(req ){
            data = JSON.parse(req);
        }
        
        let result = {
            msg : 'success',
            status : 1,
            methods : 'balanceOf',
            data : {}
        };
        
        if(data && data.address){
            let balanceNum = await web3Api.balanceOf(data.address);
            result.data = {
                balanceNum : balanceNum
            };
        }else{
            result.status = 0;
            result.msg = 'error address empty!';
        }
        ctx.body = result;
    }

    //发起交易 
    static async transfer(ctx) {
        let req = ctx.request.body;
        let data = {};
        if(req ){
            data = JSON.parse(req);
        }else{
            return;
        }
        let result = {
            msg : 'success',
            status : 1,
            methods : 'transfer',
            data : {}
        };

        // console.log(data); 
        
        if(data){
            let params;
            if(data.params){
                params = data.params;
            }
            if(params.to && params.value && params.from ){
                console.log('start transfer');
                let balanceNum = await web3Api.balanceOf(params.from);
                if(balanceNum <= params.value){
                    result.status = 0;
                    result.msg = '账户余额不足!';
                }else{
                    await web3Api.transfer(
                        params.to,
                        params.value,
                        params.from);
                }
            }
        }else{
            result.status = 0;
            result.msg = 'params error';
        }
        ctx.body = result; 
    }

    /**
    * 用户对用户的交易 | 签名交易
    * @param  {address} from        发起交易方地址
    * @param  {String} fromAddrKey  密钥
    * @param  {address} to      收币的地址
    * @param  {number} value        转账币数量
    * @param  {Function} callback 回调函数
    * @return {[type]}             [description]
    */
    static async signTransfer(ctx) {
        let req = ctx.request.body;
        let data = {};
        if(req ){
            data = JSON.parse(req);
        }else{
            return;
        }
        // console.log(data)
        let params;
            if(data.params){
                params = data.params;
            }

        let result = {
            msg : 'success',
            status : 1,
            methods : 'signTransfer',
            data : {}
        };

        if( params.from 
            && params.to 
            && params.num
            && params.fromAddrKey ) {
                if( params.num >0 ){
                    let balanceNum = await web3Api.balanceOf(params.to);
                    if(balanceNum <= params.num){
                        result.status = 0;
                        result.msg = '账户余额不足!';
                    }else{
                        //发起签名交易
                        console.log('start signTransfer')
                        web3Api.signTransfer(params);

                    }
                }else{
                    result.status = 0;
                    result.msg = '交易数量不能小于等于0';
                }
        }

        ctx.body = result;
    }

    

}

module.exports =  ApiController;