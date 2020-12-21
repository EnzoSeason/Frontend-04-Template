import assert from 'assert';
import add from '../src/add';

it('1 + 2 === 3', function() {
    assert.strictEqual(add(1, 2), 3)
});