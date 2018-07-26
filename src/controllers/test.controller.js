const web3Api = require('../helper/web3.api')
const config = require('../config')
const axios = require('axios')

class TestController {

    //回调更新 receipt
    static async updateTransactionLog ( ctx ) {
        let result  = {};
        let receipt = { 
            hash : '0x6a7950a891cb597271613d73f6bc1e314959de784409575457a32baa74023af8',
            status : true,
        receipt: '{"blockHash":"0x37ae0c08dc35b25008f423fc4faf9cf42622c23ec9325e0fb4465ea56442fa62","blockNumber":6031868,"contractAddress":null,"cumulativeGasUsed":6629161,"from":"0xab4fea08ed95b8346c876ad114e45b018ee70adc","gasUsed":52106,"logsBloom":"0x00000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000008000000000000800000000000000000000000000000008000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000010000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000008000000000400000200000000000000000000000000000000000000002000000000","status":true,"to":"0xed494c9e2f8e34e53bdd0ea9b4d80305cb15c5c2","transactionHash":"0x6a7950a891cb597271613d73f6bc1e314959de784409575457a32baa74023af8","transactionIndex":122,"events":{"Transfer":{"address":"0xED494c9e2F8E34e53BDD0EA9B4d80305cb15C5c2","blockNumber":6031868,"transactionHash":"0x6a7950a891cb597271613d73f6bc1e314959de784409575457a32baa74023af8","transactionIndex":122,"blockHash":"0x37ae0c08dc35b25008f423fc4faf9cf42622c23ec9325e0fb4465ea56442fa62","logIndex":88,"removed":false,"id":"log_f7f0fa7f","returnValues":{"0":"0xab4fEa08ED95b8346C876Ad114E45b018EE70ADC","1":"0x05Ceb752AbCB7bD073bf5209C5e470b0d0d384eB","2":"550000000000000000000","from":"0xab4fEa08ED95b8346C876Ad114E45b018EE70ADC","to":"0x05Ceb752AbCB7bD073bf5209C5e470b0d0d384eB","value":"550000000000000000000"},"event":"Transfer","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","raw":{"data":"0x00000000000000000000000000000000000000000000001dd0c885f9a0d80000","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000ab4fea08ed95b8346c876ad114e45b018ee70adc","0x00000000000000000000000005ceb752abcb7bd073bf5209c5e470b0d0d384eb"]}}}}' };
        let url = config.service_api + '/api/transfer/updateReceipt';
        console.log(url);
        let postReceiptData = {
            body : {
                data : {
                    hash : receipt.hash,
                    status : receipt.status,
                    receipt : JSON.stringify(receipt),
                }
            }
        }
        await axios.post(url,
            postReceiptData)
          .then(function (res) {
            // console.log(res);
            result = res.data;
          })
          .catch(function (error) {
            // console.log(error);
            result = error;
          });
        ctx.body = result || 'Error';
    }


    //测试签名交易 
    static async signTransaction ( ctx ) {
        //回调信息
        var msg = { blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        blockNumber: null,
        from: '0x05Ceb752AbCB7bD073bf5209C5e470b0d0d384eB',
        gas: 150000,
        gasPrice: '1210000000',
        hash: '0xb825d1acdb9f1074ff39c7d1ebfb0e193e39dcef9270dce2d38f42e29cd98f1d',
        input: '0xa9059cbb000000000000000000000000ab4fea08ed95b8346c876ad114e45b018ee70adc00000000000000000000000000000000000000000000000000000000000000af',
        nonce: 8,
        to: '0xED494c9e2F8E34e53BDD0EA9B4d80305cb15C5c2',
        transactionIndex: 0,
        value: '0',
        v: '0x1b',
        r: '0x7e0e193537aa713aefdc59b9a1a70fc0e85855e70d1d829aad0889e7eb051ea4',
        s: '0x16fe4e53cd3e5af4397d9a83acaa1c370d90164e4a493dc08524ee064a51e387' };

    }

}

module.exports =  TestController;