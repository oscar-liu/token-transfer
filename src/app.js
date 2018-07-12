const Koa = require('koa')
const koabody = require('koa-body')

const router = require('./routers')
const config = require('./config')

const env = process.env.NODE_ENV || 'development' 


const app = new Koa()
app.use(koabody({}));
if (env === 'development') { // logger
    // app.use(logger())
}

app.use(router.routes(), router.allowedMethods())

console.log('start port ', config.port)
app.listen(config.port)