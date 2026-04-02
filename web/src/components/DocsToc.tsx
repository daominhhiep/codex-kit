import React from "react";
import type { DocPage } from "../content";

void React;

type DocsTocProps = {
  page: DocPage;
};

export function DocsToc({ page }: DocsTocProps) {
  return (
    <aside className="hidden border-l border-white/8 px-6 py-8 xl:block xl:sticky xl:top-[65px] xl:max-h-[calc(100vh-65px)] xl:overflow-y-auto">
      <div className="toc-shell">
        <p className="toc-heading">On This Page</p>
        <div className="mt-4 space-y-2">
          {page.blocks.map((block) => (
            <a key={block.id} href={`#${block.id}`} className="toc-link">
              {block.title}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
