# DSH PG Grid

A native DeepSeek Harness Web plugin for browsing and analyzing local PostgreSQL databases without writing SQL.

DSH 原生 PostgreSQL 数据工作区：通过表格和可视化规则查看、筛选、排序、关联、计算和统计。本插件独立实现，不依赖 VS Code 扩展。

## Install / 安装

Tested with DSH **0.2.1-rc.2**, Node.js **22+**. Install the prebuilt release in the Web profile:

```sh
dsh plugin --profile web add https://github.com/HeShen-1/dsh-pg-grid/releases/download/v0.1.0/dsh-pg-grid-0.1.0.tgz
```

Refresh DSH and open **数据表** in the sidebar. Enable or disable the plugin from DSH's plugin manager. If the entry does not appear, restart DSH when convenient. The current DSH version may retain an already-loaded sidebar entry after disabling the host plugin; its API is unregistered and queries stop.

The source checkout includes newer features than the pinned v0.1.0 release below. Build and install a checkout to use them.

## Features / 功能

- Local loopback PostgreSQL connections, table/schema/view discovery and server-side pagination.
- Nested AND/OR filters and multi-column sorting over the complete matching dataset.
- Excel-style column-header menus: ascending/descending sort, searchable paged value choices, include/exclude checkboxes, conditions and clearing filters. Header filters persist in saved views and apply to exports; NULL and empty strings remain distinct. Ordinary and aggregate columns support filters; pivots support row dimensions.
- Same-database inner/left equality joins, including multi-column join keys.
- Field-based computed columns: arithmetic, rounding, conditions, null handling, concatenation and date parts.
- Grouping and count/sum/average/min/max; pivot tables with totals recomputed from source rows.
- Column width/order/hiding/freezing, range selection, keyboard navigation, clipboard and CSV export.
- Locally saved analysis views containing rules and column settings, with fresh data on reopen.
- Visible active-view refresh every 30 seconds, pause/manual refresh, cancellation and stale-response protection.
- DSH theme integration, opaque sticky headers, visible scrollbars and collapsible analysis settings.

Select a table, configure **查询规则**, and click **应用查询规则**. **保存视图** stores the query rules rather than a data snapshot. Column widths are edited in **列设置**. One-to-many joins intentionally retain duplicate parent rows.

## Read-only and credentials / 只读与凭据

Queries run in PostgreSQL `READ ONLY` transactions through a restricted, parameterized query compiler. There is no arbitrary SQL, DML or DDL endpoint. Connections accept only `127.0.0.1`, `localhost` or `::1`; remote hosts, tunnels and cross-database joins are outside this release.

**记住密码（仅保存在本机）** stores passwords in `$DSH_HOME/pg-grid/credentials.json` (default `~/.dsh/pg-grid/credentials.json`) with mode `0600`. Metadata and saved views are separate in `views.json`. Clicking a saved connection after restarting the plugin reconnects without entering a password. Uncheck the option and connect to remove its saved password. When editing, an empty password field reuses the saved password if remembering remains enabled and connection identity matches.

This is local **plaintext** storage, not an encrypted vault: it does not protect against software running as your account or root. Do not commit or share these files. Passwords are never returned by the API or included in model prompts. Without remembering, credentials last only for the host plugin lifetime.

## Data semantics and limits

- Filters, joins, aggregations and full exports operate on the whole relation, not just the visible page.
- Big integers, decimals, JSON and date/time values retain their textual representation. NULL, empty string and zero are distinct. CSV/clipboard represent NULL as `\N`; CSV quotes empty strings and escapes multiline content, quotes and spreadsheet formula prefixes.
- Division by zero returns NULL with a warning; invalid types produce errors.
- Pages: 25–500 rows; full export: up to 100,000 rows. Pivot: up to 100 column values and 100,000 grouping records. Exceeding limits fails explicitly rather than truncating.
- Up to 20 connections, 8 source tables and 20 computed columns per plan. Computed columns do not reference other computed columns. Query timeout: 15 seconds.
- No source-data editing, spreadsheet import/writeback, A1 formulas, XLSX compatibility or blank worksheets.

## Optional AI / 可选 AI

The natural-language adapter is implemented but **disabled by default** (`aiEnabled: false` in `cordis.patch.yml`). Ordinary browsing, refresh, export and saved views never call a model.

The AI panel lists models configured in DSH settings. If explicitly enabled, an explicit choice routes the request to that provider/model; otherwise it follows the current session selection or the DSH default. Explicit selections are checked against the available model directory before dispatch. Only selected table schemas, the current rules, the request, and optionally up to 20 current-page rows are sent to that provider. Model output must pass the same closed query compiler and selected-table scope checks as manual rules. Offline tests cover routing, unavailable-model rejection and metadata isolation. Three bounded GLM-5.3-Flash calls on the configured DSH Coding Plan route validated filtering, multi-column sorting and a same-database inner join against complete independent read-only SQL results. This does not validate other providers or establish actual billed cost. Enabling AI can consume provider quota or incur charges.

### Bounded local validation

A local `$DSH_HOME/pg-grid/ai-validation.json` (default `~/.dsh/pg-grid/ai-validation.json`) can temporarily authorize a controlled validation run. It is never shipped with this repository. The authorization specifies `enabled`, `provider`, `model`, `maxCalls`, `maxCny` and a `calls` ledger. Each attempt is recorded before inference, survives plugin reloads, and failures consume a slot. Limits are at most three calls, no result-row sharing, 16,000 UTF-8 input bytes and 4,000 output tokens. Set `enabled` to false after testing.

The 0.2 CNY reservation per attempt is a conservative allowance for the specifically validated low-cost route, **not a provider-independent billing meter or an account spending cap**. Verify endpoint, prices, token limits and retry behavior before granting a new authorization; never use this allowance for an arbitrary expensive model. Keep authorization and usage files private. The release configuration remains `aiEnabled: false`.

## Development and validation

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
```

The repository includes prebuilt native bundles. To install a source checkout after building:

```sh
dsh plugin --profile web add /absolute/path/to/dsh-pg-grid
```

Integration tests require a dedicated disposable PostgreSQL database. **They recreate fixture tables; never point them at a business database.** The test database/user/password are `grid_test` / `postgres` / `grid-test-only` (synthetic test credentials). Ports 5432, 5433 and 55432 are blocked by the fixture initialization script.

```sh
mkdir -p docs/evidence
PG_GRID_TEST_PORT=<dedicated-port> pnpm test:pg
# Optional browser suite; provide a resolvable Playwright module and installed Chromium.
PG_GRID_TEST_PORT=<dedicated-port> PLAYWRIGHT_MODULE=<module-path> node test/browser.mjs
```

Development verification covers unit/credential tests, a 50,000-row PostgreSQL fixture, browser workflows, native DSH lifecycle/authentication, and selected read-only queries on real databases compared against independent SELECT statements. Personal connection files, real-data screenshots and local validation artifacts are intentionally excluded from this public repository. This is not a claim that every database/schema or model provider has been tested.

## License

MIT.
