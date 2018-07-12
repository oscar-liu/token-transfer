const Router = require('koa-router')
const router = Router()

const Api = require('../controllers/api.controller')

router
    .get('/',Api.error)
    .get('/api/getBlockNumber',Api.getBlockNumber)
    .post('/api/balanceOf', Api.balanceOf)
    .post('/api/createAccount',Api.createAccount)
    .post('/api/transfer', Api.transfer)

module.exports = router