# Codex Kit

[![npm version](https://img.shields.io/npm/v/@daominhhiep/codex-kit.svg)](https://www.npmjs.com/package/@daominhhiep/codex-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Codex-native starter kit with scaffolded docs, skills, workflows, agents, plugin support, and local skill management.

**[Official Website](https://codexkit.xyz/)** | **[Web Docs](https://codexkit.xyz/#/docs/introduction)** | **[Unikorn](https://unikorn.vn/p/codex-kit)**

Codex Kit helps you bootstrap a repository that already knows how to work with Codex.

Instead of rebuilding the same operating layer in every project, you get a ready-to-use scaffold with routing docs, a shipped skill catalog, workflow playbooks, focused subagents, Codex config, and update/status commands.

## Quick Install

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

## What You Get

- root routing docs: `AGENTS.md`, `ARCHITECTURE.md`, `AGENT_FLOW.md`
- 40+ shipped skills in `.agents/skills`
- 15 workflow playbooks in `.agents/workflows`
- 16 focused subagents in `.codex/agents`
- shared UI/UX data and scripts in `.agents/.shared`
- project-scoped Codex config in `.codex/config.toml`
- managed-file tracking in `.codex-kit/manifest.json`

## CLI

```bash
codex-kit init
codex-kit update
codex-kit setup-codex
codex-kit sync-codex
codex-kit list-skills
codex-kit search-skills frontend
codex-kit list-installed-skills
codex-kit status
codex-kit install-skills
codex-kit sync-skills
codex-kit remove-skills --skills clean-code,planning
```

Common examples:

```bash
codex-kit list-skills
codex-kit search-skills frontend
codex-kit list-installed-skills

codex-kit init --install-plugin
codex-kit init --path ./my-project

codex-kit setup-codex
codex-kit sync-codex

codex-kit install-skills
codex-kit install-skills --skills clean-code,planning
codex-kit sync-skills --skills clean-code,planning
codex-kit remove-skills --skills clean-code,planning
```

## Codex Integration

Codex Kit ships with a local Codex plugin scaffold:

- plugin manifest: `plugins/codex-kit/.codex-plugin/plugin.json`
- plugin skill: `plugins/codex-kit/skills/codex-kit/SKILL.md`
- local marketplace support via `.agents/plugins/marketplace.json`

There are two different installation scopes:

- project-local: the plugin is copied into the current repository with `init --install-plugin`
- user-local: the shipped skill catalog is installed into `${CODEX_HOME:-~/.codex}/skills` with `install-skills`

To scaffold a project and include the plugin:

```bash
npx @daominhhiep/codex-kit init --install-plugin
```

To do the full local setup in one go for the current repository:

```bash
npx @daominhhiep/codex-kit setup-codex
```

After upgrading Codex Kit, sync both the workspace plugin and local shipped skills:

```bash
npx @daominhhiep/codex-kit sync-codex
```

To install the shipped skills into local Codex:

```bash
npx @daominhhiep/codex-kit install-skills
```

By default, local skills are installed into:

```text
${CODEX_HOME:-~/.codex}/skills
```

To browse or search the shipped catalog:

```bash
npx @daominhhiep/codex-kit list-skills
npx @daominhhiep/codex-kit search-skills frontend
npx @daominhhiep/codex-kit list-installed-skills
```

The bundled plugin can also help map natural requests such as "cài skill frontend" or "liệt kê skills debug" to the right Codex Kit commands.

## Requirements

- Node.js `>=20`

## Documentation

- [Introduction](https://codexkit.xyz/#/docs/introduction)
- [Installation](https://codexkit.xyz/#/docs/installation)
- [Local Codex Setup](https://codexkit.xyz/#/docs/local-codex-setup)
- [CLI Reference](https://codexkit.xyz/#/docs/commands-and-options)

## License

MIT
