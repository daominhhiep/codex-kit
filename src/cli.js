import { mkdir, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  initProject,
  installLocalSkills,
  removeLocalSkills,
  statusProject,
  syncLocalSkills,
  updateProject
} from "./lib/kit.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, "../package.json");

function printHelp() {
  console.log(`Usage: codex-kit <command> [options]

Commands:
  init      Install the Codex project scaffold
  update    Refresh kit-managed files
  install-skills
            Install the shipped Codex Kit skills into local Codex
  sync-skills
            Overwrite local Codex skills with the shipped Codex Kit version
  remove-skills
            Remove Codex Kit skills from local Codex
  status    Show installation status

Options:
  --path <dir>   Target directory (default: current working directory)
  --codex-home <dir>
                 Codex home directory for local skill installation
  --skills <list>
                 Comma-separated skill names for install/sync/remove
  --install-plugin
                 Install the Codex Kit plugin into the target workspace
  --force        Overwrite existing or locally modified managed files
  --dry-run      Preview file operations without writing
  --quiet        Suppress non-essential output
  -h, --help     Show this help
`);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const options = {
    command: command === "-h" || command === "--help" ? undefined : command,
    force: false,
    dryRun: false,
    quiet: false,
    installPlugin: false,
    codexHome: process.env.CODEX_HOME || path.join(os.homedir(), ".codex"),
    skills: [],
    path: process.cwd()
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    if (arg === "--force") {
      options.force = true;
    } else if (arg === "--install-plugin") {
      options.installPlugin = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--quiet") {
      options.quiet = true;
    } else if (arg === "--skills") {
      const value = rest[index + 1];
      if (!value) {
        throw new Error("Missing value for --skills");
      }
      options.skills = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      index += 1;
    } else if (arg === "--codex-home") {
      const value = rest[index + 1];
      if (!value) {
        throw new Error("Missing value for --codex-home");
      }
      options.codexHome = path.resolve(value);
      index += 1;
    } else if (arg === "--path") {
      const value = rest[index + 1];
      if (!value) {
        throw new Error("Missing value for --path");
      }
      options.path = path.resolve(value);
      index += 1;
    } else if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

async function getPackageVersion() {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  return packageJson.version;
}

export async function runCli(argv) {
  const options = parseArgs(argv);
  if (!options.command || options.help) {
    printHelp();
    return;
  }

  const version = await getPackageVersion();
  const templateRoot = path.resolve(__dirname, "../templates/project");
  const skillsRoot = path.resolve(templateRoot, ".agents/skills");
  const pluginRoot = path.resolve(__dirname, "../plugins/codex-kit");

  await mkdir(options.path, { recursive: true });

  if (options.command === "init") {
    const result = await initProject({
      targetDir: options.path,
      templateRoot,
      pluginRoot,
      version,
      installPlugin: options.installPlugin,
      force: options.force,
      dryRun: options.dryRun
    });
    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned ${result.written.length} file writes in ${options.path}`
          : `Installed Codex Kit into ${options.path}`
      );
      if (result.skipped.length > 0) {
        console.log(`Skipped ${result.skipped.length} existing files`);
      }
      if (result.pluginInstalled) {
        console.log(
          options.dryRun
            ? "Planned Codex Kit plugin install for this workspace"
            : "Installed Codex Kit plugin into this workspace"
        );
      }
    }
    return;
  }

  if (options.command === "update") {
    const result = await updateProject({
      targetDir: options.path,
      templateRoot,
      pluginRoot,
      version,
      installPlugin: options.installPlugin,
      force: options.force,
      dryRun: options.dryRun
    });
    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned ${result.written.length} file updates in ${options.path}`
          : `Updated Codex Kit files in ${options.path}`
      );
      if (result.skipped.length > 0) {
        console.log(`Skipped ${result.skipped.length} locally modified files`);
      }
      if (result.pluginInstalled) {
        console.log(
          options.dryRun
            ? "Planned Codex Kit plugin sync for this workspace"
            : "Synced Codex Kit plugin into this workspace"
        );
      }
    }
    return;
  }

  if (options.command === "status") {
    const result = await statusProject({
      targetDir: options.path,
      templateRoot,
      pluginRoot,
      version
    });
    console.log(`Version: ${result.version}`);
    console.log(`Managed files: ${result.managedCount}`);
    console.log(`Plugin installed: ${result.pluginInstalled ? "yes" : "no"}`);
    console.log(`Missing files: ${result.missing.length}`);
    console.log(`Modified files: ${result.modified.length}`);
    console.log(`Outdated files: ${result.outdated.length}`);
    if (result.missing.length > 0) {
      console.log("\nMissing:");
      for (const file of result.missing) {
        console.log(`  - ${file}`);
      }
    }
    if (result.modified.length > 0) {
      console.log("\nModified:");
      for (const file of result.modified) {
        console.log(`  - ${file}`);
      }
    }
    if (result.outdated.length > 0) {
      console.log("\nOutdated:");
      for (const file of result.outdated) {
        console.log(`  - ${file}`);
      }
    }
    return;
  }

  if (options.command === "install-skills") {
    const result = await installLocalSkills({
      skillsRoot,
      codexHome: options.codexHome,
      skills: options.skills,
      force: options.force,
      dryRun: options.dryRun
    });
    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned ${result.written.length} local skill file writes in ${result.targetDir}`
          : `Installed Codex Kit skills into ${result.targetDir}`
      );
      if (result.skipped.length > 0) {
        console.log(`Skipped ${result.skipped.length} existing local skill files`);
      }
    }
    return;
  }

  if (options.command === "sync-skills") {
    const result = await syncLocalSkills({
      skillsRoot,
      codexHome: options.codexHome,
      skills: options.skills,
      dryRun: options.dryRun
    });
    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned ${result.written.length} local skill file syncs in ${result.targetDir}`
          : `Synced Codex Kit skills into ${result.targetDir}`
      );
      if (result.skipped.length > 0) {
        console.log(`Skipped ${result.skipped.length} local skill files`);
      }
    }
    return;
  }

  if (options.command === "remove-skills") {
    if (options.skills.length === 0) {
      throw new Error("`remove-skills` requires `--skills <name[,name...]>`.");
    }

    const result = await removeLocalSkills({
      codexHome: options.codexHome,
      skills: options.skills,
      dryRun: options.dryRun
    });
    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned removal of ${result.removed.length} skills from ${result.targetDir}`
          : `Removed ${result.removed.length} skills from ${result.targetDir}`
      );
      if (result.skipped.length > 0) {
        console.log(`Skipped ${result.skipped.length} missing skills`);
      }
    }
    return;
  }

  throw new Error(`Unknown command: ${options.command}`);
}
