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

export function getRouteFromLocation(pathname = window.location.pathname): AppRoute {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { view: "landing" };
  }

  const [head, tail] = segments;

  if (head === "docs") {
    return { view: "docs", slug: tail || DEFAULT_PAGE };
  }

  return { view: "landing" };
}

export function getRoutePath(route: AppRoute): string {
  if (route.view === "landing") {
    return "/";
  }

  return getDocPath(route.slug);
}

export function getDocPath(slug: string) {
  return `/docs/${slug}`;
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
