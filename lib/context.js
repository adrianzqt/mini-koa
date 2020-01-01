const Delegator = require('../tool/delegator')

const ctx = {}

Delegator(ctx, 'request')
  .access('header')
  .setter('href')
  .access('query')

Delegator(ctx, 'response')
  .access('status')
  .access('message')
  .access('body')


module.exports = ctx