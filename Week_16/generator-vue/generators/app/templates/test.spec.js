import assert from 'assert';
import { add } from '../src/calcul';

it('1 + 2 === 3', function() {
    assert.strictEqual(add(1, 2), 3)
});