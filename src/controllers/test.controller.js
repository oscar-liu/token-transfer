const web3Api = require('../helper/web3.api')
const config = require('../config')
const axios = require('axios')

class TestController {

  
    static async ethTransfer(ctx) {
        let data = {
            from : '0xab4fea08ed95b8346c876ad114e45b018ee70adc',
            to : '0xAF66cB19a7e752B693211D64901Fde3D23A4f174',
            num : 0.003
        };
        web3Api.ethTransfer(data);

        ctx.body = {};
        
    }

}

module.exports =  TestController;