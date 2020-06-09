'use strict'

const { definePlugin } = require('bfx-api-node-core')
const onBookData = require('./data/book')

const Plugin = definePlugin('bfx.managed-ob', {}, (h = {}, args = {}) => ({
  type: 'ws2',
  data: {
    book: onBookData(h, args)
  }
}))

module.exports = Plugin
