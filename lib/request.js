const url = require('url')
// const only = require('only')

module.expors = {
    get header () {
        return this.req.headers
    },
    set header (val) {
        this.req.headers = val
    },
    get query () {
        return url.parse(this.req.url, true).query
    },
    // toJSON () {
    //     return only(this, [
    //         'method',
    //         'url',
    //         'header'
    //     ])
    // }
}