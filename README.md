# Yedidim weekly report

An editable Hebrew, right-to-left report for volunteers who respond to roadside assistance calls.

## Run locally

From this directory:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/WeeklySummary.html>. You can also open
<http://localhost:8000/template.html> directly. GitHub Pages or another static
HTTP server works too. Keep all files and directories together when deploying.
Opening the HTML through `file://` is unsupported: the entry point fetches the
template, and Babel fetches the separate JSX sources.

## Where to make changes

| File                 | Responsibility                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WeeklySummary.html` | Small entry point at the original URL.                                                                                                               |
| `loadContent.js`     | Loads the template and starts its scripts in dependency order.                                                                                       |
| `template.html`      | HTML document, stylesheet/script references, React mount point, and static email-import dialog template.                                             |
| `weekly-summary.js`  | Default report data, saved-data loading, editable React components, report sections, email/JSON import, print/PNG/JSON export, and main application. |
| `weekly-summary.css` | Report layout, fonts, themes, and print/export styles.                                                                                               |
| `settings-panel.js`  | Reusable appearance controls and settings-panel interaction.                                                                                         |
| `settings-panel.css` | Appearance-control styles.                                                                                                                           |
| `report-icons.js`    | SVG icon components, icon registry, and icon picker.                                                                                                 |
| `assets/`            | Original organization logo and fonts, extracted without changing their bytes.                                                                        |
| `vendor/`            | Original React, ReactDOM, Babel, and html2canvas distributions, including their existing license notices.                                            |

The original report uses React JSX. Its dynamic report markup therefore stays
with its React components in `weekly-summary.js`; `template.html` contains the
HTML shell and static dialog markup. These `.js` files deliberately contain JSX
and are loaded with `type="text/babel"`. The bundled Babel compiler handles them
in the browser, as in the original; no npm install or build step is required.
Third-party files in `vendor/` are dependencies, not application code to edit.

For report content defaults, start at `createDefaultReport()`. For layout,
start at `WeeklySummaryApp()` and the named `*Section` components. For email
parsing, see `parseEmailReport()` inside the email-import handler. For colors
and section visibility, see `DEFAULT_APPEARANCE`.

## What changed

The previous `WeeklySummary.html` was a generated archive: it embedded
compressed, base64-encoded libraries and fonts, plus a JSON-encoded document
and its application code. The previous `template.html` contained unresolved
asset IDs and duplicated the inline application. The new source uses ordinary
relative file references and one authoritative copy of each asset and component.

Unclear names have been replaced with descriptive names, for example:

| Before                    | After                                                           |
| ------------------------- | --------------------------------------------------------------- |
| `data`, `setData`, `set`  | `reportData`, `setReportData`, `updateReport`                   |
| `t`, `setTweak`           | `appearance`, `updateAppearance`                                |
| `E`, `NumE`               | `EditableText`, `EditableNumber`                                |
| `defaultData`, `loadData` | `createDefaultReport`, `loadSavedReport`                        |
| `ta`, `dr1`, `vm`         | `emailTextarea`, `compactDateRangeMatch`, `volunteerCountMatch` |
| `catMap`, `lookupCat`     | `categoryAppearanceByLabel`, `findCategoryAppearance`           |

Saved report field names and the `yedidim-weekly-v1` localStorage key remain
unchanged. Existing JSON imports and saved reports retain the same schema.
The default organization logo now points to the extracted PNG instead of an
embedded data URL; custom uploaded image data is still supported.

Report data remains in the browser's localStorage on its current origin. Use
JSON export/import when moving a report to a different domain or port.
