
/**
 * Module dependencies.
 */

// commented out by npm-component: var Emitter = require('tower-emitter');
var validators = require('./lib/validators');

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
 * @param {String} name Validator name.
 * @param {Function} fn Validator function.
 * @return {Function} Validator function.
 * @api public
 */

function validator(name, fn) {
  if (undefined === fn) return exports.collection[name];

  exports.collection[name] = fn;
  exports.collection.push(fn);
  exports.emit('define', name, fn);
  
  return fn;
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Check if validator exists.
 *
 * @param {String} name Validator name.
 * @return {Boolean} true if the validator exists in the current list of validators, else false.
 * @api public
 */

exports.defined = function(name){
  return exports.collection.hasOwnProperty(name);
};

/**
 * Scope validators to a namespace.
 *
 * @param {String} ns A namespace.
 * @return {Function} Function to get or set a validator under a namespace.
 * @api public
 */

exports.ns = function(ns){
  return function validator(name, fn) {
    return exports(ns + '.' + name, fn);
  }
};

/**
 * Remove all validators.
 *
 * @chainable
 * @return {Function} exports The main `validator` function.
 * @api public
 */

exports.clear = function(){
  var collection = exports.collection;

  exports.off('define');
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      delete collection[key];
    }
  }
  collection.length = 0;
  return exports;
};

validators(exports);