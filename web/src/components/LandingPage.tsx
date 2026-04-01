import { repoUrl } from "../content";

const heroImageUrl =
  "https://images.ctfassets.net/kftzwdyauwt9/5CWrXjTHrPVHU13RzVPxdt/f2c12b2b03d2b4a56c16142037060f38/tablet_m_hero.png?fm=webp&q=90&w=3840";

type LandingPageProps = {
  onOpenDocs: () => void;
};

const highlights = [
  {
    value: "16",
    label: "focused agents bundled in the scaffold"
  },
  {
    value: "42",
    label: "skill entries available in the template catalog"
  },
  {
    value: "15",
    label: "workflow playbooks for real repository work"
  }
];

const features = [
  {
    title: "Codex-first routing",
    body: "Ship a repository with `AGENTS.md`, `AGENT_FLOW.md`, and `ARCHITECTURE.md` already aligned around how Codex classifies and executes work."
  },
  {
    title: "Reusable capability system",
    body: "Keep skills, workflows, and subagents separated so teams can extend the scaffold without collapsing process, knowledge, and execution into one file."
  },
  {
    title: "Managed scaffold updates",
    body: "Use `status` and `update` against `.codex-kit/manifest.json` to preserve local edits while still tracking kit-managed files."
  }
];

export function LandingPage({ onOpenDocs }: LandingPageProps) {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <section className="landing-hero">
        <div className="landing-copy">
          <p className="landing-kicker">Codex-native scaffold</p>
          <h1 className="landing-title">
            Build repositories that feel ready for Codex from the first command.
          </h1>
          <p className="landing-body">
            Codex Kit packages routing, workflows, skills, subagents, and managed scaffold updates
            into a single starter so teams can spend less time rebuilding operating structure and
            more time shipping.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onOpenDocs} className="landing-primary">
              Read documentation
            </button>
            <a href={repoUrl} target="_blank" rel="noreferrer" className="landing-secondary">
              View GitHub
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.label} className="landing-stat">
                <p className="landing-stat__value">{item.value}</p>
                <p className="landing-stat__label">{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="landing-visual">
          <div className="landing-visual__glow" />
          <img src={heroImageUrl} alt="Codex app interface" className="landing-visual__image" />
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="landing-card">
            <h2 className="landing-card__title">{feature.title}</h2>
            <p className="landing-card__body">{feature.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
