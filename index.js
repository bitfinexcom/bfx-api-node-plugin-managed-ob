'use strict'

/**
 * This module is a plugin for
 * {@link module:bfx-api-node-core|bfx-api-node-core} that maintains an
 * internal {@link module:bfx-api-node-models.OrderBook|OrderBook} model and
 * keeps it up to date with incoming ws2 data packets. On each update, a
 * `data:managed:book` event is emitted on the socket, providing a complete
 * {@link module:bfx-api-node-models.OrderBook|OrderBook} model instance.
 *
 * Note that the {@link module:bfx-api-node-core.Manager|Manager} proxies the
 * event as `managed:book`. If subscribing on a socket instance
 * (`wsState.ev.on(...)`) use the internal event name, otherwise use the
 * manager name with `manager.onWS(...)`.
 *
 * ### Features
 *
 * * Maintains up-to-date
 *   {@link module:bfx-api-node-models.OrderBook|OrderBook} models internally
 * * Emits a new 'managed:book' event with a full
 *   {@link module:bfx-api-node-models.OrderBook|OrderBook} instance on each
 *   update
 *
 * ### Installation
 *
 * ```bash
 * npm i --save bfx-api-node-plugin-managed-ob
 * ```
 *
 * ### Quickstart
 *
 * ```js
 * const { Manager } = require('bfx-api-node-core')
 * const ManagedOBPlugin = require('bfx-api-node-plugin-managed-ob')
 *
 * const mgr = new Manager({
 *   plugins: [ManagedOBPlugin()]
 * })
 *
 * // set up a connection, event listeners, etc
 *
 * mgr.onWS('managed:book', {}, (ob) => {
 *   debug('checksum: %s', ob.checksum())
 * })
 * ```
 *
 * @license MIT
 * @module bfx-api-node-plugin-managed-ob
 */

module.exports = require('./lib/plugin')
