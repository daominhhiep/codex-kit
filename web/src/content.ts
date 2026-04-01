export type DocBlock =
  | {
    id: string;
    title: string;
    body?: string[];
    bullets?: string[];
    code?: string;
  }
  | {
    id: string;
    title: string;
    body?: string[];
    bullets?: string[];
    code?: string;
    image: {
      src: string;
      alt: string;
      caption?: string;
    };
  }
  | {
    id: string;
    title: string;
    cards: Array<{
      title: string;
      description: string;
      value?: string;
    }>;
  };

export type DocPage = {
  slug: string;
  section: string;
  title: string;
  summary: string;
  intro: string[];
  blocks: DocBlock[];
};

export type DocSection = {
  title: string;
  pages: DocPage[];
};

export const repoUrl = "https://github.com/daominhhiep/codex-kit";

export const docSections: DocSection[] = [
  {
    title: "Getting Started",
    pages: [
      {
        slug: "introduction",
        section: "Getting Started",
        title: "Introduction",
        summary: "What Codex Kit is, what it installs, and how to read the docs.",
        intro: [
          "Codex Kit is a starter scaffold for repositories that want to work well with Codex from day one.",
          "It installs routing docs, a shipped skill catalog, workflow playbooks, focused subagents, project-scoped MCP config, and managed file tracking so teams do not have to rebuild the same operating layer in every repo."
        ],
        blocks: [
          {
            id: "what-is-codex-kit",
            title: "What Is Codex Kit?",
            body: [
              "At its core, Codex Kit is a repo structure that helps Codex decide what kind of task it is looking at, which workflow fits, which skills matter, and how much validation is appropriate before handoff.",
              "The scaffold itself is the product. The shipped skill catalog lives in `templates/project/.agents/skills`, and that directory should be treated as the source of truth."
            ]
          },
          {
            id: "what-is-included",
            title: "What's Included",
            cards: [
              {
                title: "16 Agents",
                value: "16",
                description:
                  "Focused subagent profiles in `.codex/agents` for planning, implementation, debugging, review, docs, performance, security, SEO, deploy, and testing."
              },
              {
                title: "42 Skills",
                value: "42",
                description:
                  "Reusable skill entries under `.agents/skills` covering frontend, backend, database, mobile, testing, security, SEO, GEO, MCP, and more."
              },
              {
                title: "15 Workflows",
                value: "15",
                description:
                  "Production-ready workflow playbooks for brainstorm, plan, create, debug, review, check, verify, deploy, ship, preview, status, test, orchestrate, and UI/UX work."
              }
            ]
          },
          {
            id: "how-to-use-docs",
            title: "How To Use The Docs",
            bullets: [
              "Start with Installation if you are setting up a new repository, then read Local Codex Setup if you want the plugin or skill catalog available in Codex itself.",
              "Read Agents, Skills, and Workflows to understand how the scaffold thinks about execution.",
              "Use the Guide section when you want examples for planning, implementation, debugging, testing, preview, and deployment.",
              "Use CLI Reference when you need exact commands and flags."
            ]
          }
        ]
      },
      {
        slug: "installation",
        section: "Getting Started",
        title: "Installation",
        summary: "Install the CLI and scaffold a repository that is ready for Codex.",
        intro: [
          "Codex Kit is published as `@daominhhiep/codex-kit`.",
          "You can run it with `npx`, install it globally, or point it at a target directory when you want to scaffold into a new folder."
        ],
        blocks: [
          {
            id: "quick-install",
            title: "Quick Install",
            code: `npx @daominhhiep/codex-kit init

npm install -g @daominhhiep/codex-kit
codex-kit init`
          },
          {
            id: "target-directory",
            title: "Initialize Into A Target Directory",
            code: `npx @daominhhiep/codex-kit init --path ./my-project`
          },
          {
            id: "written-layout",
            title: "Scaffold Layout",
            code: `AGENTS.md
ARCHITECTURE.md
AGENT_FLOW.md
.agents/
  skills/
  .shared/
  workflows/
.codex/
  config.toml
  agents/
.codex-kit/
  manifest.json`
          },
          {
            id: "installation-notes",
            title: "Notes",
            bullets: [
              "Use `--force` only when you intentionally want to overwrite managed files.",
              "Use `--dry-run` to inspect changes before writing scaffold files.",
              "Use `status` and `update` after installation to keep managed files aligned with the current template version.",
              "Read `Local Codex Setup` next if you want the plugin or skill catalog installed into Codex."
            ]
          }
        ]
      },
      {
        slug: "local-codex-setup",
        section: "Getting Started",
        title: "Local Codex Setup",
        summary: "Install the Codex Kit plugin or skill catalog into local Codex.",
        intro: [
          "Use this page after the base project scaffold is in place.",
          "It covers the two Codex-local integrations: the workspace plugin and the local skill catalog."
        ],
        blocks: [
          {
            id: "install-plugin",
            title: "Install The Plugin In Codex",
            body: [
              "When you scaffold with `--install-plugin`, Codex Kit copies the plugin into `.agents/plugins/codex-kit` and creates `.agents/plugins/marketplace.json` with `installation: \"INSTALLED_BY_DEFAULT\"`.",
              "After that, open the `Plugins` view in Codex, choose the `Codex Kit Local` marketplace, and click the `+` button on `Codex Kit`."
            ],
            code: `npx @daominhhiep/codex-kit init --install-plugin`,
            image: {
              src: "/codex-kit-plugin-install.png",
              alt: "Codex Plugin Directory showing the Codex Kit Local marketplace and the Codex Kit install card.",
              caption:
                "The local marketplace appears in the Plugin Directory after the workspace is scaffolded with `--install-plugin`."
            }
          },
          {
            id: "plugin-install-steps",
            title: "Plugin Install Steps",
            bullets: [
              "Run `npx @daominhhiep/codex-kit init --install-plugin` in the target repository.",
              "Restart Codex or reopen the workspace if the local marketplace is not visible yet.",
              "Open `Plugins` in the left sidebar.",
              "Switch the marketplace selector to `Codex Kit Local`.",
              "Find `Codex Kit` under `Developer Tools` and click `+` to install it.",
              "Start a new thread and invoke it with `@Codex Kit`."
            ]
          },
          {
            id: "local-skill-install",
            title: "Install The Kit Skills Into Local Codex",
            body: [
              "Use `install-skills` when you want the shipped Codex Kit skill catalog available in local Codex outside a single project workspace.",
              "By default, Codex Kit installs the skills into `${CODEX_HOME:-~/.codex}/skills`. Use `--codex-home` to override that location."
            ],
            code: `npx @daominhhiep/codex-kit install-skills

npx @daominhhiep/codex-kit install-skills --codex-home ~/.codex`,
            image: {
              src: "/codex-kit-skill-install.png",
              alt: "Codex interface showing the installed Codex Kit skills in local Codex.",
              caption:
                "Use `install-skills` when you want the Codex Kit skill catalog available in local Codex outside a single workspace."
            }
          },
          {
            id: "local-skill-maintenance",
            title: "Sync Or Remove Local Skills",
            body: [
              "Use `sync-skills` to overwrite the local Codex copy with the current shipped version from Codex Kit.",
              "Use `--skills` when you want to install, sync, or remove only specific skill folders instead of the full catalog.",
              "`remove-skills` requires `--skills` so the CLI does not remove the full local skill catalog by accident."
            ],
            code: `npx @daominhhiep/codex-kit sync-skills

npx @daominhhiep/codex-kit install-skills --skills clean-code,planning
npx @daominhhiep/codex-kit sync-skills --skills clean-code,planning
npx @daominhhiep/codex-kit remove-skills --skills clean-code,planning`
          }
        ]
      }
    ]
  },
  {
    title: "Core Concepts",
    pages: [
      {
        slug: "agents",
        section: "Core Concepts",
        title: "Agents",
        summary: "Focused subagents with narrow responsibilities.",
        intro: [
          "Subagents live in `.codex/agents/*.toml` and are intentionally narrow so routing stays predictable.",
          "Codex Kit keeps responsibilities separate: agents own execution roles, skills own knowledge, and workflows own process."
        ],
        blocks: [
          {
            id: "agent-principles",
            title: "Agent Design Principles",
            bullets: [
              "Use focused subagents for bounded work instead of one broad parallel swarm.",
              "Prefer the narrowest agent that still matches the task.",
              "Pass skills explicitly when they matter instead of assuming the agent name is enough.",
              "Avoid parallelism when the result is needed immediately on the critical path."
            ]
          },
          {
            id: "agent-registry",
            title: "Shipped Agent Roles",
            cards: [
              {
                title: "planner",
                description: "Breaks work into decisions, steps, risks, and sequencing."
              },
              {
                title: "explorer",
                description: "Maps unfamiliar code paths and dependency flow before changes."
              },
              {
                title: "implementer",
                description: "Makes the smallest defensible code change once scope is clear."
              },
              {
                title: "frontend-specialist",
                description: "Builds or refactors UI and interaction layers."
              },
              {
                title: "backend-specialist",
                description: "Implements APIs, services, and server-side logic."
              },
              {
                title: "database-architect",
                description: "Owns schemas, migrations, and query design."
              }
            ]
          },
          {
            id: "agent-pairings",
            title: "Common Pairings",
            bullets: [
              "`planner` pairs well with `planning`, `plan-writing`, and `architecture`.",
              "`debugger` pairs well with `debugging`, `systematic-debugging`, and `testing-patterns`.",
              "`reviewer` pairs well with `code-review`, `code-review-checklist`, and `release-readiness`.",
              "`test-writer` pairs well with `testing-patterns`, `tdd-workflow`, and `webapp-testing`."
            ]
          }
        ]
      },
      {
        slug: "skills",
        section: "Core Concepts",
        title: "Skills",
        summary: "Reusable knowledge modules written in Codex `SKILL.md` format.",
        intro: [
          "Skills live in `.agents/skills/<name>/SKILL.md` and should stay narrow, explicit, and reusable across repositories.",
          "A skill can include `references/`, `scripts/`, and `assets/`, but it should never behave like hidden automation."
        ],
        blocks: [
          {
            id: "skill-contract",
            title: "Skill Contract",
            bullets: [
              "Keep each skill narrow enough to be composable with other skills.",
              "Use `SKILL.md` for the instruction contract.",
              "Use `references/` for deeper examples or templates.",
              "Use `scripts/` only for optional helpers that should be suggested, not silently executed."
            ]
          },
          {
            id: "skill-catalog",
            title: "Catalog Coverage",
            cards: [
              {
                title: "Implementation",
                description:
                  "Includes clean code, frontend design, Node.js best practices, API patterns, database design, and mobile design."
              },
              {
                title: "Validation",
                description:
                  "Includes testing patterns, TDD workflow, webapp testing, release readiness, debugging, and systematic debugging."
              },
              {
                title: "Specialized",
                description:
                  "Includes SEO, GEO, MCP builder, performance profiling, vulnerability scanning, red-team tactics, and more."
              }
            ]
          },
          {
            id: "minimal-loading",
            title: "Minimal Loading Rule",
            body: [
              "The default rule is simple: load as little as you can while still doing good work.",
              "Choose the workflow first, then add only the skills that meaningfully improve the current task."
            ]
          }
        ]
      },
      {
        slug: "workflows",
        section: "Core Concepts",
        title: "Workflows",
        summary: "Process playbooks for common task types.",
        intro: [
          "Workflows live in `.agents/workflows/*.md` and describe repeatable ways to approach common tasks such as planning, implementation, debugging, review, testing, preview, and deployment.",
          "They encode process, not domain knowledge."
        ],
        blocks: [
          {
            id: "workflow-selection",
            title: "Workflow Selection",
            body: [
              "Classify the request before loading extra skills or spawning subagents.",
              "Once the task shape is clear, choose the narrowest workflow that matches it."
            ]
          },
          {
            id: "workflow-catalog",
            title: "Shipped Workflows",
            code: `brainstorm
check
create
debug
deploy
enhance
orchestrate
plan
preview
review
ship
status
test
ui-ux-pro-max
verify`
          },
          {
            id: "validation-tiers",
            title: "Validation Tiers",
            bullets: [
              "Use `check` for normal development and narrow changes.",
              "Use `verify` for release-sensitive, deployment-affecting, or cross-cutting work.",
              "Use `test` when test execution or test authoring is the main objective.",
              "Promote from `check` to `verify` when release risk is non-trivial or validation signal is weak."
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Guide",
    pages: [
      {
        slug: "structured-brainstorming",
        section: "Guide",
        title: "Structured Brainstorming",
        summary: "Use `brainstorm` when the request is still open-ended.",
        intro: [
          "The `brainstorm` workflow is for vague feature requests, strategy questions, and architecture exploration.",
          "Its job is to reduce ambiguity before implementation, not to start writing code too early."
        ],
        blocks: [
          {
            id: "when-to-use",
            title: "When To Use",
            bullets: [
              "The request is exploratory or under-specified.",
              "The user asks for options, recommendations, or tradeoffs.",
              "Architecture or product direction is still open."
            ]
          },
          {
            id: "recommended-process",
            title: "Recommended Process",
            bullets: [
              "Restate the goal, audience, and success criteria.",
              "Surface missing assumptions such as user type, constraints, non-goals, and timeline.",
              "Present 2 to 4 realistic options with advantages, drawbacks, and rough effort.",
              "Recommend one direction and end with the next decision required to move into `plan` or `create`."
            ]
          }
        ]
      },
      {
        slug: "project-planning",
        section: "Guide",
        title: "Project Planning",
        summary: "Use `plan` when you want an execution-ready plan before code changes.",
        intro: [
          "The `plan` workflow is for tasks where the user wants the shape of the work decided before implementation begins.",
          "A good plan is grounded in the real repository, ordered by dependency, and explicit about risks and validation."
        ],
        blocks: [
          {
            id: "planning-process",
            title: "Planning Process",
            bullets: [
              "Inspect the current code or repository layout first.",
              "Define target behavior, explicit non-goals, dependencies, and constraints.",
              "Break the work into sequenced implementation steps.",
              "Capture API, data, migration, and config changes.",
              "Define validation and acceptance criteria."
            ]
          }
        ]
      },
      {
        slug: "create-new-application",
        section: "Guide",
        title: "Create New Application",
        summary: "Use `create` for new features, scaffolding, and other structured implementation work.",
        intro: [
          "The `create` workflow turns a concrete request into the smallest defensible implementation that solves the problem.",
          "If the request is still fuzzy, step back to `brainstorm` or `plan` first."
        ],
        blocks: [
          {
            id: "entry-criteria",
            title: "Entry Criteria",
            bullets: [
              "The requested behavior is specific enough to implement.",
              "Obvious product ambiguities are resolved.",
              "Affected scope is understood from repository context."
            ]
          },
          {
            id: "create-process",
            title: "Implementation Process",
            bullets: [
              "Inspect the current code, interfaces, and affected paths.",
              "Identify the narrowest subagent and skills for the job.",
              "Implement in small defensible increments.",
              "Run `check` before presenting the result.",
              "Summarize changed behavior, validation, and remaining risks."
            ]
          }
        ]
      },
      {
        slug: "add-a-new-feature",
        section: "Guide",
        title: "Add A New Feature",
        summary: "A practical pattern for extending an existing codebase without drifting scope.",
        intro: [
          "For iterative work inside an existing repository, use `enhance` or `create` depending on how new the behavior really is.",
          "The key rule is to keep the change scoped to the confirmed problem and avoid silently inventing new product policy."
        ],
        blocks: [
          {
            id: "feature-pattern",
            title: "Suggested Pattern",
            bullets: [
              "Start with repository inspection and affected surface mapping.",
              "Choose one workflow and one primary subagent role.",
              "Load only the stack-relevant skills.",
              "Keep unrelated files untouched unless they are required dependencies.",
              "Run `check`, and escalate to `verify` if the feature crosses subsystem boundaries."
            ]
          }
        ]
      },
      {
        slug: "advanced-ui-design",
        section: "Guide",
        title: "Advanced UI Design",
        summary: "Use `ui-ux-pro-max` for design direction and implementation-aware UI work.",
        intro: [
          "The `ui-ux-pro-max` workflow is for UI planning, redesign work, and implementation-aware UX decisions.",
          "It is backed by the shared package in `.agents/.shared/ui-ux-pro-max/`."
        ],
        blocks: [
          {
            id: "design-sequence",
            title: "Suggested Sequence",
            bullets: [
              "Extract product type, audience, brand tone, platform, and content readiness.",
              "Run `--design-system` first when the request is broad enough to need a visual direction.",
              "Use one or two domain searches for deeper follow-up.",
              "Use `--stack` for implementation-specific guidance.",
              "Validate the result against usability and accessibility expectations."
            ]
          },
          {
            id: "ui-ux-commands",
            title: "Useful Commands",
            code: `python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "saas dashboard" --design-system -p "Project Name"
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "dashboard layout" --stack react
python3 .agents/.shared/ui-ux-pro-max/scripts/search.py "fintech landing" --domain typography`
          }
        ]
      },
      {
        slug: "systematic-debugging",
        section: "Guide",
        title: "Systematic Debugging",
        summary: "Move from symptom to confirmed failure mode before changing code.",
        intro: [
          "The `debug` workflow exists for failures, regressions, and unclear runtime behavior.",
          "Its key rule is simple: do not jump straight to code changes."
        ],
        blocks: [
          {
            id: "debug-process",
            title: "Debug Process",
            bullets: [
              "Reproduce the issue or state why reproduction is blocked.",
              "Capture evidence such as logs, exact errors, failing tests, inputs, and expected vs actual behavior.",
              "Identify the failure boundary and rank hypotheses.",
              "Test hypotheses until the root cause is confirmed.",
              "Fix only after the failure mode is understood, then add or update tests."
            ]
          }
        ]
      },
      {
        slug: "test-generation",
        section: "Guide",
        title: "Test Generation",
        summary: "Add or run the smallest useful test scope with clear reporting.",
        intro: [
          "The `test` workflow is for targeted test creation, test execution, and coverage-driven validation.",
          "It should prove behavior with the smallest useful set of tests instead of broad rewrites."
        ],
        blocks: [
          {
            id: "test-priorities",
            title: "Testing Priorities",
            bullets: [
              "Happy path",
              "Error handling",
              "Edge cases",
              "Integration boundaries when they are part of the changed behavior"
            ]
          },
          {
            id: "test-rules",
            title: "Rules",
            bullets: [
              "Do not encode ambiguous product behavior into tests.",
              "Prefer targeted tests over sweeping test rewrites.",
              "If a failure is unexpected, pair the test workflow with `debug`."
            ]
          }
        ]
      },
      {
        slug: "preview-management",
        section: "Guide",
        title: "Preview Management",
        summary: "Start, restart, or verify a local preview server with minimal confusion.",
        intro: [
          "The `preview` workflow focuses on local preview startup, health checks, and developer-facing verification.",
          "It should make it easy to go from source changes to a working local URL."
        ],
        blocks: [
          {
            id: "preview-steps",
            title: "Preview Steps",
            bullets: [
              "Detect the preview command from repository context.",
              "Check whether a preview server is already running.",
              "Start, stop, restart, or verify the server as requested.",
              "Resolve port conflicts explicitly instead of guessing.",
              "Report the local URL and basic health status."
            ]
          }
        ]
      },
      {
        slug: "project-status",
        section: "Guide",
        title: "Project Status",
        summary: "Summarize repository state, active work, and validation status.",
        intro: [
          "The `status` workflow answers where the repository stands right now without making someone reread the whole project.",
          "It should summarize changed areas, validation state, blockers, and the next practical action."
        ],
        blocks: [
          {
            id: "status-checklist",
            title: "What To Include",
            bullets: [
              "Current task or feature area",
              "Changed files or major touched areas",
              "Validation that has and has not been run",
              "Preview or deployment state if relevant",
              "Pending work or known blockers"
            ]
          }
        ]
      },
      {
        slug: "multi-agent-orchestration",
        section: "Guide",
        title: "Multi-Agent Orchestration",
        summary: "Coordinate bounded subagent work without losing the main-thread plan.",
        intro: [
          "Use the `orchestrate` workflow only when the task genuinely benefits from multiple focused subagents.",
          "Parallelism should exist to unblock independent workstreams, not just because the task feels big."
        ],
        blocks: [
          {
            id: "orchestration-rules",
            title: "Rules",
            bullets: [
              "Define the immediate critical-path task that the main agent should own.",
              "Assign sidecar tasks only when they can proceed in parallel without stepping on the same write set.",
              "Pass enough context: request, relevant files, known decisions, and expected output.",
              "Continue non-overlapping local work while subagents run.",
              "Integrate returned results and run final validation."
            ]
          }
        ]
      },
      {
        slug: "production-deployment",
        section: "Guide",
        title: "Production Deployment",
        summary: "Move from ready code to a safe deployment with pre-flight checks and rollback awareness.",
        intro: [
          "The `deploy` workflow is for staging or production deployment preparation and execution.",
          "It should confirm environment targets, validation depth, secrets, packaging, smoke checks, and rollback paths."
        ],
        blocks: [
          {
            id: "deploy-modes",
            title: "Deployment Modes",
            bullets: [
              "`deploy check` for pre-flight only",
              "`deploy preview` for stage or preview deployment",
              "`deploy production` for production deployment",
              "`deploy rollback` for rollback planning or execution"
            ]
          },
          {
            id: "preflight-checklist",
            title: "Pre-Flight Checklist",
            bullets: [
              "Build succeeds",
              "Tests and validation match release risk",
              "Secrets are not hardcoded",
              "Environment configuration is accounted for",
              "Migrations are ordered and reversible where possible",
              "Monitoring or smoke checks are defined"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "CLI Reference",
    pages: [
      {
        slug: "commands-and-options",
        section: "CLI Reference",
        title: "Commands & Options",
        summary: "The commands and flags exposed by the Codex Kit CLI.",
        intro: [
          "Codex Kit keeps the CLI surface intentionally small: initialize the scaffold, update managed files, and inspect status.",
          "The CLI entrypoint is exposed through the `codex-kit` binary."
        ],
        blocks: [
          {
            id: "commands",
            title: "Commands",
            code: `codex-kit init
codex-kit update
codex-kit status`
          },
          {
            id: "options",
            title: "Options",
            code: `codex-kit init --path ./my-project
codex-kit init --force
codex-kit init --dry-run
codex-kit init --quiet

codex-kit update --path ./my-project
codex-kit update --force

codex-kit status --path ./my-project`
          },
          {
            id: "managed-files",
            title: "Managed File Behavior",
            body: [
              "The `.codex-kit/manifest.json` file tracks the path, template hash, installed hash, and install version for kit-managed files.",
              "That data powers `status`, safe `update`, and detection of missing or locally modified managed files."
            ]
          }
        ]
      }
    ]
  }
];

export const allPages = docSections.flatMap((section) => section.pages);
