import assert from 'assert'
import parseHTML from '../src/parser.js';

describe("parse HTML", function() {
    it('<a>abc</a>', function() {
        const dom = parseHTML('<a>abc</a>');
        assert.strictEqual(1, 1);
    })
})

