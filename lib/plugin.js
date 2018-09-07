'use strict'

const { definePlugin } = require('bfx-api-node-core')
const onBookData = require('./data/book')

/**
 * Maintains a collection of complete order books on the plugin state, and emits
 * entire books for each incoming book update.
 */
module.exports = definePlugin('bfx.managed-ob', {}, (h = {}, args = {}) => ({
  type: 'ws2',
  data: {
    book: onBookData(h, args),
  }
}))
