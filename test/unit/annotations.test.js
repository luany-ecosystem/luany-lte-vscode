'use strict';

const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { parseAnnotations, findProjectRoot } = require('../../src/annotations');

test('parses view:check GitHub annotations', () => {
    const out = [
        '::error file=views/pages/show.lte,line=12,col=5::Unclosed @if: missing @endif.',
        'noise',
        '::error file=views/a.lte,line=2::PHP syntax error in {{ }}%0Asecond line 100%25',
    ].join('\n');

    const result = parseAnnotations(out, '/app');

    assert.deepStrictEqual(result, [
        { file: path.resolve('/app', 'views/pages/show.lte'), line: 12, column: 5, message: 'Unclosed @if: missing @endif.' },
        { file: path.resolve('/app', 'views/a.lte'), line: 2, column: 1, message: 'PHP syntax error in {{ }}\nsecond line 100%' },
    ]);
});

test('ignores malformed lines', () => {
    assert.deepStrictEqual(parseAnnotations('::error line=1::no file\n::warning file=x::w', '/app'), []);
});

test('finds the project root from a nested view directory', () => {
    const existing = new Set([path.join('/p', 'bootstrap', 'app.php')]);
    assert.strictEqual(findProjectRoot('/p/views/pages', (f) => existing.has(f)), '/p');
    assert.strictEqual(findProjectRoot('/elsewhere/x', () => false), null);
});
