// function compose (middleware) {
//     return function (ctx, next) {
//         function dispatch (i) {
//             const mw = i === middleware.length ? next : middleware[i]
//             if (!mw) return Promise.resolve()
//             return Promise.resolve(mw(ctx, dispatch(i + 1)))
//         }
//         return dispatch(0)
//     }
// }

function compose (middleware) {
    return async function (ctx) {
        function getNext (mw, lastNext) {
            return async function () {
                await mw(ctx, lastNext)
            }
        }
        let next = async function () {
            return await Promise.resolve()
        }
        const len = middleware.length
        for (let i = len - 1; i >= 0; i--) {
            next = getNext(middleware[i], next)
        }
        await next()
    }
}

module.exports = compose