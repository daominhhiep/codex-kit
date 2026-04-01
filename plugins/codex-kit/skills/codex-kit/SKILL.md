---
name: codex-kit
description: Use the Codex Kit CLI to initialize, update, or inspect a Codex-ready project scaffold in the current workspace.
---

# Codex Kit

Use this skill when the user wants to bootstrap or maintain the Codex Kit scaffold.

## Commands

- `npx @daominhhiep/codex-kit init` to initialize the scaffold in the current repository.
- `npx @daominhhiep/codex-kit update` to refresh managed files from the shipped template.
- `npx @daominhhiep/codex-kit status` to inspect managed-file state.
- `npx @daominhhiep/codex-kit install-skills` to copy the shipped Codex Kit skills into local Codex.
- `npx @daominhhiep/codex-kit sync-skills` to overwrite local Codex skills with the shipped Codex Kit version.
- `npx @daominhhiep/codex-kit remove-skills --skills clean-code,planning` to remove specific Codex Kit skills from local Codex.

## Rules

- Run commands from the repository root unless the user gives a different target path.
- Use `npx @daominhhiep/codex-kit ...` so the plugin works as a standalone published package.
- Before `update`, inspect current status so local modifications to managed files are visible.

## Output

- Explain which command you ran.
- Summarize which managed files were created, updated, or already up to date.
