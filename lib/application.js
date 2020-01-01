const http = require('http')
const Emitter = require('events')

const context = require('./context')
const request = require('./request')
const response = require('./response')
const compose = require('../tool/compose')

module.exports = class Application extends Emitter {

    constructor () {
        super()
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middleware = []
    }

    callback () {
        this.on('error', this.handleError)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            const middleware = compose(this.middleware)
            return this.handleRequest(ctx, middleware)
        }
    }

    handleError (err) {
        if (err.status === 404) return
        const msg = err.stack || err.toString()
        console.error('======= Error =======')
        console.error(msg)
        console.error('======= Error =======')
    }

    createContext (req, res) {
        const context = Object.create(this.context)
        const request = Object.create(this.request)
        const response = Object.create(this.response)
        context.app = request.app = response.app = this
        context.req = request.req = response.req = req
        context.res = request.res = response.res = res
        request.ctx = response.ctx = context
        request.response = response
        response.request = request
        context.state = {}
        return context
    }

    handleRequest (ctx, middleware) {
        const res = ctx.res
        res.statusCode = 404
        return middleware(ctx).then(() => this.respond(ctx)).catch((err) => {
            console.log('handle request error: ', err)
            // ctx.onerror(err)
        })
    }

    respond (ctx) {
        const {
            res,
            body
        } = ctx
        res.end(JSON.stringify(body))
    }

    use (middleware) {
        this.middleware.push(middleware)
    }

    listen (...args) {
        const httpServer = http.createServer(this.callback())
        return httpServer.listen(...args)
    }

}