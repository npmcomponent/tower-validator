var validator = 'undefined' == typeof window
  ? require('..')
  : require('tower-validator'); // how to do this better?

var assert = require('assert');

describe('validator', function(){
  beforeEach(validator.clear);

  it('define', function(){
    var calls = [];

    validator.on('define', function(name, fn){
      calls.push(name);
    });
    
    validator('eq', function eq(a, b){
      return a === b;
    });

    assert(1 === validator.collection.length);
    assert(true === validator.has('eq'));
    assert(false === validator.has('neq'));
    assert(1 === calls.length);
    assert('eq' === calls[0]);
  });

  it('should scope to a namespace', function(){
    var attrValidator = validator.ns('attr');

    var calls = [];

    validator.on('define', function(name, fn){
      calls.push(name);
    });
    
    attrValidator('eq', function eq(a, b){
      return a === b;
    });

    assert(1 === validator.collection.length);
    assert(true === validator.has('attr.eq'));
    assert(false === validator.has('eq'));
    assert(1 === calls.length);
    assert('attr.eq' === calls[0]);
  });
});