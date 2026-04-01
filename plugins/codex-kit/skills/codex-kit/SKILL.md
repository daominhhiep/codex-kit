---
name: codex-kit
description: Use the Codex Kit CLI to initialize, update, or inspect a Codex-ready project scaffold in the current workspace.
---

# Codex Kit

Use this skill when the user wants to bootstrap or maintain the Codex Kit scaffold.

## Commands

- `npx @daominhhiep/codex-kit init` to initialize the scaffold in the current repository.
- `npx @daominhhiep/codex-kit update` to refresh managed files from the shipped template.
- `npx @daominhhiep/codex-kit setup-codex` to scaffold the plugin into the workspace and install shipped skills locally.
- `npx @daominhhiep/codex-kit sync-codex` to sync the workspace plugin and local shipped skills after upgrading Codex Kit.
- `npx @daominhhiep/codex-kit list-skills` to list all shipped skills grouped by category.
- `npx @daominhhiep/codex-kit search-skills frontend` to search shipped skills by query.
- `npx @daominhhiep/codex-kit list-installed-skills` to show which shipped skills are already installed in local Codex.
- `npx @daominhhiep/codex-kit status` to inspect managed-file state.
- `npx @daominhhiep/codex-kit install-skills` to copy the shipped Codex Kit skills into local Codex.
- `npx @daominhhiep/codex-kit sync-skills` to overwrite local Codex skills with the shipped Codex Kit version.
- `npx @daominhhiep/codex-kit remove-skills --skills clean-code,planning` to remove specific Codex Kit skills from local Codex.

## Rules

- Run commands from the repository root unless the user gives a different target path.
- Use `npx @daominhhiep/codex-kit ...` so the plugin works as a standalone published package.
- Before `update`, inspect current status so local modifications to managed files are visible.

## Intent Mapping

- If the user asks to list available skills, run `npx @daominhhiep/codex-kit list-skills`.
- If the user asks to search skills by topic, run `npx @daominhhiep/codex-kit search-skills <query>`.
- If the user asks to install a skill by name, run `npx @daominhhiep/codex-kit install-skills --skills <name>`.
- If the user asks to install a skill by topic such as `frontend`, `debug`, or `seo`, search first, then either:
  - show matching skills with install commands, or
  - install the exact skill only if the request clearly names one skill.
- If the user asks to list installed local skills, run `npx @daominhhiep/codex-kit list-installed-skills`.
- If the user asks to update both the workspace plugin and local skills, run `npx @daominhhiep/codex-kit sync-codex`.
- If the user asks for initial full setup in the current repository, run `npx @daominhhiep/codex-kit setup-codex`.

## Natural Language Examples

- `liệt kê skills debug` -> `npx @daominhhiep/codex-kit search-skills debug`
- `cài skill frontend-design` -> `npx @daominhhiep/codex-kit install-skills --skills frontend-design`
- `cài skill frontend` -> search first, then suggest exact matches such as `frontend-design`, `nextjs-react-expert`, or `tailwind-patterns`
- `xem local codex đã cài skill gì` -> `npx @daominhhiep/codex-kit list-installed-skills`
- `đồng bộ lại plugin và skills` -> `npx @daominhhiep/codex-kit sync-codex`

## Output

- Explain which command you ran.
- Summarize which managed files were created, updated, or already up to date.
