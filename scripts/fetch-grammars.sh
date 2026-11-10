#!/usr/bin/env sh
# Downloads the VS Code built-in grammars LTE embeds (pinned), for grammar tests.
set -eu
V="${VSCODE_GRAMMARS_VERSION:-1.95.0}"
DIR="$(dirname "$0")/../test/grammars"
mkdir -p "$DIR"
base="https://raw.githubusercontent.com/microsoft/vscode/$V/extensions"
curl -sfL "$base/html/syntaxes/html.tmLanguage.json"             -o "$DIR/html.tmLanguage.json"
curl -sfL "$base/php/syntaxes/php.tmLanguage.json"               -o "$DIR/php.tmLanguage.json"
curl -sfL "$base/php/syntaxes/html.tmLanguage.json"              -o "$DIR/php-html.tmLanguage.json"
curl -sfL "$base/css/syntaxes/css.tmLanguage.json"               -o "$DIR/css.tmLanguage.json"
curl -sfL "$base/javascript/syntaxes/JavaScript.tmLanguage.json" -o "$DIR/JavaScript.tmLanguage.json"
echo "Grammars fetched (VS Code $V)."
