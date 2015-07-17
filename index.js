'use strict';

var modifyEvent = require('modify-event');

module.exports = function modifyErrorEvent(eventEmitter, fn) {
  return modifyEvent(eventEmitter, 'error', fn);
};
