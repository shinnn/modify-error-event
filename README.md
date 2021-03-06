# modify-error-event

[![NPM version](https://img.shields.io/npm/v/modify-error-event.svg)](https://www.npmjs.com/package/modify-error-event)
[![Build Status](https://travis-ci.org/shinnn/modify-error-event.svg?branch=master)](https://travis-ci.org/shinnn/modify-error-event)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/modify-error-event.svg)](https://coveralls.io/r/shinnn/modify-error-event)
[![dependencies Status](https://david-dm.org/shinnn/modify-error-event/status.svg)](https://david-dm.org/shinnn/modify-error-event)
[![devDependencies Status](https://david-dm.org/shinnn/modify-error-event/dev-status.svg)](https://david-dm.org/shinnn/modify-error-event?type=dev)

Modify the value of the specific object's `error` [event](https://nodejs.org/api/events.html)

```javascript
const EventEmitter = require('events').EventEmitter;
const modifyErrorEvent = require('modify-error-event');

let emitter = new EventEmitter();

modifyErrorEvent(emitter, err => {
  err.message = 'bar';
  return err;
});

emitter.on('error', err => {
  err.message; //=> 'bar'
});

emitter.emit('error', new Error('foo'));
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install modify-error-event
```

## API

```javascript
const modifyErrorEvent = require('modify-error-event');
```

### modifyErrorEvent(*eventEmitter*, *modifier*)

*eventEmitter*: `Object` (an instance of [`EventEmitter`](https://nodejs.org/api/events.html#events_class_events_eventemitter) or its inheritance e.g. [`Stream`](https://nodejs.org/api/stream.html#stream_stream))  
*modifier*: `Function`  
Return: `Object` (Same as the first argument)

It changes the first argument of the `error` event listeners in response to the return value of the *modifier* function.

```javascript
const EventEmitter = require('events').EventEmitter;
const modifyErrorEvent = require('modify-error-event');

let emitter = new EventEmitter();

modifyErrorEvent(emitter, err => {
  err.message += 'b';
  return err;
});

modifyErrorEvent(emitter, val => {
  err.message += 'c';
  return err;
});

emitter
.on('error', listener)
.emit('error', new Error('a'));

function listener(err) {
  err.message; //=> 'abc'
}
```

## License

[The Unlicense](./LICENSE).
