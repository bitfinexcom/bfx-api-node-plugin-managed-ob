'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:api:plugins:managed-ob:example')
const { Manager, subscribe } = require('bfx-api-node-core')
const ManagedOBPlugin = require('../')

const SYMBOL = 'tBTCUSD'
const mgr = new Manager({
  transform: true,
  plugins: [ManagedOBPlugin()]
})

mgr.onWS('open', {}, () => debug('connection open'))

// Receive updated ob
mgr.onWS('managed:book', {}, (ob) => {
  debug('--')
  debug('recv ob update')
  debug('spread %f, mid price %f', ob.spread(), ob.midPrice())
  debug('best ask %f, total ask size %f', ob.topAsk(), ob.askAmount())
  debug('best bid %f, total bid size %f', ob.topBid(), ob.bidAmount())
  debug('checksum: %s', ob.checksum())
})

const wsState = mgr.openWS()

subscribe(wsState, 'book', {
  symbol: SYMBOL,
  len: '25',
  prec: 'P0'
})
