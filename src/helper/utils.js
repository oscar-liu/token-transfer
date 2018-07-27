const config = require('../config')
const axios = require('axios')
class Utils{

    //返回数量
    static async echoData(data){
        JSON.stringify(data);
    }

    //交易的hash值回调
    static async callbackHash ( data ) {
        const url = config.service_api + '/api/transfer/insertHash';
        let result;
        await axios.post(url, {
            body : {
                data : {
                    to: data.to, 
                    value: data.value, 
                    from: data.from,  
                    transactionHash : data.transactionHash 
                }
            }
          })
          .then(function (response) {
              if(response.status == 200){
                result = response.data;
              }
          })
          .catch(function (error) {
            result = error;
          });
          return result;
    }

    //receipt 回调
    static async callbackReceipt ( data ) {
        const url = config.service_api + '/api/transfer/updateReceipt';
        let result;
        // console.log('回调receipt=>',data);
        if(!data){
            return;
        }
        let curlData = {
            hash : data.hash,
            status : data.status,
            receipt : data.receipt,
        };
        //需要更新账户余额
        if(data.address && data.value){
            curlData.address = data.address;
            curlData.value = data.value;
        }
        // console.log('curlData -> ',curlData)
        await axios.post(url, {
            body : {
                data : curlData
            }
          })
          .then(function (response) {
              if(response.status == 200){
                result = response.data;
              }
          })
          .catch(function (error) {
            result = error;
          });

    }



    //receipt 回调 提现后回调
    static async callbackUpAccounts ( data ) {
        const url = config.service_api + '/api/transfer/updateAccounts';
        let result;
        await axios.post(url, {
            body : {
                data : {
                    value: data.value, 
                    address: data.address,  
                    hash : data.hash,
                    status : data.status,
                }
            }
          })
          .then(function (response) {
              if(response.status == 200){
                result = response.data;
              }
          })
          .catch(function (error) {
            result = error;
          });

    }



    static async callbackEthUpAccounts ( data ) {
        const url = config.service_api + data.callbackurl; //  '/api/transfer/updateEthAccounts';
        let result;
        await axios.post(url, {
            body : {
                data : {
                    value: data.value, 
                    address: data.address,  
                    hash : data.hash,
                    status : data.status,
                }
            }
          })
          .then(function (response) {
              if(response.status == 200){
                result = response.data;
              }
          })
          .catch(function (error) {
            result = error;
          });

    }
    

}
module.exports =  Utils;