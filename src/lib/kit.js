import path from "node:path";
import { pathExists, readText, writeText } from "./fs.js";
import { sha256 } from "./hash.js";
import { MANIFEST_PATH, readManifest, writeManifest } from "./manifest.js";
import { loadTemplateFiles } from "./templates.js";

function buildManifest(version, files) {
  return {
    version,
    managedAt: new Date().toISOString(),
    files
  };
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

async function getCurrentHash(filePath) {
  if (!(await pathExists(filePath))) {
    return null;
  }
  return sha256(await readText(filePath));
}

export async function initProject({
  targetDir,
  templateRoot,
  version,
  force = false,
  dryRun = false
}) {
  const templates = await loadTemplateFiles(templateRoot);
  const written = [];
  const skipped = [];
  const manifestFiles = [];

  for (const template of templates) {
    const destination = path.join(targetDir, template.relativePath);
    const exists = await pathExists(destination);

    if (exists && !force) {
      skipped.push(template.relativePath);
      manifestFiles.push({
        path: normalizePath(template.relativePath),
        templateHash: template.templateHash,
        installedHash: await getCurrentHash(destination)
      });
      continue;
    }

    if (!dryRun) {
      await writeText(destination, template.content);
    }

    written.push(template.relativePath);
    manifestFiles.push({
      path: normalizePath(template.relativePath),
      templateHash: template.templateHash,
      installedHash: template.templateHash
    });
  }

  if (!dryRun) {
    await writeManifest(targetDir, buildManifest(version, manifestFiles));
  }

  return { written, skipped };
}

export async function updateProject({
  targetDir,
  templateRoot,
  version,
  force = false,
  dryRun = false
}) {
  const existingManifest = await readManifest(targetDir);
  if (!existingManifest) {
    throw new Error("No Codex Kit manifest found. Run `codex-kit init` first.");
  }

  const manifestByPath = new Map(existingManifest.files.map((file) => [file.path, file]));
  const templates = await loadTemplateFiles(templateRoot);
  const written = [];
  const skipped = [];
  const nextManifestFiles = [];

  for (const template of templates) {
    const relativePath = normalizePath(template.relativePath);
    const destination = path.join(targetDir, template.relativePath);
    const currentHash = await getCurrentHash(destination);
    const previous = manifestByPath.get(relativePath);
    const isLocallyModified =
      currentHash !== null &&
      previous &&
      previous.installedHash &&
      currentHash !== previous.installedHash;

    if (isLocallyModified && !force) {
      skipped.push(relativePath);
      nextManifestFiles.push({
        path: relativePath,
        templateHash: template.templateHash,
        installedHash: previous.installedHash
      });
      continue;
    }

    if (!dryRun) {
      await writeText(destination, template.content);
    }

    written.push(relativePath);
    nextManifestFiles.push({
      path: relativePath,
      templateHash: template.templateHash,
      installedHash: template.templateHash
    });
  }

  if (!dryRun) {
    await writeManifest(targetDir, buildManifest(version, nextManifestFiles));
  }

  return { written, skipped };
}

export async function statusProject({ targetDir, templateRoot, version }) {
  const manifest = await readManifest(targetDir);
  const templates = await loadTemplateFiles(templateRoot);
  const templateByPath = new Map(
    templates.map((template) => [normalizePath(template.relativePath), template])
  );

  if (!manifest) {
    return {
      version,
      managedCount: templates.length,
      missing: templates.map((template) => normalizePath(template.relativePath)),
      modified: [],
      outdated: []
    };
  }

  const missing = [];
  const modified = [];
  const outdated = [];

  for (const file of manifest.files) {
    const destination = path.join(targetDir, file.path);
    const currentHash = await getCurrentHash(destination);
    const template = templateByPath.get(file.path);
    if (currentHash === null) {
      missing.push(file.path);
      continue;
    }
    if (file.installedHash && currentHash !== file.installedHash) {
      modified.push(file.path);
    }
    if (template && file.templateHash !== template.templateHash) {
      outdated.push(file.path);
    }
  }

  return {
    version: manifest.version || version,
    managedCount: manifest.files.length,
    missing,
    modified,
    outdated
  };
}

export { MANIFEST_PATH };
