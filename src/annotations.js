'use strict';

const path = require('path');

/**
 * Parse `luany view:check --format=github` output:
 *   ::error file=views/pages/home.lte,line=12,col=5::Unclosed @if: missing @endif.
 *
 * @param {string} output
 * @param {string} root   Project root the file paths are relative to
 * @returns {{file: string, line: number, column: number, message: string}[]}
 */
function parseAnnotations(output, root) {
    const results = [];

    for (const raw of String(output).split(/\r?\n/)) {
        const match = /^::error ([^:]*)::(.*)$/.exec(raw.trim());
        if (!match) {
            continue;
        }

        const props = {};
        for (const pair of match[1].split(',')) {
            const eq = pair.indexOf('=');
            if (eq > 0) {
                props[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
            }
        }

        if (!props.file) {
            continue;
        }

        results.push({
            file: path.resolve(root, props.file),
            line: Math.max(1, parseInt(props.line || '1', 10) || 1),
            column: Math.max(1, parseInt(props.col || '1', 10) || 1),
            message: decode(match[2]),
        });
    }

    return results;
}

/** GitHub annotation escaping: %25 → %, %0D → \r, %0A → \n. */
function decode(text) {
    return text.replace(/%0D/g, '\r').replace(/%0A/g, '\n').replace(/%25/g, '%');
}

/**
 * Directory above `start` that looks like a Luany project, or null.
 *
 * @param {string} start
 * @param {(p: string) => boolean} exists
 */
function findProjectRoot(start, exists) {
    let dir = start;
    for (let i = 0; i < 25; i++) {
        if (exists(path.join(dir, 'bootstrap', 'app.php')) || exists(path.join(dir, 'views')) && exists(path.join(dir, 'composer.json'))) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir) {
            return null;
        }
        dir = parent;
    }
    return null;
}

module.exports = { parseAnnotations, findProjectRoot, decode };
