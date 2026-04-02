import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { AppShell, resolvePageForRoute } from "../src/AppShell";
import { allPages } from "../src/content";
import { type AppRoute, getRoutePath } from "../src/docs/navigation";
import { getSeoPayload, type SeoPayload } from "../src/seo";

const distDir = path.resolve("dist");
const templatePath = path.join(distDir, "index.html");
const template = await readFile(templatePath, "utf8");

const routes: AppRoute[] = [
  { view: "landing" },
  ...allPages.map((page) => ({ view: "docs", slug: page.slug } as const))
];

for (const route of routes) {
  const page = resolvePageForRoute(route);
  const markup = renderToString(
    <AppShell route={route} query="" onQueryChange={() => undefined} />
  );
  const seo = getSeoPayload(route, page);
  const html = applyStaticSeo(injectMarkup(template, markup), seo);
  const outputPath = getOutputPath(route);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap(routes), "utf8");

function getOutputPath(route: AppRoute) {
  if (route.view === "landing") {
    return path.join(distDir, "index.html");
  }

  const segments = getRoutePath(route).split("/").filter(Boolean);
  return path.join(distDir, ...segments, "index.html");
}

function injectMarkup(html: string, markup: string) {
  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

function applyStaticSeo(html: string, seo: SeoPayload) {
  let nextHtml = html;

  nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  nextHtml = replaceMeta(nextHtml, "name", "description", seo.description);
  nextHtml = replaceMeta(nextHtml, "name", "keywords", seo.keywords);
  nextHtml = replaceMeta(nextHtml, "name", "robots", seo.robots);
  nextHtml = replaceMeta(nextHtml, "property", "og:type", seo.type);
  nextHtml = replaceMeta(nextHtml, "property", "og:title", seo.title);
  nextHtml = replaceMeta(nextHtml, "property", "og:description", seo.description);
  nextHtml = replaceMeta(nextHtml, "property", "og:url", seo.url);
  nextHtml = replaceMeta(nextHtml, "name", "twitter:title", seo.title);
  nextHtml = replaceMeta(nextHtml, "name", "twitter:description", seo.description);
  nextHtml = nextHtml.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${seo.url}" />`
  );
  nextHtml = nextHtml.replace(
    /<script id="codex-kit-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="codex-kit-jsonld" type="application/ld+json">${JSON.stringify(seo.schema)}</script>`
  );

  return nextHtml;
}

function replaceMeta(html: string, attribute: "name" | "property", key: string, value: string) {
  const escapedKey = escapeRegExp(key);
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${escapedKey}"\\s+content="[^"]*"\\s*\\/>`
  );

  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
}

function buildSitemap(routes: AppRoute[]) {
  const urls = routes.map((route) => `https://codexkit.xyz${getRoutePath(route)}`);
  const body = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === "https://codexkit.xyz/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
