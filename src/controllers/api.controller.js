const web3Api = require('../helper/web3.api')
const config = require('../config')
const axios = require('axios')

class ApiController {

    static async error ( ctx ) {
        const url = config.service_api + '/api/transfer/insertHash';
        let result;
        await axios.post(url, {
            data : {
                to: '0x05Ceb752AbCB7bD073bf5209C5e470b0d0d384eB',
                value: 100,
                from: '0xab4fea08ed95b8346c876ad114e45b018ee70adc', 
                transactionHash : '0x700e707f204e9a000c29bcf8a064fc8d069457c339d0c45f329a88a377cd467f'
            }
          })
          .then(function (response) {
              if(response.status == 200){
                result = response.data;
              }
            // console.log(response.data);
          })
          .catch(function (error) {
            result = error;
            // console.log(error);
          });
          ctx.body = result;
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
            console.log(req);
            console.log(JSON.parse(req))
        if(req && req.passwd){
            data = JSON.parse(req);
            passwd = data.passwd;
        }
            console.log(passwd)
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
                console.log('start transfer')
                await web3Api.transfer(
                    params.to,
                    params.value,
                    params.from, 
                    data.callbackurl_hash, 
                    data.callbackurl_receipt);
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