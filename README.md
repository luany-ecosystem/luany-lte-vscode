# Luany LTE — VS Code Extension

Official Visual Studio Code extension for **Luany Template Engine (LTE)**.

Provides syntax highlighting, embedded language support, and smart snippets for `.lte` files.

---

## Features

- Highlighting for every LTE 1.1 directive, with PHP arguments at any parenthesis depth
- `{{ }}` and `{!! !!}` highlighted in text, HTML attribute values, `<script>` and `<style>`
- Embedded CSS inside `@style` blocks and JavaScript inside `@script` blocks
- Embedded PHP inside `{{ }}`, `{!! !!}`, `@php` blocks and directive arguments
- Escapes `@@` and `@{{ }}` shown as literals; email addresses never mistaken for directives
- 31 snippets covering the LTE API
- Auto-indent and auto-closing pairs for all LTE constructs
- Emmet support inside `.lte` files
- Your editor settings are respected (no forced word-wrap or format-on-type)

---

## Supported Directives

### Conditionals
`@if` `@elseif` `@else` `@endif`
`@unless` `@endunless`
`@isset` `@endisset`
`@ifempty` `@endifempty`

### Loops
`@foreach` `@endforeach`
`@forelse` `@empty` `@endforelse`
`@for` `@endfor`
`@while` `@endwhile`

### Layout
`@extends` `@section` `@endsection` `@yield` `@include`

### Components & Slots
`@component` `@endcomponent` `@slot` `@endslot`

### Assets
`@style` `@endstyle` `@script` `@endscript` `@styles` `@scripts`

### Stacks
`@push` `@endpush` `@stack`

### Auth Guards
`@auth` `@endauth` `@guest` `@endguest`

### Security & Forms
`@csrf` `@method`

### PHP
`@php` `@endphp` `@php(...)`

### Escapes
`@@` (literal `@`) · `@{{ ... }}` (literal `{{ ... }}`)

### Output
`@json` `@class`

### Debug
`@dump` `@dd`

---

## ⚡ Snippets

| Prefix | Description |
|--------|-------------|
| `layout` | Official LTE view structure |
| `component` | Self-contained LTE component with collocated CSS and JS |
| `component-use` | LTE component with a named slot |
| `@slot` | Named slot inside a component |
| `if` | @if / @endif block |
| `ifelse` | @if / @else / @endif block |
| `unless` | @unless / @endunless block |
| `isset` | @isset / @endisset block |
| `ifempty` | @ifempty / @endifempty block |
| `foreach` | @foreach / @endforeach loop |
| `forelse` | @forelse / @empty / @endforelse loop with empty state |
| `for` | @for / @endfor loop |
| `while` | @while / @endwhile loop |
| `section` | @section / @endsection block |
| `style` | Inline CSS block — accumulated by AssetStack |
| `script` | Inline JS block with defer — accumulated by AssetStack |
| `push` | @push / @endpush — push content into named stack |
| `include` | @include partial view |
| `include-data` | @include partial view with data |
| `php` | @php / @endphp block |
| `@json` | Safe JSON output for inline JavaScript |
| `@class` | Conditional CSS classes |
| `@method` | HTTP method spoofing field |
| `form` | POST form with @csrf |
| `form-method` | Form with @csrf and @method spoofing |
| `csrf` | CSRF hidden input field |
| `auth` | @auth / @endauth guard block |
| `guest` | @guest / @endguest guard block |
| `dump` | @dump($var) — no-op when debug is off |
| `dd` | @dd($var) — no-op when debug is off |
| `@{{` | Output literal {{ }} (not compiled) |

---

## About Luany Template Engine

LTE is the template engine of the Luany framework: `.lte` files are parsed by a hand-written scanner and compiled to cached PHP, with output escaped by default.

- `composer require luany/lte`
- [Packagist](https://packagist.org/packages/luany/lte)
- [GitHub](https://github.com/luany-ecosystem/luany-lte)

---

## Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **Luany LTE**
4. Install

---

## Author

**António Ambrósio Ngola**

- [antoniongola.dev@gmail.com](mailto:antoniongola.dev@gmail.com)
- 🌍 Luanda, Angola 🇦🇴

---

## 🗺 Roadmap

| Version | Focus |
|---------|-------|
| v1.0.0 | Full directive coverage, snippets, auto-indent, Emmet |
| v1.1.x | Grammar aligned with LTE 1.1 (escapes, nested arguments, echoes in attributes), grammar test suite |
| next | Language server — view-path completion, diagnostics, folding |

---

## License

MIT