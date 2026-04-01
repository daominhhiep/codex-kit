import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initProject, statusProject, updateProject } from "./lib/kit.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, "../package.json");

function printHelp() {
  console.log(`Usage: codex-kit <command> [options]

Commands:
  init      Install the Codex project scaffold
  update    Refresh kit-managed files
  status    Show installation status

Options:
  --path <dir>   Target directory (default: current working directory)
  --force        Overwrite existing or locally modified managed files
  --dry-run      Preview file operations without writing
  --quiet        Suppress non-essential output
  -h, --help     Show this help
`);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const options = {
    command,
    force: false,
    dryRun: false,
    quiet: false,
    path: process.cwd()
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    if (arg === "--force") {
      options.force = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--quiet") {
      options.quiet = true;
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

  await mkdir(options.path, { recursive: true });

  if (options.command === "init") {
    const result = await initProject({
      targetDir: options.path,
      templateRoot,
      version,
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
    }
    return;
  }

  if (options.command === "update") {
    const result = await updateProject({
      targetDir: options.path,
      templateRoot,
      version,
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
    }
    return;
  }

  if (options.command === "status") {
    const result = await statusProject({
      targetDir: options.path,
      templateRoot,
      version
    });
    console.log(`Version: ${result.version}`);
    console.log(`Managed files: ${result.managedCount}`);
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

  throw new Error(`Unknown command: ${options.command}`);
}
