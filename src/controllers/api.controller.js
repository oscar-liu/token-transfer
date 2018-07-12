const web3Api = require('../helper/web3.api')

class ApiController {

    static async error ( ctx ) {
        ctx.body = 'Error ';
    }

    //获取当前区块高度
    static async getBlockNumber(ctx) {
        let blockNumber = await web3Api.getBlockNumber();
        ctx.body = blockNumber;
    }

    //创建账号
    static async createAccount(ctx) {
        let assounts = await web3Api.createAccounts('litchi');
        ctx.body = assounts
    }

    //查询账户余额
    static async balanceOf(ctx) {
        let req = ctx.request.body;
        let data = JSON.parse(req);
        let result = {
            msg : 'success',
            status : 1,
            methods : 'balanceOf',
            data : {}
        };

        if(data && data.params && data.params.address){
            let balanceNum = await web3Api.balanceOf(data.params.address);
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
        let data = JSON.parse(req);
        let result = {
            msg : 'success',
            status : 1,
            methods : 'transfer',
            data : {}
        };
        
        if(data){
            let params,
                callbackurl;
            if(data.params){
                params = data.params;
            }
            if(data.callbackurl){
                callbackurl = data.callbackurl;
            }
            if(params.to && params.value ** params.from ){
                console.log('start transfer')
                await web3Api.transfer(params.to,params.value,params.from, function(rs){
                    //post php service
                    console.log(rs)
                    console.log(callbackurl);
                })
            }
        }else{
            result.status = 0;
            result.msg = 'params error';
        }
        ctx.body = result; 
    }

    //签名交易
    static async signTran(ctx) {
        ctx.body = 'signTran!'
    }

}

module.exports =  ApiController;