
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter');

/**
 * Expose `validator`.
 */

exports = module.exports = validator;

/**
 * All validators in the order they were defined.
 */

exports.collection = [];

/**
 * Get or set a validator function.
 *
 * @param {String} name
 * @param {Function} [fn]
 */

function validator(name, fn) {
  if (1 === arguments.length) return exports.collection[name]

  exports.collection[name] = fn;
  exports.collection.push(fn);
  exports.emit('define', name, fn);
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Check if validator exists.
 *
 * @param {String} name
 */

exports.has = function(name){
  return !!exports.collection[name];
}

/**
 * Scope validators to a namespace.
 */

exports.ns = function(ns){
  return function validator(name, fn) {
    return exports(ns + '.' + name, fn);
  }
}

/**
 * Remove all validators.
 */

exports.clear = function(){
  exports.off('define');
  // XXX: instead of creating a new array,
  // it should just set length to zero (and clear keys).
  exports.collection = [];
  return exports;
}