import { allPages, docSections, type DocPage, type DocSection } from "../content";

export const DEFAULT_PAGE = "introduction";

export type AppRoute =
  | {
      view: "landing";
    }
  | {
      view: "docs";
      slug: string;
    };

export function getRouteFromHash(): AppRoute {
  const hash = window.location.hash.replace(/^#\/?/, "").trim();

  if (!hash) {
    return { view: "landing" };
  }

  const [head, tail] = hash.split("/");

  if (head === "docs") {
    return { view: "docs", slug: tail || DEFAULT_PAGE };
  }

  return { view: "docs", slug: head || DEFAULT_PAGE };
}

export function navigateToLanding() {
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function navigateToDoc(slug: string) {
  window.location.hash = `/docs/${slug}`;
}

export function filterSections(query: string): DocSection[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return docSections;
  }

  return docSections
    .map((section) => ({
      ...section,
      pages: section.pages.filter((page) => {
        const haystack = `${page.title} ${page.summary} ${page.section}`.toLowerCase();
        return haystack.includes(needle);
      })
    }))
    .filter((section) => section.pages.length > 0);
}

export function findPage(slug: string): DocPage | null {
  return allPages.find((item) => item.slug === slug) ?? null;
}

export function getPageNeighbors(slug: string) {
  const currentIndex = allPages.findIndex((item) => item.slug === slug);

  return {
    previousPage: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    nextPage: currentIndex >= 0 && currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null
  };
}
