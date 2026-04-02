import React from "react";
import { repoUrl } from "../content";
import { getDocPath } from "../docs/navigation";

void React;

export function DocsFooter() {
  return (
    <footer className="mt-16 border-t border-white/8">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="footer-heading">Product</p>
            <div className="footer-links">
              <a href={getDocPath("introduction")}>Documentation</a>
              <a href={getDocPath("agents")}>Agents</a>
              <a href={getDocPath("skills")}>Skills</a>
              <a href={getDocPath("workflows")}>Workflows</a>
            </div>
          </div>
          <div>
            <p className="footer-heading">Resources</p>
            <div className="footer-links">
              <a href={getDocPath("installation")}>Installation</a>
              <a href={getDocPath("commands-and-options")}>CLI Reference</a>
              <a href={getDocPath("advanced-ui-design")}>Examples</a>
              <a href={`${repoUrl}/blob/main/CHANGELOG.md`} target="_blank" rel="noreferrer">
                Changelog
              </a>
            </div>
          </div>
          <div>
            <p className="footer-heading">Community</p>
            <div className="footer-links">
              <a href={repoUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={`${repoUrl}/issues`} target="_blank" rel="noreferrer">
                Issues
              </a>
              <a href={`${repoUrl}/discussions`} target="_blank" rel="noreferrer">
                Discussions
              </a>
              <a href={`${repoUrl}/blob/main/README.md`} target="_blank" rel="noreferrer">
                Contributing
              </a>
            </div>
          </div>
          <div>
            <p className="footer-heading">Legal</p>
            <div className="footer-links">
              <a href={`${repoUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
                License
              </a>
              <a href={repoUrl} target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              <a href={repoUrl} target="_blank" rel="noreferrer">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="footer-meta">
          <p>
            © 2026 Codex Kit by{" "}
            <a
              href="https://github.com/daominhhiep"
              target="_blank"
              rel="noreferrer"
              className="footer-inline-link"
            >
              @daominhhiep
            </a>
            . All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/daominhhiep" target="_blank" rel="noreferrer">
              <span className="sr-only">GitHub</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-icon">
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.595 2 12.262c0 4.534 2.865 8.38 6.839 9.738.5.094.682-.223.682-.495 0-.244-.009-.89-.014-1.748-2.782.62-3.369-1.375-3.369-1.375-.455-1.19-1.11-1.507-1.11-1.507-.908-.637.069-.624.069-.624 1.004.072 1.532 1.058 1.532 1.058.892 1.568 2.341 1.115 2.91.853.091-.663.349-1.116.635-1.372-2.221-.261-4.555-1.14-4.555-5.073 0-1.12.389-2.036 1.029-2.753-.103-.262-.446-1.317.098-2.747 0 0 .84-.276 2.75 1.052A9.303 9.303 0 0 1 12 6.836c.85.004 1.706.118 2.504.346 1.909-1.328 2.748-1.052 2.748-1.052.546 1.43.202 2.485.1 2.747.64.717 1.027 1.633 1.027 2.753 0 3.943-2.338 4.809-4.566 5.065.359.319.678.947.678 1.909 0 1.378-.012 2.489-.012 2.828 0 .275.18.594.688.493C19.138 20.638 22 16.794 22 12.262 22 6.595 17.523 2 12 2Z"
                />
              </svg>
            </a>
            <a href="https://x.com/daominhhiep" target="_blank" rel="noreferrer">
              <span className="sr-only">X</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-icon">
                <path
                  fill="currentColor"
                  d="M18.901 2H21.98l-6.726 7.688L23.167 22h-6.194l-4.85-7.338L5.705 22H2.624l7.194-8.225L.833 2h6.352l4.384 6.684L18.901 2Zm-1.08 18.127h1.706L6.252 3.777H4.421l13.4 16.35Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
