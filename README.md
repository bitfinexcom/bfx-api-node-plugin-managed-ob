# Bitfinex Managed OrderBook Plugin for the Node.JS API

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-api-node-plugin-managed-ob.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-api-node-plugin-managed-ob)

This plugin maintains an internal `OrderBook` model and keeps it up to date
with incoming ws2 data packets. On each update, a `data:managed:book` event is
emitted on the socket, providing a complete `OrderBook` model instance (from
`bfx-api-node-models`).

Note that the manager proxies the event as `managed:book`. If subscribing on a
socket instance (`wsState.ev.on(...)`) use the internal event name, otherwise
use the manager name with `manager.onWS(...)`.

### Features

* Maintains up-to-date `OrderBook` models internally
* Emits a new 'managed:book' event with a full `OrderBook` instance on each update

### Installation

```bash
npm i --save bfx-api-node-plugin-managed-ob
```

### Quickstart

```js
const { Manager } = require('bfx-api-node-core')
const ManagedOBPlugin = require('bfx-api-node-plugin-managed-ob')

const mgr = new Manager({
  plugins: [ManagedOBPlugin()]
})

// set up a connection, event listeners, etc

mgr.onWS('managed:book', {}, (ob) => {
  debug('checksum: %s', ob.checksum())
})
```

### Docs

API documentation can be found in [`docs/reference.md`](docs/reference.md), and
examples in the [`examples`](examples) folder.

### Example

```js
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
  prec: 'P0',
})
```

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
