const MiniKoa = require('./index.js')

const app = new MiniKoa()

app.use(async (ctx, next) => {
    console.log('=== start ===')
    await next()
    console.log('=== end ===')
})

app.use((ctx, next) => {
    ctx.res.writeHead(200)
    ctx.res.end('Hello mini-koa!')
})

app.listen(3000)