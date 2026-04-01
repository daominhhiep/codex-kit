# Codex Kit

[![npm version](https://img.shields.io/npm/v/@daominhhiep/codex-kit.svg)](https://www.npmjs.com/package/@daominhhiep/codex-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[Official Website](https://codexkit.xyz/)** | **[Unikorn](https://unikorn.vn/p/codex-kit)**


Codex Kit is a Codex-native starter kit for teams that want a reusable project scaffold with routing docs, a shipped skill catalog, workflow playbooks, focused subagents, MCP-ready config, and managed updates.

The goal is simple: run `codex-kit init` and get a repository that already feels ready for Codex, instead of rebuilding the same operating layer in every new project.

## What It Installs

The scaffold currently ships with:

- root routing docs: `AGENTS.md`, `ARCHITECTURE.md`, `AGENT_FLOW.md`
- 40+ skills in `.agents/skills`
- 15 workflow playbooks in `.agents/workflows`
- 16 focused subagents in `.codex/agents`
- shared `ui-ux-pro-max` data and scripts in `.agents/.shared`
- project-scoped Codex config in `.codex/config.toml`
- managed-file tracking in `.codex-kit/manifest.json`

## Install

Run with `npx`:

```bash
npx @daominhhiep/codex-kit init
```

Or install globally:

```bash
npm install -g @daominhhiep/codex-kit
codex-kit init
```

Initialize into a specific directory:

```bash
npx @daominhhiep/codex-kit init --path ./my-project
```

## Requirements

- Node.js `>=20`

## CLI

```bash
codex-kit init
codex-kit update
codex-kit status
```

### Options

```bash
codex-kit init --path ./my-project
codex-kit init --force
codex-kit init --dry-run
codex-kit init --quiet

codex-kit update --path ./my-project
codex-kit update --force
codex-kit update --dry-run

codex-kit status --path ./my-project
```

## Scaffold Layout

`codex-kit init` writes this Codex-first project structure:

```text
AGENTS.md
ARCHITECTURE.md
AGENT_FLOW.md
.agents/
  skills/
  .shared/
  workflows/
.codex/
  config.toml
  agents/
.codex-kit/
  manifest.json
```

## Core Pieces

### `AGENTS.md`

The main routing contract for the repository. It defines:

- how to classify requests
- which workflow should be used
- which subagent fits each task shape
- which skills pair well with each role
- when to use `check` or `verify`

### `.agents/skills/`

Reusable knowledge modules in Codex `SKILL.md` format.

The shipped catalog covers areas such as:

- clean code and implementation quality
- frontend and backend work
- database design
- testing and debugging
- performance and security
- SEO and GEO
- mobile
- MCP-related work

The scaffold skill catalog is the product source of truth:

- [templates/project/.agents/skills](https://github.com/daominhhiep/codex-kit/tree/main/templates/project/.agents/skills)

### `.agents/workflows/`

Process playbooks for common task types, including:

- brainstorm
- plan
- create
- enhance
- debug
- review
- check
- verify
- test
- deploy
- preview
- status
- orchestrate
- ship
- UI/UX direction

Workflows define process, not domain knowledge.

### `.agents/.shared/`

Shared packages for script-and-data tooling that do not naturally belong to a single skill.

The default scaffold includes:

- `.agents/.shared/ui-ux-pro-max/`

This shared package contains:

- CSV datasets for style, color, typography, landing-page patterns, UX guidance, and stack-specific recommendations
- Python scripts for search and design-system generation

### `.codex/agents/`

Focused subagents defined as `.toml` files.

The scaffold ships with roles such as:

- `planner`
- `explorer`
- `implementer`
- `frontend_specialist`
- `backend_specialist`
- `database_architect`
- `mobile_developer`
- `debugger`
- `performance_optimizer`
- `reviewer`
- `security_auditor`
- `docs_researcher`
- `documentation_writer`
- `seo_specialist`
- `devops_engineer`
- `test_writer`

Each subagent stays intentionally narrow:

- agent files define role
- skills define knowledge
- workflows define process
- `AGENTS.md` defines routing

### `.codex/config.toml`

Project-scoped Codex configuration.

The scaffold includes:

- top-level model and approval settings
- `[agents]` configuration
- `[mcp_servers]` configuration
- a ready-to-use Context7 MCP entry

### `.codex-kit/manifest.json`

Managed-file manifest used by the CLI.

It tracks:

- managed file paths
- template hashes
- installed hashes
- kit version metadata

This powers:

- `status`
- safe `update`
- detection of missing or locally modified managed files

## MCP Support

MCP servers are configured in:

- `.codex/config.toml`

The scaffold ships with Context7 preconfigured:

```toml
[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"
```

You can optionally add an API key:

```toml
http_headers = { "CONTEXT7_API_KEY" = "YOUR_API_KEY" }
```

The config also includes commented examples for:

- additional remote HTTP MCP servers
- local stdio MCP servers

## UI/UX Pro Max

The scaffold includes a shared `ui-ux-pro-max` package, not just a workflow stub.

Example commands inside a scaffolded project:

```bash
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "saas dashboard" --domain product
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "fintech landing" --design-system -p "Fintech App"
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "dashboard layout" --stack nextjs
```

Useful for:

- design direction
- design-system generation
- stack-aware UI guidance
- UX and visual decision support

## How `update` Works

`codex-kit update` is manifest-aware.

That means:

- missing managed files are detectable
- locally modified managed files are skipped by default
- `--force` overwrites managed files intentionally
- only tracked scaffold files are refreshed

This is designed to make re-running the kit safe in real repositories.

## Status Output

`codex-kit status` reports:

- current installed version
- managed file count
- missing managed files
- locally modified managed files
- outdated managed files compared with the current template

## Local Development

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run the CLI locally:

```bash
node ./bin/codex-kit.js init --path ./tmp-codex-kit-test
node ./bin/codex-kit.js status --path ./tmp-codex-kit-test
node ./bin/codex-kit.js update --path ./tmp-codex-kit-test
```

## Smoke Test

Recommended manual validation flow:

1. Initialize a temporary project.
2. Confirm `.agents/skills`, `.agents/workflows`, `.agents/.shared`, and `.codex/agents` exist.
3. Run the `ui-ux-pro-max` search script in the generated project.
4. Run `codex-kit status` against the generated project.

Example:

```bash
node ./bin/codex-kit.js init --path ./tmp-codex-kit-test
python3 ./tmp-codex-kit-test/.agents/.shared/ui-ux-pro-max/scripts/search.py "saas dashboard" --domain product
node ./bin/codex-kit.js status --path ./tmp-codex-kit-test
```

## Package Contents

The published npm package includes:

- `bin/`
- `src/`
- `templates/`
- `.codex-plugin/`
- `README.md`

The scaffold is the main shipped artifact. The CLI exists to install, inspect, and refresh that scaffold safely.
