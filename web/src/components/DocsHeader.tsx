import { repoUrl } from "../content";

type DocsHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onHomeClick: () => void;
  onDocsClick: () => void;
  isDocsView: boolean;
};

const codexIconUrl = "/codex-icon.svg";

export function DocsHeader({
  query,
  onQueryChange,
  onHomeClick,
  onDocsClick,
  isDocsView
}: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-docs/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <button className="brand-button" onClick={onHomeClick}>
            <span className="brand-mark">
              <img src={codexIconUrl} alt="Codex" className="brand-mark__img" />
            </span>
            <span>Codex Kit</span>
          </button>
          <div className="hidden h-6 w-px bg-white/10 lg:block" />
          <div className="hidden items-center gap-2 lg:flex">
            <button onClick={onDocsClick} className={isDocsView ? "top-link top-link--active" : "top-link"}>
              Docs
            </button>
            <a href={repoUrl} target="_blank" rel="noreferrer" className="top-link">
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@daominhhiep/codex-kit"
              target="_blank"
              rel="noreferrer"
              className="top-link"
            >
              npm
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isDocsView ? (
            <label className="search-shell">
              <span className="search-icon">/</span>
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search docs..."
                className="search-input"
              />
              <span className="search-hint">K</span>
            </label>
          ) : (
            <button onClick={onDocsClick} className="top-link">
              Open documentation
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
