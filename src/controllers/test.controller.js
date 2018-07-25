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
        
    }

}

module.exports =  TestController;