import { useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { allPages, type DocPage } from "./content";
import { DocsFooter } from "./components/DocsFooter";
import { DocsHeader } from "./components/DocsHeader";
import { DocsPageContent } from "./components/DocsPageContent";
import { DocsSidebar } from "./components/DocsSidebar";
import { DocsToc } from "./components/DocsToc";
import { LandingPage } from "./components/LandingPage";
import {
  DEFAULT_PAGE,
  filterSections,
  findPage,
  getRouteFromHash,
  getPageNeighbors,
  navigateToDoc,
  navigateToLanding
} from "./docs/navigation";

function App() {
  const [route, setRoute] = useState(() => getRouteFromHash());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);

    if (!window.location.hash) {
      navigateToLanding();
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const filteredSections = useMemo(() => filterSections(query), [query]);
  const resolvedPage = route.view === "docs" ? findPage(route.slug) : findPage(DEFAULT_PAGE);
  const page = resolvedPage ?? createNotFoundPage(route.view === "docs" ? route.slug : DEFAULT_PAGE);
  const { previousPage, nextPage } = resolvedPage ? getPageNeighbors(resolvedPage.slug) : { previousPage: null, nextPage: allPages[0] ?? null };

  useEffect(() => {
    if (route.view === "docs") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [route.view, page.slug]);

  const navigate = (nextSlug: string) => navigateToDoc(nextSlug);
  const isDocsView = route.view === "docs";

  return (
    <>
      <div className="min-h-screen bg-docs text-docs-text">
        <DocsHeader
          query={query}
          onQueryChange={setQuery}
          onHomeClick={navigateToLanding}
          onDocsClick={() => navigate(DEFAULT_PAGE)}
          isDocsView={isDocsView}
        />

        {isDocsView ? (
          <>
            <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_260px]">
              <DocsSidebar currentSlug={page.slug} sections={filteredSections} onNavigate={navigate} />

              <main className="min-w-0 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
                <DocsPageContent
                  page={page}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  onNavigate={navigate}
                />
              </main>

              <DocsToc page={page} />
            </div>

            <DocsFooter onNavigate={navigate} />
          </>
        ) : (
          <LandingPage onOpenDocs={() => navigate(DEFAULT_PAGE)} />
        )}
      </div>
      <Analytics />
    </>
  );
}

export default App;

function createNotFoundPage(slug: string): DocPage {
  return {
    slug: "not-found",
    section: "Documentation",
    title: "Page Not Found",
    summary: "The documentation page you requested does not exist.",
    intro: [
      `No page was found for \`#/docs/${slug}\`.`,
      "Use the sidebar to navigate to an existing page, or return to the introduction to continue browsing the docs."
    ],
    blocks: [
      {
        id: "next-steps",
        title: "Try One Of These",
        bullets: [
          "Open Introduction to start from the main docs overview.",
          "Check the sidebar for valid pages in Getting Started, Core Concepts, Guide, and CLI Reference.",
          "Return to the landing page if you wanted the product overview instead of the docs."
        ]
      }
    ]
  };
}
