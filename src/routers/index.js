const Router = require('koa-router')
const router = Router()

const Test = require('../controllers/test.controller')
const Api = require('../controllers/api.controller')

router
    .get('/',Api.error)
    .get('/api/getBlockNumber',Api.getBlockNumber)
    .post('/api/balanceOf', Api.balanceOf)
    .post('/api/createAccount',Api.createAccount)
    .post('/api/transfer', Api.transfer)
    .post('/api/signTransfer', Api.signTransfer)

    .post('/api/test/updateRectip', Test.updateTransactionLog)
    .post('/api/test/signTransaction', Test.signTransaction)

module.exports = router