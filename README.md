# Luany LTE — VS Code Extension

Official Visual Studio Code extension for **Luany Template Engine (LTE)**.

Provides syntax highlighting, embedded language support, and smart snippets for `.lte` files.

---

## Features

- Full LTE v1.0 directive coverage — all engine directives highlighted
- Embedded CSS inside `@style` blocks
- Embedded JavaScript inside `@script` blocks
- Embedded PHP inside `{{ }}`, `{!! !!}`, and `@php` blocks
- 30+ snippets covering 100% of the LTE v1.0 API
- Auto-indent and auto-closing pairs for all LTE constructs
- Emmet support inside `.lte` files

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
`@php` `@endphp`

### Output (new in v1.0)
`@json` `@class`

### Debug
`@dump` `@dd`

---

## ⚡ Snippets

| Prefix | Description |
|--------|-------------|
| `layout` | Official LTE v1.0 view structure |
| `component` | Self-contained component with CSS and JS |
| `component-use` | `@component` / `@slot` / `@endcomponent` |
| `if` | `@if` / `@endif` |
| `ifelse` | `@if` / `@else` / `@endif` |
| `unless` | `@unless` / `@endunless` |
| `isset` | `@isset` / `@endisset` |
| `ifempty` | `@ifempty` / `@endifempty` |
| `foreach` | `@foreach` / `@endforeach` |
| `forelse` | `@forelse` / `@empty` / `@endforelse` |
| `for` | `@for` / `@endfor` |
| `while` | `@while` / `@endwhile` |
| `section` | `@section` / `@endsection` |
| `style` | `@style` / `@endstyle` CSS block |
| `script` | `@script(defer)` / `@endscript` JS block |
| `push` | `@push` / `@endpush` stack block |
| `include` | `@include` partial |
| `include-data` | `@include` with data array |
| `php` | `@php` / `@endphp` block |
| `json` | `@json($data)` safe output |
| `class` | `@class([...])` conditional classes |
| `method` | `@method('PUT')` form spoofing |
| `form` | Full form with `@csrf` |
| `form-method` | Form with `@csrf` + `@method` |
| `csrf` | `@csrf` hidden input |
| `auth` | `@auth` / `@endauth` guard |
| `guest` | `@guest` / `@endguest` guard |
| `dump` | `@dump($var)` |
| `dd` | `@dd($var)` |

---

## About Luany Template Engine

LTE is a structured, AST-driven template engine for PHP. Parser → AST → Compiler. Zero regex in the entire pipeline.

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
| v1.0.0 | Production-ready — full directive coverage, 30+ snippets, auto-indent, Emmet |
| v1.1.0 | LSP experimental — view path autocompletion, diagnostics |
| v1.2.0 | Web playground — interactive LTE compiler sandbox |

> **Status:** v1.0.0 is production-ready with frozen API. All directives stable. DX optimized for professional development.

> **Folding note:** Block folding works optimally when LTE's official indentation is followed. Full AST-based folding via LSP planned for v1.1.0+.

---

## License

MIT