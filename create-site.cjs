const fs = require('fs');
const path = require('path');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const layout = (title, content, activeNav = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title>
  <link rel="stylesheet" href="/design-system.css" />
</head>
<body>
  <header class="global-header">
    <div class="shell nav-shell">
      <a href="/" class="wordmark">Angel Vergara</a>
      <button class="menu-button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <nav id="primary-navigation" class="navlinks">
        <a href="/work/" class="${activeNav === 'work' ? 'active' : ''}">Work</a>
        <a href="/about/" class="${activeNav === 'about' ? 'active' : ''}">About</a>
        <a href="/resume/" class="${activeNav === 'resume' ? 'active' : ''}">Resume</a>
        <a href="#contact" class="nav-contact">Contact &rarr;</a>
      </nav>
    </div>
  </header>
  <main id="main">
    ${content}
  </main>
  <footer id="contact" class="global-footer">
    <div class="shell footer-grid">
      <div class="footer-info">
        <p class="mono">Applied AI Workflows &middot; Business Systems &middot; Implementation</p>
        <p class="mono text-muted">&copy; 2026 Angel Vergara</p>
      </div>
      <div class="footer-links mono">
        <a href="mailto:avergara13@me.com" class="link-internal">Email</a>
        <a href="https://linkedin.com/in/angel-vergara-83861540" class="link-external" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/avergara13" class="link-external" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  </footer>
  <script src="/static-shell.js"></script>
</body>
</html>`;

const projectNav = (prev, prevUrl, next, nextUrl) => `
<nav aria-label="Project pagination" class="project-navigator">
  <a href="${prevUrl}" class="link-internal">&larr; ${prev}</a>
  <a href="/work/" class="link-internal">All Work</a>
  <a href="${nextUrl}" class="link-internal">${next} ${next !== 'Back to top \u2191' ? '&rarr;' : ''}</a>
</nav>
`;

const pages = {
  'index.html': {
    title: 'Angel Vergara — AI Workflows & Business Systems',
    nav: '',
    content: `
      <section class="hero shell">
        <div class="hero-statement">
          <h1 class="serif">I turn messy operations into AI-assisted systems people can actually use.</h1>
          <p>I design workflows, interfaces, and human control points&mdash;and test the handoffs that make them reliable.</p>
          <div style="margin-top: 2.5rem; display: flex; gap: 2rem; align-items: baseline;">
            <a href="/work/" class="link-internal" style="font-weight: 500; font-size: 1.125rem;">View the work</a>
            <a href="/resume/" class="link-download text-muted mono">Resume</a>
          </div>
        </div>
        <div class="hero-handoff">
          <span>01 Request</span>
          <span>02 Role</span>
          <span>03 Work</span>
          <span>04 Review</span>
          <span class="text-copper" style="font-weight: bold;">05 Human Decision</span>
          <span>06 Closeout</span>
        </div>
      </section>

      <section class="shell" style="padding-top: 0;">
        <h2 class="mono text-muted" style="font-size: 0.85rem; margin-bottom: 2rem;">Proof Index / 30-Second Scan</h2>
        
        <div class="proof-band rsp-tier">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">01 &middot; Working Product</span>
            <h3>Resale Scanner Pro</h3>
            <p class="text-muted">A mobile-first AI-assisted resale workflow built for a real operation.</p>
            <a href="/work/resale-scanner-pro/" class="link-internal mono" style="margin-top: 1rem;">Inspect Proof</a>
          </div>
          <div class="proof-visual">
            <img src="/images/rsp/session.png" alt="Resale Scanner Pro Evaluate screen" loading="lazy" />
          </div>
        </div>

        <div class="proof-band loft-tier">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">02 &middot; System / Agent Workflow</span>
            <h3>Loft OS</h3>
            <p class="text-muted">A governed operating model for moving AI-assisted work from intake to verified closeout.</p>
            <a href="/work/loft-os/" class="link-internal mono" style="margin-top: 1rem;">View Schematic</a>
          </div>
          <div class="proof-visual">
            <img src="/og-loft-os.png" alt="Loft OS Diagram" loading="lazy" />
          </div>
        </div>

        <div class="proof-band arp-tier">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">03 &middot; AI Workflow</span>
            <h3>Assistant Recruiter Pro</h3>
            <p class="text-muted">Generates and iteratively refines Boolean search strategy from JD constraints.</p>
            <a href="/work/assistant-recruiter-pro/" class="link-internal mono" style="margin-top: 1rem;">Review Logic</a>
          </div>
          <div class="proof-visual">
            <img src="/og-hiring.png" alt="Recruiter Logic Artifact" loading="lazy" />
          </div>
        </div>

        <div class="proof-band sous-tier">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">04 &middot; Supporting Implementation</span>
            <h3>Sous Chef</h3>
            <p class="text-muted">An AI-assisted culinary workspace for recipe workflows and cooking continuity.</p>
            <a href="/work/sous-chef/" class="link-internal mono" style="margin-top: 1rem;">View Interface</a>
          </div>
          <div class="proof-visual">
            <img src="/images/sous-chef/desktop.png" alt="Sous Chef Implementation Interface" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="shell" style="background: #fff; border: 1px solid var(--spine); padding: 4rem; margin-top: 4rem;">
        <h2 class="serif">Operating Reality &rarr; Systems Thinking</h2>
        <p style="margin-bottom: 2rem;">I learned systems by running the work they have to support. Progressing from hands-on culinary roles to executive chef and general manager taught me to translate operating pressure into clearer workflows and usable systems.</p>
        <div class="mono text-muted" style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2.5rem; font-size: 0.75rem; flex-wrap: wrap;">
          <span>Hospitality Operations</span> &rarr;
          <span>Systems Implementation</span> &rarr;
          <span class="text-cobalt" style="font-weight: bold;">AI-Assisted Workflows</span>
        </div>
        <a href="/about/" class="link-internal mono">Read the story</a>
      </section>
    `
  },
  'work/index.html': {
    title: 'Work Index — Angel Vergara',
    nav: 'work',
    content: `
      <section class="shell">
        <h1 class="serif">Evidence Atlas</h1>
        <p class="text-muted">A technical field notebook of systems, workflows, and implementations.</p>
        
        <div class="work-index-layout" style="margin-top: 4rem;">
          <div class="work-list">
            
            <a href="/work/resale-scanner-pro/" class="work-row" aria-current="true" data-img="/images/rsp/session.png" data-alt="Resale Scanner Pro Mobile Interface">
              <span class="mono text-muted">01</span>
              <h2 class="serif">Resale Scanner Pro</h2>
              <div class="work-metadata">
                <span>TYPE: Working Product</span>
                <span>ROLE: Product / implementation</span>
                <span>STATUS: In operating use</span>
              </div>
            </a>
            
            <a href="/work/loft-os/" class="work-row" aria-current="false" data-img="/og-loft-os.png" data-alt="Loft OS Technical Schematic">
              <span class="mono text-muted">02</span>
              <h2 class="serif">Loft OS</h2>
              <div class="work-metadata">
                <span>TYPE: System Schematic</span>
                <span>ROLE: Architecture</span>
                <span>STATUS: Governed framework</span>
              </div>
            </a>
            
            <a href="/work/assistant-recruiter-pro/" class="work-row" aria-current="false" data-img="/og-hiring.png" data-alt="Assistant Recruiter Pro Workflow">
              <span class="mono text-muted">03</span>
              <h2 class="serif">Assistant Recruiter Pro</h2>
              <div class="work-metadata">
                <span>TYPE: AI Workflow</span>
                <span>ROLE: Strategy logic</span>
                <span>STATUS: Evaluative</span>
              </div>
            </a>
            
            <a href="/work/sous-chef/" class="work-row" aria-current="false" data-img="/images/sous-chef/desktop.png" data-alt="Sous Chef Desktop Workspace">
              <span class="mono text-muted">04</span>
              <h2 class="serif">Sous Chef</h2>
              <div class="work-metadata">
                <span>TYPE: Implementation</span>
                <span>ROLE: Domain translation</span>
                <span>STATUS: Public repository</span>
              </div>
            </a>

            <div style="margin-top: 5rem;">
              <a href="/lab/" class="link-internal mono text-muted">Experiments & Explorations</a>
            </div>
          </div>
          
          <div class="work-preview">
            <img id="work-index-img" src="/images/rsp/session.png" alt="Resale Scanner Pro Mobile Interface" loading="lazy" />
          </div>
        </div>
      </section>
    `
  },
  'work/resale-scanner-pro/index.html': {
    title: 'Resale Scanner Pro — Angel Vergara',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">01 &middot; Working Product</span>
        <h1 class="serif">Resale Scanner Pro</h1>
        <p class="text-muted" style="max-width: 800px;">A mobile-first AI-assisted resale workflow built for a real family resale operation. Connects capture, market research, human judgment, listing preparation, and operating records.</p>
        
        <div class="project-ledger">
          <div class="ledger-item">
            <span class="mono">ROLE</span>
            <p>Product design &middot; workflow architecture &middot; implementation &middot; delivery</p>
          </div>
          <div class="ledger-item">
            <span class="mono">PRIMARY USER</span>
            <p>Reseller making sourcing, pricing, and listing decisions</p>
          </div>
          <div class="ledger-item">
            <span class="mono">SYSTEM</span>
            <p>React &middot; TypeScript &middot; Node &middot; Postgres &middot; AI + marketplace integrations</p>
          </div>
          <div class="ledger-item">
            <span class="mono">PROOF</span>
            <p>Sanitized case study from real operating use</p>
          </div>
        </div>
        
        <div class="decision-logic">
          <h2 class="serif" style="margin-bottom: 1rem;">The Stopping Rule</h2>
          <p class="text-muted" style="max-width: 600px; margin-bottom: 2rem;">The system is not designed to produce more AI output. It exists to help reach a bounded financial decision.</p>
          
          <span>Market evidence</span>
          <span>+</span>
          <span>Acquisition cost</span>
          <span>+</span>
          <span>Fees / shipping allowance</span>
          <span>+</span>
          <span>Uncertainty limits</span>
          <span>&darr;</span>
          <div class="decision-node">HUMAN DECISION</div>
          <div class="outcome">
            <b>Buy</b> or <b>Pass</b>
          </div>
        </div>

        <div style="margin: 5rem 0 3rem 0;">
          <h2 class="serif">Evidence, not a concept rendering.</h2>
          <p>These screens come from the working application in real operating use. They show the session, listing research, and sold-item evidence loop.</p>
        </div>

        <!-- Desktop Presentation -->
        <div class="rsp-layout">
          <div class="rsp-narrative evidence-spine">
            <div class="spine-node"></div>
            
            <button type="button" class="rsp-step" aria-selected="true" aria-controls="rsp-preview-img" data-img="/images/rsp/session.png" data-alt="Session-level signals and sourcing evaluate screen">
              <h3 class="serif">01 Evaluate</h3>
              <p class="text-muted" style="font-size: 0.95rem;">Session-level signals and sourcing decisions. Uncertainty remains visible and the operator stays in control.</p>
            </button>
            
            <button type="button" class="rsp-step" aria-selected="false" aria-controls="rsp-preview-img" data-img="/images/rsp/listings.png" data-alt="Comparable listings and act screen">
              <h3 class="serif">02 Act</h3>
              <p class="text-muted" style="font-size: 0.95rem;">Comparable listings beside the item decision. Human-reviewed optimization queue.</p>
            </button>
            
            <button type="button" class="rsp-step" aria-selected="false" aria-controls="rsp-preview-img" data-img="/images/rsp/sold.png" data-alt="Sold evidence and learning screen">
              <h3 class="serif">03 Learn</h3>
              <p class="text-muted" style="font-size: 0.95rem;">Sold evidence closes the loop. Track outcomes so the next decision starts with context.</p>
            </button>
          </div>
          
          <div class="rsp-viewport">
            <img id="rsp-preview-img" src="/images/rsp/session.png" alt="Session-level signals and sourcing evaluate screen" loading="lazy" />
          </div>
        </div>
        
        <!-- Mobile Snap Gallery -->
        <div class="rsp-mobile-gallery">
          <div class="rsp-snap-container">
            <div class="rsp-snap-slide">
              <img src="/images/rsp/session.png" alt="Evaluate Interface" />
              <div class="caption"><b>01 Evaluate</b> Session signals and estimated profit.</div>
            </div>
            <div class="rsp-snap-slide">
              <img src="/images/rsp/listings.png" alt="Act Interface" />
              <div class="caption"><b>02 Act</b> Human-reviewed optimization queue.</div>
            </div>
            <div class="rsp-snap-slide">
              <img src="/images/rsp/sold.png" alt="Learn Interface" />
              <div class="caption"><b>03 Learn</b> Sales and fulfillment evidence.</div>
            </div>
          </div>
          <div class="gallery-controls">
            <span>&larr; Swipe to view states &rarr;</span>
          </div>
        </div>
        
        ${projectNav('Work Index', '/work/', 'Loft OS', '/work/loft-os/')}
      </section>
    `
  },
  'work/loft-os/index.html': {
    title: 'Loft OS — Angel Vergara',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">02 &middot; System Schematic</span>
        <h1 class="serif">Loft OS</h1>
        <p class="text-muted" style="max-width: 800px;">A governed operating model for moving AI-assisted work from intake to verified closeout. Treats scope, authority, evidence, and recoverability as product requirements.</p>
        
        <div class="project-ledger">
          <div class="ledger-item">
            <span class="mono">SCOPE</span>
            <p>Explicit boundaries defining what the role is allowed to touch.</p>
          </div>
          <div class="ledger-item">
            <span class="mono">AUTHORITY</span>
            <p>What the agent can decide vs. what strictly requires human release.</p>
          </div>
          <div class="ledger-item">
            <span class="mono">EVIDENCE</span>
            <p>The verifiable artifacts that must exist before closeout is allowed.</p>
          </div>
        </div>

        <div style="margin: 4rem 0;">
          <h2 class="serif">A workflow that knows when to stop.</h2>
          <p>Governance expressed as usable product behavior. Select a node to inspect the delivery constraints.</p>
        </div>

        <div class="interactive-diagram" role="tablist" aria-label="Loft OS Workflow Diagram">
          <button type="button" role="tab" class="diagram-node" aria-selected="true" aria-controls="p1" tabindex="0">01 Request + Scope</button>
          <button type="button" role="tab" class="diagram-node" aria-selected="false" aria-controls="p2" tabindex="-1">02 AI-assisted role</button>
          <button type="button" role="tab" class="diagram-node" aria-selected="false" aria-controls="p3" tabindex="-1">03 Specialist work</button>
          <button type="button" role="tab" class="diagram-node" aria-selected="false" aria-controls="p4" tabindex="-1">04 Review + Evidence</button>
          <button type="button" role="tab" class="diagram-node decision" aria-selected="false" aria-controls="p5" tabindex="-1">05 Human decision</button>
          <button type="button" role="tab" class="diagram-node" aria-selected="false" aria-controls="p6" tabindex="-1">06 Closeout</button>
        </div>
        
        <div id="p1" role="tabpanel" class="diagram-panel" aria-hidden="false">
          <h3 class="serif">Request + Scope</h3>
          <p>Intent and scope become explicit. Named boundaries and explicit acceptance criteria are established before work begins.</p>
        </div>
        <div id="p2" role="tabpanel" class="diagram-panel" aria-hidden="true">
          <h3 class="serif">AI-assisted role</h3>
          <p>Agent is assigned with clear red lines and boundaries.</p>
        </div>
        <div id="p3" role="tabpanel" class="diagram-panel" aria-hidden="true">
          <h3 class="serif">Specialist work</h3>
          <p>The assigned work changes only authorized surfaces. Unpredictable behaviors are contained.</p>
        </div>
        <div id="p4" role="tabpanel" class="diagram-panel" aria-hidden="true">
          <h3 class="serif">Review + Evidence</h3>
          <p>Preflight state checks and repeatable verification. Human judgment remains visible.</p>
        </div>
        <div id="p5" role="tabpanel" class="diagram-panel decision-panel" aria-hidden="true">
          <h3 class="serif text-copper">Human decision</h3>
          <p class="text-copper">Keep high-impact choices under explicit human control. Material decisions stay explicit and require human authority for material release.</p>
        </div>
        <div id="p6" role="tabpanel" class="diagram-panel" aria-hidden="true">
          <h3 class="serif">Closeout</h3>
          <p>Reconcile evidence and confirm accountable ownership. Known-good closeout.</p>
        </div>
        
        <div style="margin-top: 5rem;">
          <h3 class="mono text-muted" style="margin-bottom: 1rem;">EVIDENCE CONTINUITY TRAIL</h3>
          <div class="continuity-trail">
            <span class="node">REQUEST</span> <span class="arrow">&rarr;</span>
            <span class="node">BOUNDED WORK</span> <span class="arrow">&rarr;</span>
            <span class="node">WORK ARTIFACT</span> <span class="arrow">&rarr;</span>
            <span class="node">REVIEW EVIDENCE</span> <span class="arrow">&rarr;</span>
            <span class="node decision-node">HUMAN DECISION</span> <span class="arrow">&rarr;</span>
            <span class="node">CLOSEOUT RECORD</span>
          </div>
        </div>

        <div class="tech-boundary-grid">
          <div>
            <h3>CURRENT IMPLEMENTATION</h3>
            <ul>
              <li>Python runtime / CLI orchestration</li>
              <li>OpenAI Agents SDK (optional live dependency)</li>
              <li>Deterministic routing & JSON-envelope patterns</li>
              <li>Managed Postgres / Supabase</li>
              <li>Notion operating surface</li>
              <li>GitHub / review / CI delivery patterns</li>
              <li>n8n</li>
            </ul>
          </div>
          <div>
            <h3>PUBLIC BOUNDARY</h3>
            <p class="mono text-muted" style="margin-bottom: 1rem;">Public pattern, private implementation.</p>
            <ul>
              <li><span class="text-green">SHOWN:</span> Workflow structure, handoff model, control points</li>
              <li><span class="text-copper">WITHHELD:</span> Private implementation detail, credentials, private URLs, operational infrastructure, sensitive records</li>
            </ul>
          </div>
        </div>
        
        ${projectNav('Resale Scanner Pro', '/work/resale-scanner-pro/', 'Assistant Recruiter Pro', '/work/assistant-recruiter-pro/')}
      </section>
    `
  },
  'work/assistant-recruiter-pro/index.html': {
    title: 'Assistant Recruiter Pro — Angel Vergara',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">03 &middot; AI Workflow</span>
        <h1 class="serif">Assistant Recruiter Pro</h1>
        <p class="text-muted" style="max-width: 800px;">Generates and iteratively refines Boolean search strategy from job-description constraints and structured user feedback.</p>
        
        <div style="margin: 4rem 0;">
          <h2 class="serif">From a messy job description to a reviewable search strategy.</h2>
          <p>Feedback is treated as a first-class input: relevance, false positives, and platform realism directly shape the next iteration.</p>
        </div>

        <div class="workbench-layout">
          <div class="workbench-controls evidence-spine" role="tablist" aria-label="Query Workbench Stages">
            <div class="spine-node"></div>
            <button type="button" role="tab" aria-selected="true" aria-controls="stage-1" tabindex="0">01 Constraints Input</button>
            <button type="button" role="tab" aria-selected="false" aria-controls="stage-2" tabindex="-1">02 Generated Strategy</button>
            <button type="button" role="tab" aria-selected="false" aria-controls="stage-3" tabindex="-1">03 Human Relevance Review</button>
            <button type="button" role="tab" aria-selected="false" aria-controls="stage-4" tabindex="-1">04 Revised Strategy</button>
          </div>
          
          <div class="workbench-display">
            
            <div id="stage-1" class="workbench-panel" role="tabpanel" aria-hidden="false">
              <h4 class="mono text-muted" style="margin-bottom: 1.5rem;">SANITIZED INPUT CONSTRAINTS</h4>
              <span class="chip">Senior Software Engineer</span>
              <span class="chip">Distributed Systems</span>
              <span class="chip">No frontend</span>
            </div>
            
            <div id="stage-2" class="workbench-panel" role="tabpanel" aria-hidden="true">
              <h4 class="mono text-muted" style="margin-bottom: 1.5rem;">GENERATED BOOLEAN</h4>
              <div class="query-block">
                ("senior software engineer" OR "backend engineer") AND ("distributed systems" OR "golang")
              </div>
            </div>
            
            <div id="stage-3" class="workbench-panel" role="tabpanel" aria-hidden="true">
              <h4 class="mono text-muted" style="margin-bottom: 1.5rem;">ILLUSTRATIVE HUMAN REVIEW</h4>
              <div class="query-block" style="opacity: 0.6;">
                ("senior software engineer" OR "backend engineer") AND ("distributed systems" OR "golang")
              </div>
              <div class="review-note">
                Reviewer feedback: Getting too many full-stack candidates. Add explicit exclusions for React/Frontend.
              </div>
            </div>
            
            <div id="stage-4" class="workbench-panel" role="tabpanel" aria-hidden="true">
              <h4 class="mono text-muted" style="margin-bottom: 1.5rem;">REVISED QUERY STATE</h4>
              <div class="query-block revised">
                ("senior software engineer" OR "backend engineer") AND ("distributed systems" OR "golang") <span style="background: rgba(21, 121, 71, 0.1); font-weight: bold; padding: 2px 4px;">-("react" OR "frontend" OR "css")</span>
              </div>
            </div>

          </div>
        </div>
        
        ${projectNav('Loft OS', '/work/loft-os/', 'Sous Chef', '/work/sous-chef/')}
      </section>
    `
  },
  'work/sous-chef/index.html': {
    title: 'Sous Chef — Angel Vergara',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">04 &middot; Supporting Implementation</span>
        <h1 class="serif">Sous Chef</h1>
        <p class="text-muted" style="max-width: 800px;">An AI-assisted culinary workspace for recipe workflows, pantry signals, cookbooks, and cooking-session continuity.</p>
        
        <div class="project-ledger" style="margin-top: 4rem;">
          <div class="ledger-item">
            <span class="mono">ROLE</span>
            <p>Product design &middot; hospitality-domain translation &middot; implementation</p>
          </div>
          <div class="ledger-item">
            <span class="mono">STATUS</span>
            <p>Public application repository / implementation reference</p>
          </div>
          <div class="ledger-item">
            <span class="mono">TECH</span>
            <p>React 19 &middot; TypeScript &middot; Vite &middot; Google GenAI &middot; Anthropic SDK &middot; Supabase</p>
          </div>
        </div>

        <div style="margin: 5rem 0 3rem 0;">
          <h2 class="serif">Domain translation in practice.</h2>
          <p>Leading with real interface evidence rather than conceptual claims.</p>
        </div>

        <div class="sous-gallery">
          <figure class="sous-figure">
            <img src="/images/sous-chef/desktop.png" alt="Desktop Interface showing cookbooks and recipe creation" loading="lazy" />
            <figcaption>
              <b>Recipe Creation &amp; Cookbooks</b>
              Structured creation and reusable organization interface.
            </figcaption>
          </figure>
          
          <figure class="sous-figure">
            <img src="/images/sous-chef/mobile.png" alt="Mobile Interface showing active session" loading="lazy" style="max-width: 320px; margin: 0 auto; display: block;" />
            <figcaption>
              <b>Cooking-Session Continuity</b>
              Pantry and ingredient context flowing into active mobile sessions.
            </figcaption>
          </figure>
        </div>
        
        ${projectNav('Assistant Recruiter Pro', '/work/assistant-recruiter-pro/', 'Back to top 2191', '#main')}
      </section>
    `
  },
  'about/index.html': {
    title: 'About — Angel Vergara',
    nav: 'about',
    content: `
      <section class="shell">
        <h1 class="serif" style="margin-bottom: 2rem;">I learned systems by running the work they have to support.</h1>
        <p class="text-muted" style="max-width: 800px; font-size: 1.25rem;">Adoption is not theoretical: training has to hold, handoffs have to survive pressure, and tools have to help people make the next decision.</p>
        
        <div style="margin: 5rem 0;">
          <div class="evidence-spine" style="padding-bottom: 4rem;">
            <div class="spine-node"></div>
            <span class="mono text-muted">01</span>
            <h3 class="serif" style="margin: 0.5rem 0 1rem 0; font-size: 2rem;">Operating Reality</h3>
            <p style="max-width: 700px;">Running frontline hospitality work teaches you where theoretical processes break. Messy handoffs, hidden exceptions, and pressure expose weak systems. Inventory constraints, vendor timing, and staffing variability act as the ultimate stress test for any operational design.</p>
          </div>
          
          <div class="evidence-spine" style="padding-bottom: 4rem;">
            <div class="spine-node"></div>
            <span class="mono text-muted">02</span>
            <h3 class="serif" style="margin: 0.5rem 0 1rem 0; font-size: 2rem;">Systems Translation</h3>
            <p style="max-width: 700px;">Those frontline realities became the foundation for systems thinking. Translating operating pressure into clear workflow mapping, requirement gathering, and accountable delivery. A system only works if the human control points are usable in production.</p>
          </div>
          
          <div class="evidence-spine">
            <div class="spine-node cobalt"></div>
            <span class="mono text-cobalt">03 (Current)</span>
            <h3 class="serif" style="margin: 0.5rem 0 1rem 0; font-size: 2rem;">AI-Assisted Workflows</h3>
            <p style="max-width: 700px;">This operating rigor now informs software implementation. Designing practical AI-assisted workflows requires bounding the work, capturing evidence, and making systems inspectable. It means building interfaces that keep human judgment visible and authoritative.</p>
          </div>
        </div>
      </section>
    `
  },
  'resume/index.html': {
    title: 'Resume — Angel Vergara',
    nav: 'resume',
    content: `
      <section class="shell">
        <h1 class="serif">Resume</h1>
        <p class="text-muted">Operations leadership, business systems, implementation, and AI-enabled workflows.</p>
        
        <div class="resume-layout" style="margin-top: 4rem;">
          <div class="resume-tabs evidence-spine" role="tablist" aria-label="Resume Variants">
            <div class="spine-node"></div>
            <button type="button" role="tab" class="resume-tab" aria-selected="true" aria-controls="general" tabindex="0">General (Recommended)</button>
            <button type="button" role="tab" class="resume-tab" aria-selected="false" aria-controls="implementation" tabindex="-1">Implementation & Onboarding</button>
            <button type="button" role="tab" class="resume-tab" aria-selected="false" aria-controls="systems" tabindex="-1">Business Systems & Ops</button>
            <button type="button" role="tab" class="resume-tab" aria-selected="false" aria-controls="ai" tabindex="-1">AI Workflow & Automation</button>
          </div>
          
          <div class="resume-content">
            <div id="general" role="tabpanel" class="resume-panel" aria-hidden="false">
              <span class="mono text-muted">RECOMMENDED START</span>
              <h2 class="serif" style="margin-top: 0.5rem;">General Resume</h2>
              <p>The strongest single-page representation: operations leadership, systems and process improvement, implementation capability, and human-controlled AI workflow proof in one consistent story.</p>
              <a href="/downloads/Angel_Vergara_Resume_General.pdf" class="link-download mono" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; border: 1px solid var(--spine);" download>Download PDF</a>
            </div>
            
            <div id="implementation" role="tabpanel" class="resume-panel" aria-hidden="true">
              <span class="mono text-muted">ROLE-SPECIFIC VARIANT</span>
              <h2 class="serif" style="margin-top: 0.5rem;">Implementation & Onboarding</h2>
              <p>Leads with bilingual operations leadership, training, configuration, workflow discovery, and customer-ready implementation.</p>
              <a href="/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf" class="link-download mono" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; border: 1px solid var(--spine);" download>Download PDF</a>
            </div>
            
            <div id="systems" role="tabpanel" class="resume-panel" aria-hidden="true">
              <span class="mono text-muted">ROLE-SPECIFIC VARIANT</span>
              <h2 class="serif" style="margin-top: 0.5rem;">Business Systems & Operations</h2>
              <p>Leads with process discovery, requirements, operating controls, reporting, vendor coordination, inventory, and systems thinking.</p>
              <a href="/downloads/Angel_Vergara_Resume_Business_Systems_Operations.pdf" class="link-download mono" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; border: 1px solid var(--spine);" download>Download PDF</a>
            </div>
            
            <div id="ai" role="tabpanel" class="resume-panel" aria-hidden="true">
              <span class="mono text-muted">ROLE-SPECIFIC VARIANT</span>
              <h2 class="serif" style="margin-top: 0.5rem;">AI Workflow & Automation</h2>
              <p>Leads with working AI product proof, governed AI workflows, human approval gates, recovery logic, and evidence-backed delivery.</p>
              <a href="/downloads/Angel_Vergara_Resume_AI_Workflow_Automation.pdf" class="link-download mono" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; border: 1px solid var(--spine);" download>Download PDF</a>
            </div>
          </div>
        </div>
      </section>
    `
  },
  'lab/index.html': {
    title: 'Experiments & Lab — Angel Vergara',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">Lab</span>
        <h1 class="serif">Experiments & Explorations</h1>
        <p class="text-muted" style="max-width: 800px;">Concepts and future directions separated from production proof.</p>
        
        <div style="margin-top: 4rem;">
          <div style="padding-bottom: 3rem; border-bottom: 1px solid var(--spine);">
            <span class="mono text-muted">Concept Prototype</span>
            <h3 class="serif" style="margin-top: 0.5rem;">The Office Chef</h3>
            <p>A clearly labeled product concept for turning invoices, vendor changes, inventory signals, and menu performance into an owner-ready operating brief. (Simulated Data)</p>
          </div>
          
          <div style="padding-top: 3rem;">
            <span class="mono text-muted">Exploration Direction</span>
            <h3 class="serif" style="margin-top: 0.5rem;">Agentic Orchestration</h3>
            <p>Investigating multi-agent collaboration with delegated sub-tasks and automated context sharing.</p>
          </div>
        </div>
      </section>
    `
  },
  'work/office-chef/index.html': {
    title: 'The Office Chef (Redirect)',
    nav: 'work',
    content: `
      <section class="shell">
        <h1 class="serif">This concept has moved to the Lab.</h1>
        <p>The Office Chef is an experimental prototype using simulated data.</p>
        <a href="/lab/" class="link-internal mono" style="margin-top: 2rem; display: inline-block;">View Experiments</a>
      </section>
    `
  },
  'hiring/index.html': {
    title: 'Hiring (Redirect)',
    nav: 'resume',
    content: `
      <section class="shell">
        <h1 class="serif">Hiring context is now centralized.</h1>
        <p>Please refer to the updated resume and work index.</p>
        <div style="display: flex; gap: 2rem; margin-top: 2rem;">
          <a href="/resume/" class="link-internal mono">Resume</a>
          <a href="/work/" class="link-internal mono">All Work</a>
        </div>
      </section>
    `
  }
};

for (const [relPath, data] of Object.entries(pages)) {
  const fullPath = path.join(__dirname, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, layout(data.title, data.content, data.nav), 'utf8');
}
