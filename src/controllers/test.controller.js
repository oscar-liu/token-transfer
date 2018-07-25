const web3Api = require('../helper/web3.api')
const config = require('../config')
const axios = require('axios')

class TestController {

    //回调更新 receipt
    static async updateTransactionLog ( ctx ) {
        let result  = {};
        let receipt = { 
            blockHash: '0x54b05e57146f6cfa6733782d8ab27e509cd7348963e4a60cbbb53b00dcd202cb',
        blockNumber: 5998140,
        contractAddress: null,
        cumulativeGasUsed: 5611645,
        from: '0xab4fea08ed95b8346c876ad114e45b018ee70adc',
        gasUsed: 37042,
        logsBloom: '0x00000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000008000000000000800000000000000000000000000000008000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000010000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000008000000000400000200000000000000000000000000000000000000002000000000',
        status: true,
        to: '0xed494c9e2f8e34e53bdd0ea9b4d80305cb15c5c2',
        transactionHash: '0x50c02925d5a3cb48cb7302693ede75c7b2a5fe04cfcce3281db65188eb957f48',
        transactionIndex: 80,
        events:
         { Transfer:
            { address: '0xED494c9e2F8E34e53BDD0EA9B4d80305cb15C5c2',
              blockNumber: 5998140,
              transactionHash: '0x50c02925d5a3cb48cb7302693ede75c7b2a5fe04cfcce3281db65188eb957f48',
              transactionIndex: 80,
              blockHash: '0x54b05e57146f6cfa6733782d8ab27e509cd7348963e4a60cbbb53b00dcd202cb',
              logIndex: 57,
              removed: false,
              id: 'log_4fdb772b',
              returnValues: [Object],
              event: 'Transfer',
              signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              raw: [Object] } } };
        let url = config.service_api + '/api/transfer/updateReceipt';
        console.log(url);
        let postReceiptData = {
            body : {
                data : {
                    hash : receipt.transactionHash,
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