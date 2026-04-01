import path from "node:path";
import { sha256 } from "./hash.js";
import { readText, walkFiles } from "./fs.js";

export async function loadTemplateFiles(templateRoot) {
  const files = await walkFiles(templateRoot);
  const templates = [];

  for (const absolutePath of files) {
    const relativePath = path.relative(templateRoot, absolutePath);
    const content = await readText(absolutePath);
    templates.push({
      relativePath,
      content,
      templateHash: sha256(content)
    });
  }

  return templates.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}
