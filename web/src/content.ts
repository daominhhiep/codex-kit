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
        summary: "Welcome to the Codex Kit documentation.",
        intro: [
          "Codex Kit is a Codex-native starter kit for teams that want a reusable project scaffold with routing rules, a shipped skill catalog, workflow playbooks, focused subagents, MCP-ready config, and managed file tracking.",
          "The goal is to make `codex-kit init` produce a repository that Codex can use immediately without every team having to rebuild the same operating structure from scratch."
        ],
        blocks: [
          {
            id: "what-is-codex-kit",
            title: "What Is Codex Kit?",
            body: [
              "Codex Kit packages the repo-level control documents and catalogs that teach Codex how to classify tasks, choose workflows, load the right skills, and validate work at the right depth.",
              "The scaffold is the product. The source of truth for the shipped skill catalog lives in `templates/project/.agents/skills`, not in a separate ad hoc root folder."
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
              "Start with Installation if you are setting up a new repository.",
              "Read Agents, Skills, and Workflows to understand the operating model inside the scaffold.",
              "Use the Guide section when you want concrete patterns for planning, implementation, debugging, testing, orchestration, preview, and deployment.",
              "Use CLI Reference when you need exact commands, flags, or scaffold behavior."
            ]
          }
        ]
      },
      {
        slug: "installation",
        section: "Getting Started",
        title: "Installation",
        summary: "Install Codex Kit and scaffold a Codex-ready repository.",
        intro: [
          "Codex Kit ships as a CLI package published under `@daominhhiep/codex-kit`.",
          "You can run it directly with `npx` or install it globally and then initialize a repository in place or into a target directory."
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
              "Use `status` and `update` after installation to keep managed files aligned with the current template version."
            ]
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
        summary: "Focused subagents for bounded roles inside Codex Kit.",
        intro: [
          "Subagents live in `.codex/agents/*.toml` and are meant to stay specialized enough that routing is predictable.",
          "The scaffold separates role definitions from knowledge modules and process playbooks: agents own execution roles, skills own knowledge, and workflows own process."
        ],
        blocks: [
          {
            id: "agent-principles",
            title: "Agent Design Principles",
            bullets: [
              "Use focused subagents for bounded work instead of one broad parallel swarm.",
              "Prefer the narrowest agent that matches the current task.",
              "Do not assume an agent will infer the right skill set from its name alone; route skills explicitly when needed.",
              "Avoid unnecessary parallelism when the task is still on the critical path."
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
        summary: "Reusable knowledge modules in Codex `SKILL.md` format.",
        intro: [
          "Skills live in `.agents/skills/<name>/SKILL.md` and should stay narrow, explicit, and reusable across repositories.",
          "A skill can optionally include `references/`, `scripts/`, and `assets/`, but it should not act like hidden automation."
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
              "The default rule in Codex Kit is minimal loading. Do not load a broad stack of skills without evidence they are needed for the current task.",
              "Choose the narrowest workflow first, then add only the skills that materially improve the work."
            ]
          }
        ]
      },
      {
        slug: "workflows",
        section: "Core Concepts",
        title: "Workflows",
        summary: "Process playbooks for common task shapes.",
        intro: [
          "Workflows live in `.agents/workflows/*.md` and define repeatable playbooks for common task types such as brainstorming, planning, creation, debugging, review, testing, validation, deployment, orchestration, preview, and status.",
          "Workflows encode process, not domain knowledge."
        ],
        blocks: [
          {
            id: "workflow-selection",
            title: "Workflow Selection",
            body: [
              "Classification should happen before loading extra skills or spawning subagents.",
              "Once the primary mode is clear, route to the narrowest workflow that matches the request."
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
        summary: "Use brainstorming when the task is still ambiguous.",
        intro: [
          "The `brainstorm` workflow exists for vague feature requests, strategy questions, and architecture exploration.",
          "Its job is to reduce ambiguity before implementation, not to produce code."
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
        summary: "Use planning to produce an execution-ready plan before code changes.",
        intro: [
          "The `plan` workflow is for tasks where the user wants a decision-complete implementation plan before changes land.",
          "A good plan is grounded in the real repository, ordered by dependency, and explicit about risk and validation."
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
        summary: "Use the create workflow for new features, scaffolding, or structured implementation work.",
        intro: [
          "The `create` workflow turns a concrete request into a minimal defensible implementation.",
          "If the request is still ambiguous, move back to `brainstorm` or `plan` first."
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
        summary: "A practical pattern for extending an existing codebase.",
        intro: [
          "For iterative change inside an existing repository, use the `enhance` or `create` workflow depending on how net-new the behavior is.",
          "The guiding rule is to keep the change scoped to the confirmed problem and avoid silent policy invention."
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
        summary: "Use the shared UI/UX Pro Max workflow for design-direction work.",
        intro: [
          "The `ui-ux-pro-max` workflow is for UI planning, visual redesigns, and implementation-oriented UX decisions.",
          "It is backed by the shared package at `.agents/.shared/ui-ux-pro-max/`."
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
        summary: "Move from symptom to confirmed failure mode before code changes.",
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
          "The `test` workflow is for targeted test creation, execution, or coverage-driven validation.",
          "It should prove behavior with the smallest useful set of tests rather than broad rewrites."
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
          "It should make it easy to get from source changes to a working local URL."
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
          "The `status` workflow answers where the repository is now without requiring someone to reread the entire project.",
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
        summary: "Coordinate bounded subagent work without losing a coherent main-thread plan.",
        intro: [
          "Use the `orchestrate` workflow only when the task genuinely benefits from multiple focused subagents.",
          "Parallelism should exist to unblock independent workstreams, not because the task simply feels large."
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
        summary: "Move from ready code to safe enough deployment with pre-flight checks and rollback awareness.",
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
        summary: "Exact commands and flags exposed by the Codex Kit CLI.",
        intro: [
          "Codex Kit ships a small command surface designed around initialization, managed updates, and scaffold status.",
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
              "The `.codex-kit/manifest.json` file tracks path, template hash, installed hash, and install version for kit-managed files.",
              "This powers `status`, safe `update`, and detection of missing or locally modified managed files."
            ]
          }
        ]
      }
    ]
  }
];

export const allPages = docSections.flatMap((section) => section.pages);
