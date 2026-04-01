import type { DocSection } from "../content";

type DocsSidebarProps = {
  currentSlug: string;
  sections: DocSection[];
  onNavigate: (slug: string) => void;
};

export function DocsSidebar({ currentSlug, sections, onNavigate }: DocsSidebarProps) {
  return (
    <aside className="border-b border-white/8 px-4 py-6 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:border-white/8 lg:px-5 xl:sticky xl:top-[65px] xl:max-h-[calc(100vh-65px)] xl:overflow-y-auto">
      {sections.map((section) => (
        <div key={section.title} className="mb-8 last:mb-0">
          <p className="sidebar-heading">{section.title}</p>
          <div className="mt-3 space-y-1">
            {section.pages.map((page) => (
              <button
                key={page.slug}
                onClick={() => onNavigate(page.slug)}
                className={page.slug === currentSlug ? "sidebar-link sidebar-link--active" : "sidebar-link"}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
