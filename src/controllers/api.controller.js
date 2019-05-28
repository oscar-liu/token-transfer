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
        if(req){
            data = JSON.parse(req);
            if(data.params && data.params.passwd){
                passwd = data.params.passwd;
            }
        }
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
            params.source = '0xab4fEa08ED95b8346C876Ad114E45b018EE70ADC'
            // console.log(params)
            if(params.to && params.value && params.from && params.source ){
                console.log('start transfer');
                let balanceNum = await web3Api.balanceOf(params.from);
                if(balanceNum <= params.value){
                    result.status = 0;
                    result.msg = '账户余额不足!';
                }else{
                    //_to,_value,_from,_source,_callbackur
                    await web3Api.transfer(
                        params.to,
                        params.value,
                        params.from,
                        params.source,
                        data.callbackurl_receipt
                    );
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
                    let balanceNum = await web3Api.balanceOf(params.from);
                    if(parseInt(balanceNum) < parseInt(params.num) ){
                        result.status = 0;
                        let tips = 'balanceNum='+balanceNum + ', tranValue=' + params.num;
                        result.msg = '账户余额不足!' + tips;
                    }else{
                        //发起签名交易
                        console.log('start signTransfer')
                        web3Api.signTransfer(params.from,params.to,params.num,params.fromAddrKey);
                    }
                }else{
                    result.status = 0;
                    result.msg = '交易数量不能小于等于0';
                }
        }

        ctx.body = result;
    }

    
    //区取ETH余额
    static async getEthBalance(ctx){
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
            let balanceNum = await web3Api.getEthBalance(data.address);
            result.data = {
                balanceNum : balanceNum
            };
        }else{
            result.status = 0;
            result.msg = 'error address empty!';
        }
        ctx.body = result;
    }

    //eth 转账
    static async ethTransfer(ctx) {
        let req = ctx.request.body;
        let data = {};
        if(req ){
            data = JSON.parse(req);
        }else{
            return;
        }
        let params;
            if(data.params){
                params = data.params;
            }

        let ethData = {
            from : params.from,
            to : params.to,
            num : params.num,
            callbackurl : params.callbackurl
        };
        web3Api.ethTransfer(ethData);

        ctx.body = {
            msg : 'success',
            status : 0,
            methods : 'ethTransfer',
            data : {
                'msg' : 'callback function'
            }
        };;
        
    }

}

module.exports =  ApiController;