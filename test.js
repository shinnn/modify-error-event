'use strict';

const {EventEmitter} = require('events');

const modifyErrorEvent = require('.');
const {test} = require('tape');

const emitter = new EventEmitter();

test('modifyErrorEvent()', t => {
  t.plan(7);

  t.equal(modifyErrorEvent.name, 'modifyErrorEvent', 'should have a function name.');

  t.strictEqual(
    modifyErrorEvent(emitter, data => data * 2),
    emitter,
    'should return the modified EventEmitter.'
  );

  emitter
  .on('error', function(data) {
    t.strictEqual(this, emitter, 'should call the listener in the same context as original\'s.');
    t.strictEqual(data, 2, 'should modify the value of event.');
  })
  .emit('error', 1);

  t.throws(
    () => modifyErrorEvent(null, t.fail),
    /TypeError.* must be an instance of EventEmitter or its inheritance\./,
    'should throw a type error when the first argument is not an object.'
  );

  t.throws(
    () => modifyErrorEvent({}, t.fail),
    /TypeError.* must be an instance of EventEmitter or its inheritance\./,
    'should throw a type error when the first argument is not an instance of EventEmitter.'
  );

  t.throws(
    () => modifyErrorEvent(emitter, 'foo'),
    /TypeError.*foo is not a function. The third argument to modify-event must be a function\./,
    'should throw a type error when the third argument is not a function.'
  );
});
