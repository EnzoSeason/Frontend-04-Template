import assert from 'assert'
import parseHTML from '../src/parser.js';

describe("parse HTML", function() {
    it('<a></a>', function() {
        const tree = parseHTML('<a></a>');
        assert.strictEqual(tree.children[0].tagName, 'a');
        assert.strictEqual(tree.children[0].children.length, 0);
    })
    it('<a href="/"></a>', function() {
        const tree = parseHTML('<a href="/"></a>');
        console.log(tree);
        assert.strictEqual(tree.children[0].tagName, 'a');
        assert.strictEqual(tree.children[0].children.length, 0);
    })
})

