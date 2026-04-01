import { useEffect, useState } from "react";
import type { DocPage } from "../content";

type DocsPageContentProps = {
  page: DocPage;
  previousPage: DocPage | null;
  nextPage: DocPage | null;
  onNavigate: (slug: string) => void;
};

export function DocsPageContent({
  page,
  previousPage,
  nextPage,
  onNavigate
}: DocsPageContentProps) {
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  useEffect(() => {
    if (!expandedImage) {
      return undefined;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedImage]);

  return (
    <>
      <article className="docs-page">
        <p className="page-kicker">{page.section}</p>
        <h1 className="page-title">{page.title}</h1>
        <p className="page-summary">{page.summary}</p>

        <div className="mt-6 space-y-4">
          {page.intro.map((paragraph) => (
            <p key={paragraph} className="page-paragraph">
              {renderInlineCode(paragraph)}
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {page.blocks.map((block) => (
            <section key={block.id} id={block.id} className="content-section">
              <h2 className="section-heading">{block.title}</h2>
              {"body" in block &&
                block.body?.map((paragraph) => (
                  <p key={paragraph} className="page-paragraph mt-4">
                    {renderInlineCode(paragraph)}
                  </p>
                ))}
              {"bullets" in block && block.bullets && (
                <ul className="bullet-list mt-4">
                  {block.bullets.map((item) => (
                    <li key={item}>{renderInlineCode(item)}</li>
                  ))}
                </ul>
              )}
              {"code" in block && block.code && (
                <pre className="code-panel mt-4">
                  <code>{block.code}</code>
                </pre>
              )}
              {"image" in block && block.image && (
                <figure className="docs-figure mt-5">
                  <button
                    type="button"
                    className="docs-figure__button"
                    onClick={() => setExpandedImage(block.image)}
                    aria-label={`Open image: ${block.image.alt}`}
                  >
                    <img className="docs-figure__image" src={block.image.src} alt={block.image.alt} />
                  </button>
                  {block.image.caption ? (
                    <figcaption className="docs-figure__caption">
                      {renderInlineCode(block.image.caption)}
                    </figcaption>
                  ) : null}
                </figure>
              )}
              {"cards" in block && (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {block.cards.map((card) => (
                    <article key={card.title} className="info-card">
                      {card.value ? <p className="info-card__value">{card.value}</p> : null}
                      <h3 className="info-card__title">{card.title}</h3>
                      <p className="info-card__body">{card.description}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/8 pt-6 md:grid-cols-2">
          {previousPage ? (
            <button className="pager-card text-left" onClick={() => onNavigate(previousPage.slug)}>
              <span className="pager-label">Previous</span>
              <span className="pager-title">{previousPage.title}</span>
            </button>
          ) : (
            <div />
          )}
          {nextPage ? (
            <button className="pager-card text-left md:justify-self-end" onClick={() => onNavigate(nextPage.slug)}>
              <span className="pager-label">Next</span>
              <span className="pager-title">{nextPage.title}</span>
            </button>
          ) : null}
        </div>
      </article>

      {expandedImage ? (
        <div className="docs-lightbox" role="dialog" aria-modal="true" aria-label={expandedImage.alt}>
          <button
            type="button"
            className="docs-lightbox__backdrop"
            aria-label="Close image preview"
            onClick={() => setExpandedImage(null)}
          />
          <div className="docs-lightbox__content">
            <button
              type="button"
              className="docs-lightbox__close"
              aria-label="Close image preview"
              onClick={() => setExpandedImage(null)}
            >
              Close
            </button>
            <img className="docs-lightbox__image" src={expandedImage.src} alt={expandedImage.alt} />
            {expandedImage.caption ? (
              <p className="docs-lightbox__caption">{renderInlineCode(expandedImage.caption)}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={`${part}-${index}`} className="inline-code">
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}
