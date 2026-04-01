# Codex Kit

Codex-native starter kit for teams that want a reusable project scaffold with:

- a project-level `AGENTS.md`
- a large shipped skill catalog
- workflow playbooks
- focused subagents
- MCP-ready config
- shared tool packages such as `ui-ux-pro-max`

The goal is to make `codex-kit init` produce a repository that Codex can use immediately without every team having to rebuild the same routing, skills, and conventions from scratch.

## What This Repo Contains

This repository has two important layers:

1. The CLI and scaffold source
- `src/`, `bin/`, and `templates/project/`
- this is what powers `codex-kit init`, `update`, and `status`

2. The plugin-facing catalog
- `.codex-plugin/plugin.json`
- it points at the scaffold skill catalog so the shipped plugin view and the scaffold stay aligned

The source of truth for the shipped skill catalog is:

- [templates/project/.agents/skills](/Users/daominhhiep/Desktop/Extension/CodexKit/templates/project/.agents/skills)

Do not treat a separate root `skills/` directory as canonical. The scaffold is the product.

## Quick Install

Use `npx`:

```bash
npx @daominhhiep/codex-kit init
```

Or install globally:

```bash
npm install -g @daominhhiep/codex-kit
codex-kit init
```

Initialize into a target directory:

```bash
npx @daominhhiep/codex-kit init --path ./my-project
```

## CLI Commands

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

codex-kit status --path ./my-project
```

## Scaffold Layout

`codex-kit init` writes a Codex-first project layout:

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

### Layer Responsibilities

#### `AGENTS.md`

Repository-level routing contract.

It explains:

- how to classify tasks
- which workflow to use
- which subagent to choose
- which skills are good pairings for each role

#### `.agents/skills/`

Knowledge modules in Codex `SKILL.md` format.

The scaffold ships a larger curated catalog that has been normalized for Codex-oriented use. This includes areas such as:

- implementation quality
- frontend and backend work
- database design
- testing
- performance
- security
- SEO and GEO
- mobile
- MCP building

#### `.agents/workflows/`

Process playbooks for common task shapes such as:

- brainstorming
- planning
- creating
- enhancing
- debugging
- reviewing
- checking
- verifying
- testing
- deployment
- orchestration
- preview and status
- UI/UX design direction

Workflows encode process, not domain knowledge.

#### `.agents/.shared/`

Shared packages for script-and-data tooling that does not naturally belong to a single skill.

The default scaffold includes:

- `.agents/.shared/ui-ux-pro-max/`

This package contains:

- CSV datasets for styles, colors, typography, landing patterns, UX guidance, and stack-specific recommendations
- Python scripts for search and design-system generation

#### `.codex/agents/`

Focused subagents defined as `.toml` files.

The scaffold now ships an expanded set of agents, including:

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

Each agent stays relatively small on purpose:

- role definition lives in `.toml`
- domain knowledge lives in skills
- process lives in workflows
- routing lives in `AGENTS.md`

#### `.codex/config.toml`

Project-scoped Codex configuration.

The scaffold includes:

- top-level `model`, `model_reasoning_summary`, `approval_policy`, `sandbox_mode`
- `[agents]` settings
- `[mcp_servers]` section
- preconfigured `context7` MCP entry

#### `.codex-kit/manifest.json`

Managed-file manifest used by the CLI.

It tracks:

- file path
- template hash
- installed hash
- install version

This powers:

- `status`
- safe `update`
- detection of missing or locally modified managed files

## Included by Default

The current scaffold includes:

- root routing docs: `AGENTS.md`, `ARCHITECTURE.md`, `AGENT_FLOW.md`
- expanded skill catalog in `.agents/skills`
- workflow catalog in `.agents/workflows`
- shared `ui-ux-pro-max` package in `.agents/.shared`
- expanded subagent catalog in `.codex/agents`
- MCP-ready project config in `.codex/config.toml`
- managed-file tracking in `.codex-kit/manifest.json`

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

The config also contains commented examples for:

- additional remote HTTP MCP servers
- local stdio MCP servers

## UI/UX Pro Max

The scaffold includes a shared `ui-ux-pro-max` package instead of only a workflow stub.

Example commands inside a scaffolded project:

```bash
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "saas dashboard" --domain product
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "fintech landing" --design-system -p "Fintech App"
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "dashboard layout" --stack nextjs
```

This is useful for:

- design direction work
- design-system generation
- stack-aware frontend guidance
- UX and visual decision support

## Why The Subagents Are Intentionally Short

Long-form agent files often bundle:

- persona
- domain doctrine
- anti-patterns
- checklists
- workflow rules
- skill mapping

Codex Kit keeps those concerns separated:

- subagents define execution role
- skills define domain knowledge
- workflows define process
- `AGENTS.md` defines routing and preferred skill pairings

This reduces duplication and keeps maintenance tractable as the catalog grows.

## Source of Truth Rules

To avoid drift:

- `templates/project/.agents/skills` is the canonical shipped skill catalog
- `.codex-plugin/plugin.json` points at the template skill catalog
- tests validate scaffold contents instead of assuming a separate mirrored root catalog

When changing the product, update the scaffold first.

## Local Development

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run the CLI locally without global install:

```bash
node ./bin/codex-kit.js init --path ./tmp-codex-kit-test
```

## Testing The Scaffold

Recommended smoke test flow:

1. Initialize a temporary project.
2. Confirm `.agents/skills`, `.agents/workflows`, `.agents/.shared`, and `.codex/agents` exist.
3. Run the `ui-ux-pro-max` search script in the generated project.
4. Open Codex in that project and verify:
   - config loads
   - skills are visible
   - subagents can be invoked
   - workflow docs are present

Example:

```bash
node ./bin/codex-kit.js init --path ./tmp-codex-kit-test
python3 ./tmp-codex-kit-test/.agents/.shared/ui-ux-pro-max/scripts/search.py "saas dashboard" --domain product
```

## How `update` Behaves

`codex-kit update` is manifest-aware.

That means:

- missing managed files are detectable
- locally modified managed files are skipped unless `--force` is passed
- only tracked scaffold files are considered for refresh

This is intentional. The kit should be safe to re-run in real repositories.

## Packaging Notes

This package includes:

- `bin/`
- `src/`
- `templates/`
- `.codex-plugin/`
- `scripts/`
- `README.md`

The scaffold itself is the important shipped artifact. The rest of the repository exists to build, test, and maintain that scaffold.
