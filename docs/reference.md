<a name="bfx-api-node-plugin-managed-ob"></a>

## bfx-api-node-plugin-managed-ob() ⇒ <code>bfx-api-node-core.Plugin</code>
This module is a plugin for [bfx-api-node-core](https://github.com/bitfinexcom/bfx-api-node-core) that
maintains an internal `OrderBook` model and keeps it up to date with
incoming ws2 data packets. On each update, a `data:managed:book` event is
emitted on the socket, providing a complete `OrderBook` model instance.

Note that the `Manager` proxies the event as `managed:book`. If subscribing
on a socket instance (`wsState.ev.on(...)`) use the internal event name,
otherwise use the manager name with `manager.onWS(...)`.

**Kind**: global function  
**Returns**: <code>bfx-api-node-core.Plugin</code> - pluginState  
**License**: MIT  
**Example**  
```js
const debug = require('debug')('bfx:api:plugins:managed-ob:example')
const { Manager, subscribe } = require('bfx-api-node-core')
const ManagedOBPlugin = require('bfx-api-node-plugin-managed-ob')

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
```
