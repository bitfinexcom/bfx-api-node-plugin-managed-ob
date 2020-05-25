'use strict'

const { definePlugin } = require('bfx-api-node-core')
const onBookData = require('./data/book')

/**
 * Maintains a collection of complete order books on the plugin state, and
 * emits entire books for each incoming book update.
 *
 * @function
 * @exports module:bfx-api-node-plugin-managed-ob
 *
 * @returns {module:bfx-api-node-core.Plugin} pluginState
 */
const Plugin = definePlugin('bfx.managed-ob', {}, (h = {}, args = {}) => ({
  type: 'ws2',
  data: {
    book: onBookData(h, args)
  }
}))

module.exports = Plugin
