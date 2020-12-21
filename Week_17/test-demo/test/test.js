var assert = require('assert');
var add = require('../src/add');

it('1 + 2 === 3', function() {
    assert.equal(add(1, 2), 3)
});