import { mkdir, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  initProject,
  installLocalSkills,
  listInstalledLocalSkills,
  removeLocalSkills,
  statusProject,
  syncLocalSkills,
  updateProject
} from "./lib/kit.js";
import {
  getSelectedShippedSkills,
  groupSkillsByCategory,
  searchShippedSkills
} from "./lib/skills.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, "../package.json");

function printHelp() {
  console.log(`Usage: codex-kit <command> [options]

Commands:
  init      Install the Codex project scaffold
  update    Refresh kit-managed files
  setup-codex
            Scaffold the plugin into the workspace and install shipped skills locally
  sync-codex
            Sync the workspace plugin and local shipped skills after upgrading Codex Kit
  list-skills
            List shipped Codex Kit skills grouped by category
  search-skills <query>
            Search shipped Codex Kit skills by name, description, or category
  list-installed-skills
            List shipped Codex Kit skills currently installed in local Codex
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
    positionals: [],
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
      if (arg.startsWith("-")) {
        throw new Error(`Unknown option: ${arg}`);
      }
      options.positionals.push(arg);
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

  if (options.command === "setup-codex") {
    const initResult = await initProject({
      targetDir: options.path,
      templateRoot,
      pluginRoot,
      version,
      installPlugin: true,
      force: options.force,
      dryRun: options.dryRun
    });
    const skillsResult = await installLocalSkills({
      skillsRoot,
      codexHome: options.codexHome,
      skills: options.skills,
      force: options.force,
      dryRun: options.dryRun
    });

    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned Codex setup for ${options.path}`
          : `Completed Codex setup for ${options.path}`
      );
      console.log(
        options.dryRun
          ? `Planned ${initResult.written.length} workspace file writes`
          : `Workspace scaffold ready${initResult.pluginInstalled ? " with plugin support" : ""}`
      );
      console.log(
        options.dryRun
          ? `Planned ${skillsResult.written.length} local skill file writes in ${skillsResult.targetDir}`
          : `Installed shipped skills into ${skillsResult.targetDir}`
      );
      console.log("\nNext steps:");
      console.log(`  1. Open Codex in ${options.path}`);
      console.log("  2. Open Plugins and choose `Codex Kit Local`.");
      console.log("  3. Click `+` on `Codex Kit` to install the workspace plugin.");
      console.log("  4. Start a new thread and use `@Codex Kit` or any installed local skills.");
    }
    return;
  }

  if (options.command === "sync-codex") {
    const updateResult = await updateProject({
      targetDir: options.path,
      templateRoot,
      pluginRoot,
      version,
      installPlugin: true,
      force: options.force,
      dryRun: options.dryRun
    });
    const skillsResult = await syncLocalSkills({
      skillsRoot,
      codexHome: options.codexHome,
      skills: options.skills,
      dryRun: options.dryRun
    });

    if (!options.quiet) {
      console.log(
        options.dryRun
          ? `Planned Codex sync for ${options.path}`
          : `Synced Codex setup for ${options.path}`
      );
      console.log(
        options.dryRun
          ? `Planned ${updateResult.written.length} workspace file updates`
          : `Workspace scaffold and plugin synced`
      );
      console.log(
        options.dryRun
          ? `Planned ${skillsResult.written.length} local skill file syncs in ${skillsResult.targetDir}`
          : `Local shipped skills synced into ${skillsResult.targetDir}`
      );
      if (updateResult.skipped.length > 0) {
        console.log(`Skipped ${updateResult.skipped.length} locally modified workspace files`);
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

  if (options.command === "list-skills") {
    const skills = await getSelectedShippedSkills({ skillsRoot, skills: options.skills });
    const grouped = groupSkillsByCategory(skills);

    console.log(`Shipped Codex Kit skills: ${skills.length}`);
    for (const group of grouped) {
      console.log(`\n${group.category}`);
      for (const skill of group.skills) {
        console.log(`  - ${skill.name}: ${skill.summary}`);
        console.log(`    install: codex-kit install-skills --skills ${skill.name}`);
      }
    }
    return;
  }

  if (options.command === "search-skills") {
    const query = options.positionals.join(" ").trim();
    if (!query) {
      throw new Error("`search-skills` requires a search query.");
    }

    const results = await searchShippedSkills({ skillsRoot, query });
    if (results.length === 0) {
      console.log(`No shipped skills matched "${query}".`);
      return;
    }

    console.log(`Matches for "${query}": ${results.length}`);
    for (const skill of results) {
      console.log(`\n- ${skill.name} [${skill.category}]`);
      console.log(`  ${skill.summary}`);
      console.log(`  install: codex-kit install-skills --skills ${skill.name}`);
    }
    return;
  }

  if (options.command === "list-installed-skills") {
    const result = await listInstalledLocalSkills({
      skillsRoot,
      codexHome: options.codexHome
    });
    const grouped = groupSkillsByCategory(result.installed);

    console.log(`Installed Codex Kit skills in ${result.targetRoot}: ${result.installed.length}`);
    if (result.installed.length === 0) {
      console.log("No shipped Codex Kit skills are currently installed.");
      return;
    }

    for (const group of grouped) {
      console.log(`\n${group.category}`);
      for (const skill of group.skills) {
        console.log(`  - ${skill.name}: ${skill.summary}`);
      }
    }

    if (result.missing.length > 0) {
      console.log(`\nMissing from local Codex: ${result.missing.length}`);
      console.log("  Run `codex-kit install-skills` to install the full shipped catalog.");
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
      skillsRoot,
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
