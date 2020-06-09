'use strict'

/**
 * @private
 *
 * @param {object} channel - channel
 * @param {string} channel.symbol - symbol
 * @param {string} channel.freq - freq
 * @param {string} channel.prec - precision
 * @param {string} channel.len - length
 * @returns {string} key
 */
const obDataKey = (channel) => {
  const { symbol, freq, prec, len } = channel
  return [symbol, freq, prec, len].map(String).join(':')
}

module.exports = obDataKey
