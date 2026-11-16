'use strict';

const vscode = require('vscode');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const { parseAnnotations, findProjectRoot } = require('./src/annotations');

/**
 * Luany LTE — editor diagnostics.
 *
 * On open / save of a .lte file, runs `luany view:check --format=github` in
 * the project and shows every structural or PHP syntax error at its exact
 * line and column (also in the Problems panel). Requires luany/cli >= 1.4.
 */

let collection;
let output;
const timers = new Map();
const running = new Set();
const pending = new Set();
let warnedMissingCli = false;
let warnedFailure = false;

function activate(context) {
    collection = vscode.languages.createDiagnosticCollection('lte');
    output = vscode.window.createOutputChannel('Luany LTE');
    context.subscriptions.push(collection, output);

    const schedule = (document) => {
        if (document.languageId !== 'lte' || document.uri.scheme !== 'file' || !enabled()) {
            return;
        }
        const root = findProjectRoot(path.dirname(document.uri.fsPath), (p) => fs.existsSync(p));
        if (root) {
            debounce(root, () => validate(root));
        }
    };

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(schedule),
        vscode.workspace.onDidOpenTextDocument(schedule),
        vscode.commands.registerCommand('luanyLte.validateViews', () => {
            const editor = vscode.window.activeTextEditor;
            const start = editor ? path.dirname(editor.document.uri.fsPath)
                : vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            const root = start ? findProjectRoot(start, (p) => fs.existsSync(p)) : null;
            if (!root) {
                vscode.window.showWarningMessage('Luany LTE: no Luany project found for the current file.');
                return;
            }
            validate(root, true);
        }),
        vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('luanyLte.validate.enabled') && !enabled()) {
                collection.clear();
            }
        }),
    );

    vscode.workspace.textDocuments.forEach(schedule);
}

function enabled() {
    return vscode.workspace.getConfiguration('luanyLte').get('validate.enabled', true);
}

function debounce(key, fn) {
    clearTimeout(timers.get(key));
    timers.set(key, setTimeout(() => {
        timers.delete(key);
        fn();
    }, 300));
}

function command(root) {
    const configured = vscode.workspace.getConfiguration('luanyLte').get('cliPath', '').trim();
    if (configured) {
        return { file: configured, args: [] };
    }
    const local = path.join(root, 'vendor', 'bin', 'luany');
    if (fs.existsSync(local)) {
        return { file: 'php', args: [local] };
    }
    return { file: 'luany', args: [] };
}

/** The CLI could not be started at all (as opposed to failing while running). */
function cliMissing(error, stderr) {
    if (error.code === 'ENOENT' || error.code === 127) {
        return true;
    }
    return process.platform === 'win32'
        && /is not recognized as an internal or external command/i.test(String(stderr));
}

function validate(root, manual = false) {
    if (running.has(root)) {
        pending.add(root);   // re-run once the current check finishes
        return;
    }
    running.add(root);

    const config = vscode.workspace.getConfiguration('luanyLte');
    const { file, args } = command(root);
    const fullArgs = [...args, 'view:check', '--format=github'];
    if (!config.get('validate.bootApp', false)) {
        fullArgs.push('--no-app');
    }

    cp.execFile(file, fullArgs, {
        cwd: root,
        timeout: 30000,
        windowsHide: true,
        shell: process.platform === 'win32',
        env: { ...process.env, NO_COLOR: '1' },
    }, (error, stdout, stderr) => {
        running.delete(root);
        if (pending.delete(root)) {
            debounce(root, () => validate(root));
        }

        if (error && cliMissing(error, stderr)) {
            if (!warnedMissingCli || manual) {
                warnedMissingCli = true;
                vscode.window.showWarningMessage(
                    'Luany LTE: the Luany CLI was not found. Install it with "composer global require luany/cli" or set "luanyLte.cliPath".'
                );
            }
            return;
        }

        const problems = parseAnnotations(stdout, root);

        // A failure without annotations is not "no problems": keep the current
        // diagnostics and say why (old CLI, broken app bootstrap, timeout…).
        if (error && problems.length === 0) {
            const detail = String(stderr || stdout || error.message).trim();
            output.appendLine(`[view:check] exit ${error.code ?? error.signal}: ${detail}`);
            if (/format|not defined|does not exist/i.test(detail)) {
                output.appendLine('[view:check] Editor diagnostics need luany/cli >= 1.4 — run "composer global update luany/cli".');
            }
            if (manual || !warnedFailure) {
                warnedFailure = true;
                vscode.window.showWarningMessage('Luany LTE: view:check failed — see the "Luany LTE" output channel.');
            }
            return;
        }

        // Replace this project's diagnostics.
        collection.forEach((uri) => {
            if (uri.fsPath.startsWith(root + path.sep)) {
                collection.delete(uri);
            }
        });

        const byFile = new Map();
        for (const p of problems) {
            const line = p.line - 1;
            const col = p.column - 1;
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(line, col, line, col + 1),
                p.message,
                vscode.DiagnosticSeverity.Error
            );
            diagnostic.source = 'luany view:check';
            if (!byFile.has(p.file)) {
                byFile.set(p.file, []);
            }
            byFile.get(p.file).push(diagnostic);
        }

        for (const [filePath, diagnostics] of byFile) {
            collection.set(vscode.Uri.file(filePath), diagnostics);
        }

        if (manual) {
            vscode.window.setStatusBarMessage(
                problems.length === 0 ? 'Luany LTE: all views OK' : `Luany LTE: ${problems.length} problem(s)`,
                4000
            );
        }
    });
}

function deactivate() {
    for (const t of timers.values()) {
        clearTimeout(t);
    }
}

module.exports = { activate, deactivate };
