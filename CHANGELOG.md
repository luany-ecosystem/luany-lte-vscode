# Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] — 2026-03-28

### Added
- Complete LTE v1.0 directive coverage — all directives from the engine are now highlighted:
  - `@isset($var)` / `@endisset`
  - `@ifempty($var)` / `@endifempty`
  - `@json($data)` — safe JSON output (new in LTE v1.0)
  - `@class([...])` — conditional CSS classes (new in LTE v1.0)
  - `@dump($var)` / `@dd($var)` — debug directives
  - `@component(...)` / `@slot(...)` / `@endcomponent` / `@endslot`
- 13 new snippets — full API coverage:
  - `unless` — `@unless` / `@endunless`
  - `isset` — `@isset` / `@endisset`
  - `ifempty` — `@ifempty` / `@endifempty`
  - `for` — `@for` / `@endfor`
  - `while` — `@while` / `@endwhile`
  - `component-use` — `@component` / `@slot` / `@endcomponent`
  - `php` — `@php` / `@endphp` block
  - `json` — `@json($data)`
  - `class` — `@class([...])`
  - `method` — `@method('PUT'|'PATCH'|'DELETE')`
  - `form` — full form with `@csrf`
  - `form-method` — form with `@csrf` + `@method`
  - `dump` / `dd` — debug output
- Indentation rules extended — `isset`, `ifempty`, `component`, `slot` now trigger auto-indent on enter
- `onEnterRules` extended with all new block directives

### Fixed
- Inline `@php($expr)` was incorrectly matched as a block directive, causing unclosed scope. A dedicated `phpInline` rule now matches the inline form before the block rule.
- `decreaseIndentPattern` now includes `endisset`, `endifempty`, `endcomponent`, `endslot`

### Changed
- `[1.0.0]` entry corrected — previously listed only two trivial changes. Full directive coverage and snippet set are the real v1.0.0 deliverable.
- Date corrected to 2026-03-28 (actual release date)

---

## [0.2.0] — 2026-02-26

### Added
- Syntax highlighting for asset directives:
  - `@style` / `@endstyle` — with embedded CSS highlighting
  - `@script` / `@endscript` — with embedded JavaScript highlighting
  - `@styles` / `@scripts` — render directives
- Syntax highlighting for stack directives:
  - `@push` / `@endpush` / `@stack`
- Syntax highlighting for `@forelse` / `@empty` / `@endforelse`
- Syntax highlighting for `@stop` (alias for `@endsection`)
- Embedded CSS inside `@style` blocks
- Embedded JavaScript inside `@script` blocks
- New snippets: `layout`, `component`, `forelse`, `style`, `script`, `push`, `include-data`, `ifelse`, `auth`, `guest`
- Repository URL updated to `luany-ecosystem` organisation
- Added `ast` and `compiler` keywords

### Changed
- `layout` snippet updated to official LTE v0.2 view structure

---

## [0.1.0] — 2026-02-22

### Added
- Initial release of Luany LTE extension
- Syntax highlighting for LTE directives (`@if`, `@foreach`, `@section`, etc.)
- Echo statements `{{ }}` and raw echo `{!! !!}`
- `@php` blocks with embedded PHP
- LTE comments `{{-- --}}`
- Embedded PHP support inside LTE templates
- HTML inheritance support
- Basic snippets for common directives