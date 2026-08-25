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
  <title>${title} — Angel Vergara</title>
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
        <a href="https://linkedin.com/in/angel-vergara-83861540" class="link-external" target="_blank">LinkedIn</a>
        <a href="https://github.com/avergara13" class="link-external" target="_blank">GitHub</a>
      </div>
    </div>
  </footer>
  <script src="/static-shell.js"></script>
</body>
</html>`;

const projectNav = (prev, prevUrl, next, nextUrl) => `
<div class="project-navigator">
  <a href="${prevUrl}" class="link-internal">&larr; ${prev}</a>
  <a href="/work/" class="link-internal">Work Index</a>
  <a href="${nextUrl}" class="link-internal">${next} &rarr;</a>
</div>
`;

const pages = {
  'index.html': {
    title: 'Angel Vergara',
    nav: '',
    content: `
      <section class="hero shell">
        <div class="hero-statement">
          <h1 class="serif">I design and build practical AI-assisted workflows and business systems.</h1>
          <p>I turn messy operational problems into usable, testable tools&mdash;with clear human control points and evidence-backed delivery.</p>
          <div style="margin-top: 2rem;">
            <a href="/work/" class="link-internal" style="font-weight: 500; font-size: 1.125rem; margin-right: 2rem;">View the work</a>
            <a href="/resume/" class="link-download text-muted mono">Resume</a>
          </div>
        </div>
        <div class="hero-handoff">
          <span>01 Request</span>
          <span>02 Role</span>
          <span>03 Work</span>
          <span>04 Review</span>
          <span class="text-copper">05 Human Decision</span>
          <span>06 Closeout</span>
        </div>
      </section>

      <section class="shell" style="padding-top: 0;">
        <h2 class="mono text-muted" style="font-size: 1rem; margin-bottom: 2rem;">Proof Index / 30-Second Scan</h2>
        
        <div class="proof-band">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">01 &middot; Working Product</span>
            <h3>Resale Scanner Pro</h3>
            <p class="text-muted">A mobile-first AI-assisted resale workflow built for a real operation.</p>
            <a href="/work/resale-scanner-pro/" class="link-internal mono">Inspect Proof</a>
          </div>
          <div class="proof-visual">
            <img src="/images/rsp/session.png" alt="Resale Scanner Pro" loading="lazy" />
          </div>
        </div>

        <div class="proof-band">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">02 &middot; System / Agent Workflow</span>
            <h3>Loft OS</h3>
            <p class="text-muted">A governed operating model for moving AI-assisted work from intake to verified closeout.</p>
            <a href="/work/loft-os/" class="link-internal mono">View Schematic</a>
          </div>
          <div class="proof-visual compact">
            <img src="/og-loft-os.png" alt="Loft OS Diagram" loading="lazy" />
          </div>
        </div>

        <div class="proof-band">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">03 &middot; AI Workflow</span>
            <h3>Assistant Recruiter Pro</h3>
            <p class="text-muted">Generates and iteratively refines Boolean search strategy from JD constraints.</p>
            <a href="/work/assistant-recruiter-pro/" class="link-internal mono">Review Logic</a>
          </div>
          <div class="proof-visual compact">
            <img src="/og-hiring.png" alt="Recruiter Logic" loading="lazy" />
          </div>
        </div>

        <div class="proof-band">
          <div class="proof-meta evidence-spine">
            <div class="spine-node"></div>
            <span class="mono">04 &middot; Supporting Implementation</span>
            <h3>Sous Chef</h3>
            <p class="text-muted">An AI-assisted culinary workspace for recipe workflows and cooking continuity.</p>
            <a href="/work/sous-chef/" class="link-internal mono">View Interface</a>
          </div>
          <div class="proof-visual compact">
            <img src="/images/sous-chef/desktop.png" alt="Sous Chef" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="shell" style="background: #f4f5f7; padding: 4rem; margin-top: 4rem;">
        <h2 class="serif">Operating Reality &rarr; Systems Thinking</h2>
        <p style="margin-bottom: 2rem;">I learned systems by running the work they have to support. Progressing from hands-on culinary roles to executive chef and general manager taught me to translate operating pressure into clearer workflows and usable systems.</p>
        <div class="mono text-muted" style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem; font-size: 0.75rem;">
          <span>Hospitality Operations</span> &rarr;
          <span>Systems Implementation</span> &rarr;
          <span class="text-cobalt">AI-Assisted Workflows</span>
        </div>
        <a href="/about/" class="link-internal mono">Read the story</a>
      </section>
    `
  },
  'work/index.html': {
    title: 'Work Index',
    nav: 'work',
    content: `
      <section class="shell">
        <h1 class="serif">Evidence Atlas</h1>
        <p class="text-muted">A technical field notebook of systems, workflows, and implementations.</p>
        
        <div class="work-index-layout" style="margin-top: 4rem;">
          <div class="work-list">
            <a href="/work/resale-scanner-pro/" class="work-row" data-img="/images/rsp/session.png">
              <div>
                <span class="mono text-muted">01 &middot; Working Product</span>
                <h2 class="serif">Resale Scanner Pro</h2>
              </div>
              <span class="mono link-internal">Inspect</span>
            </a>
            
            <a href="/work/loft-os/" class="work-row" data-img="/og-loft-os.png">
              <div>
                <span class="mono text-muted">02 &middot; System Schematic</span>
                <h2 class="serif">Loft OS</h2>
              </div>
              <span class="mono link-internal">Inspect</span>
            </a>
            
            <a href="/work/assistant-recruiter-pro/" class="work-row" data-img="/og-hiring.png">
              <div>
                <span class="mono text-muted">03 &middot; AI Workflow</span>
                <h2 class="serif">Assistant Recruiter Pro</h2>
              </div>
              <span class="mono link-internal">Inspect</span>
            </a>
            
            <a href="/work/sous-chef/" class="work-row" data-img="/images/sous-chef/desktop.png">
              <div>
                <span class="mono text-muted">04 &middot; Supporting Implementation</span>
                <h2 class="serif">Sous Chef</h2>
              </div>
              <span class="mono link-internal">Inspect</span>
            </a>

            <div style="margin-top: 4rem;">
              <a href="/lab/" class="link-internal mono text-muted">Experiments & Explorations</a>
            </div>
          </div>
          
          <div class="work-preview hide-on-mobile">
            <img id="work-index-img" src="/images/rsp/session.png" alt="Preview" loading="lazy" />
          </div>
        </div>
      </section>
    `
  },
  'work/resale-scanner-pro/index.html': {
    title: 'Resale Scanner Pro',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">01 &middot; Working Product</span>
        <h1 class="serif">Resale Scanner Pro</h1>
        <p class="text-muted" style="max-width: 800px;">A mobile-first AI-assisted resale workflow built for a real family resale operation. Connects capture, market research, human judgment, listing preparation, and operating records.</p>
        
        <div style="margin: 4rem 0;">
          <h2 class="serif">Evidence, not a concept rendering.</h2>
          <p>These screens come from the working application in real operating use. They show the session, listing research, and sold-item evidence loop.</p>
        </div>

        <div class="rsp-layout">
          <!-- Desktop Narrative -->
          <div class="rsp-narrative evidence-spine">
            <div class="spine-node"></div>
            
            <div class="rsp-step active link-interactive" data-img="/images/rsp/session.png">
              <h3 class="serif">01 Evaluate</h3>
              <p class="text-muted" style="font-size: 0.95rem;">Session-level signals and sourcing decisions. Uncertainty remains visible and the operator stays in control.</p>
            </div>
            
            <div class="rsp-step link-interactive" data-img="/images/rsp/listings.png">
              <h3 class="serif">02 Act</h3>
              <p class="text-muted" style="font-size: 0.95rem;">Comparable listings beside the item decision. Human-reviewed optimization queue.</p>
            </div>
            
            <div class="rsp-step link-interactive" data-img="/images/rsp/sold.png">
              <h3 class="serif">03 Learn</h3>
              <p class="text-muted" style="font-size: 0.95rem;">Sold evidence closes the loop. Track outcomes so the next decision starts with context.</p>
            </div>
          </div>
          
          <!-- Viewport (Sticky Desktop / Scrollable Mobile) -->
          <div class="rsp-viewport">
            <img id="rsp-preview-img" src="/images/rsp/session.png" alt="Resale Scanner Pro Interface" loading="lazy" />
            <!-- Mobile Fallbacks -->
            <img src="/images/rsp/listings.png" alt="Listings" class="mobile-only" style="display:none;" />
            <img src="/images/rsp/sold.png" alt="Sold" class="mobile-only" style="display:none;" />
          </div>
        </div>
        
        <style>
          @media (max-width: 900px) {
            .rsp-viewport img.mobile-only { display: block !important; }
            .rsp-viewport > img:first-child { display: block; }
          }
        </style>
        
        ${projectNav('Work Index', '/work/', 'Loft OS', '/work/loft-os/')}
      </section>
    `
  },
  'work/loft-os/index.html': {
    title: 'Loft OS',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">02 &middot; System Schematic</span>
        <h1 class="serif">Loft OS</h1>
        <p class="text-muted" style="max-width: 800px;">A governed operating model for moving AI-assisted work from intake to verified closeout. Treats scope, authority, evidence, and recoverability as product requirements.</p>
        
        <div style="margin: 4rem 0;">
          <h2 class="serif">A workflow that knows when to stop.</h2>
          <p>Governance expressed as usable product behavior. Select a node to inspect the delivery constraints.</p>
        </div>

        <div class="interactive-diagram">
          <div class="diagram-node active" data-target="p1">01 Request + Scope</div>
          <div class="diagram-node" data-target="p2">02 AI-assisted role</div>
          <div class="diagram-node" data-target="p3">03 Specialist work</div>
          <div class="diagram-node" data-target="p4">04 Review + Evidence</div>
          <div class="diagram-node decision" data-target="p5">05 Human decision</div>
          <div class="diagram-node" data-target="p6">06 Closeout</div>
        </div>
        
        <div id="p1" class="diagram-panel" style="display: block;">
          <h3 class="serif">Request + Scope</h3>
          <p>Intent and scope become explicit. Named boundaries and explicit acceptance criteria are established before work begins.</p>
        </div>
        <div id="p2" class="diagram-panel" style="display: none;">
          <h3 class="serif">AI-assisted role</h3>
          <p>Agent is assigned with clear red lines and boundaries.</p>
        </div>
        <div id="p3" class="diagram-panel" style="display: none;">
          <h3 class="serif">Specialist work</h3>
          <p>The assigned work changes only authorized surfaces. Unpredictable behaviors are contained.</p>
        </div>
        <div id="p4" class="diagram-panel" style="display: none;">
          <h3 class="serif">Review + Evidence</h3>
          <p>Preflight state checks and repeatable verification. Human judgment remains visible.</p>
        </div>
        <div id="p5" class="diagram-panel decision-panel" style="display: none;">
          <h3 class="serif text-copper">Human decision</h3>
          <p class="text-copper">Keep high-impact choices under explicit human control. Material decisions stay explicit and require human authority for material release.</p>
        </div>
        <div id="p6" class="diagram-panel" style="display: none;">
          <h3 class="serif">Closeout</h3>
          <p>Reconcile evidence and confirm accountable ownership. Known-good closeout.</p>
        </div>
        
        ${projectNav('Resale Scanner Pro', '/work/resale-scanner-pro/', 'Assistant Recruiter Pro', '/work/assistant-recruiter-pro/')}
      </section>
    `
  },
  'work/assistant-recruiter-pro/index.html': {
    title: 'Assistant Recruiter Pro',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">03 &middot; AI Workflow</span>
        <h1 class="serif">Assistant Recruiter Pro</h1>
        <p class="text-muted" style="max-width: 800px;">Generates and iteratively refines Boolean search strategy from job-description constraints and structured user feedback.</p>
        
        <div style="margin: 4rem 0;">
          <h2 class="serif">Human judgment improves the strategy over time.</h2>
          <p>Feedback is treated as a first-class input: relevance, false positives, and platform realism directly shape the next iteration.</p>
        </div>

        <div class="query-workbench evidence-spine">
          <div class="spine-node"></div>
          
          <div class="query-stage">
            <h4>01 Constraints Input</h4>
            <span class="chip">Senior Software Engineer</span>
            <span class="chip">Distributed Systems</span>
            <span class="chip">No frontend</span>
          </div>
          
          <div class="query-stage">
            <h4>02 Generated Boolean Strategy</h4>
            <div class="mono" style="background: #fff; padding: 1rem; border: 1px solid var(--spine);">
              ("senior software engineer" OR "backend engineer") AND ("distributed systems" OR "golang")
            </div>
          </div>
          
          <div class="query-stage">
            <h4>03 Human Relevance Review</h4>
            <div class="review-note">
              Recruiter feedback: Getting too many full-stack candidates. Add explicit exclusions for React/Frontend.
            </div>
          </div>
          
          <div class="query-stage">
            <h4>04 Revised Strategy</h4>
            <div class="mono" style="background: #fff; padding: 1rem; border: 1px solid var(--green);">
              ("senior software engineer" OR "backend engineer") AND ("distributed systems" OR "golang") -("react" OR "frontend" OR "css")
            </div>
          </div>
        </div>
        
        ${projectNav('Loft OS', '/work/loft-os/', 'Sous Chef', '/work/sous-chef/')}
      </section>
    `
  },
  'work/sous-chef/index.html': {
    title: 'Sous Chef',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">04 &middot; Supporting Implementation</span>
        <h1 class="serif">Sous Chef</h1>
        <p class="text-muted" style="max-width: 800px;">An AI-assisted culinary workspace for recipe workflows, pantry signals, cookbooks, and cooking-session continuity.</p>
        
        <div style="margin: 4rem 0;">
          <h2 class="serif">Domain translation in practice.</h2>
          <p>Leading with real interface evidence rather than conceptual claims.</p>
        </div>

        <div class="sous-gallery">
          <img src="/images/sous-chef/desktop.png" alt="Desktop Interface" loading="lazy" />
          <img src="/images/sous-chef/mobile.png" alt="Mobile Interface" loading="lazy" />
        </div>
        
        ${projectNav('Assistant Recruiter Pro', '/work/assistant-recruiter-pro/', 'Work Index', '/work/')}
      </section>
    `
  },
  'about/index.html': {
    title: 'About',
    nav: 'about',
    content: `
      <section class="shell">
        <h1 class="serif">Operating Reality &rarr; Systems Thinking</h1>
        <p class="text-muted" style="max-width: 800px;">I learned systems by running the work they have to support. Adoption is not theoretical: training has to hold, handoffs have to survive pressure, and tools have to help people make the next decision.</p>
        
        <div style="margin: 4rem 0;">
          <div class="evidence-spine" style="padding-bottom: 3rem;">
            <div class="spine-node"></div>
            <span class="mono text-muted">Phase 01</span>
            <h3 class="serif" style="margin-top: 0.5rem;">Hospitality Operations</h3>
            <p>Messy handoffs, hidden exceptions, and pressure that exposes weak systems. Inventory, vendor pressure, and staffing variability act as the ultimate stress test for any process.</p>
          </div>
          
          <div class="evidence-spine" style="padding-bottom: 3rem;">
            <div class="spine-node"></div>
            <span class="mono text-muted">Phase 02</span>
            <h3 class="serif" style="margin-top: 0.5rem;">Systems Implementation</h3>
            <p>Translating operating pressure into clear workflows, visible ownership, and human-controlled automation. Requirements mapping, configuration, and accountable delivery.</p>
          </div>
          
          <div class="evidence-spine">
            <div class="spine-node cobalt" style="background: var(--cobalt); border-color: var(--cobalt);"></div>
            <span class="mono text-cobalt">Phase 03 (Current)</span>
            <h3 class="serif" style="margin-top: 0.5rem;">AI-Assisted Workflows</h3>
            <p>Designing practical AI implementations that keep human judgment visible. Bounding the work, capturing evidence, and making systems inspectable.</p>
          </div>
        </div>
      </section>
    `
  },
  'resume/index.html': {
    title: 'Resume',
    nav: 'resume',
    content: `
      <section class="shell">
        <h1 class="serif">Resume</h1>
        <p class="text-muted">Operations leadership, business systems, implementation, and AI-enabled workflows.</p>
        
        <div class="resume-layout" style="margin-top: 4rem;">
          <div class="resume-tabs evidence-spine">
            <div class="spine-node"></div>
            <button class="resume-tab active" data-target="general">General (Recommended)</button>
            <button class="resume-tab" data-target="implementation">Implementation & Onboarding</button>
            <button class="resume-tab" data-target="systems">Business Systems & Ops</button>
            <button class="resume-tab" data-target="ai">AI Workflow & Automation</button>
          </div>
          
          <div class="resume-content">
            <div id="general" class="resume-panel active">
              <h2 class="serif">General Resume</h2>
              <p>The strongest single-page representation: operations leadership, systems and process improvement, implementation capability, and human-controlled AI workflow proof in one consistent story.</p>
              <a href="/downloads/Angel_Vergara_Resume_General.pdf" class="link-download mono" download>Download PDF</a>
            </div>
            
            <div id="implementation" class="resume-panel">
              <h2 class="serif">Implementation & Onboarding</h2>
              <p>Leads with bilingual operations leadership, training, configuration, workflow discovery, and customer-ready implementation.</p>
              <a href="/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf" class="link-download mono" download>Download PDF</a>
            </div>
            
            <div id="systems" class="resume-panel">
              <h2 class="serif">Business Systems & Operations</h2>
              <p>Leads with process discovery, requirements, operating controls, reporting, vendor coordination, inventory, and systems thinking.</p>
              <a href="/downloads/Angel_Vergara_Resume_Business_Systems_Operations.pdf" class="link-download mono" download>Download PDF</a>
            </div>
            
            <div id="ai" class="resume-panel">
              <h2 class="serif">AI Workflow & Automation</h2>
              <p>Leads with working AI product proof, governed AI workflows, human approval gates, recovery logic, and evidence-backed delivery.</p>
              <a href="/downloads/Angel_Vergara_Resume_AI_Workflow_Automation.pdf" class="link-download mono" download>Download PDF</a>
            </div>
          </div>
        </div>
      </section>
    `
  },
  'lab/index.html': {
    title: 'Experiments',
    nav: 'work',
    content: `
      <section class="shell">
        <span class="mono text-muted">Lab</span>
        <h1 class="serif">Experiments & Explorations</h1>
        <p class="text-muted" style="max-width: 800px;">Concepts, future roadmap items, and simulated data environments separated from production proof.</p>
        
        <div style="margin-top: 4rem;">
          <div style="padding-bottom: 3rem; border-bottom: 1px solid var(--spine);">
            <span class="mono text-muted">Concept Prototype</span>
            <h3 class="serif" style="margin-top: 0.5rem;">The Office Chef</h3>
            <p>A clearly labeled product concept for turning invoices, vendor changes, inventory signals, and menu performance into an owner-ready operating brief. (Simulated Data)</p>
          </div>
          
          <div style="padding-top: 3rem;">
            <span class="mono text-muted">Future Exploration</span>
            <h3 class="serif" style="margin-top: 0.5rem;">Agentic Orchestration</h3>
            <p>Expanded multi-agent collaboration with delegated sub-tasks and automated context sharing.</p>
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
        <a href="/lab/" class="link-internal mono">View Experiments</a>
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
          <a href="/work/" class="link-internal mono">Work Index</a>
        </div>
      </section>
    `
  }
};

for (const [relPath, data] of Object.entries(pages)) {
  const fullPath = path.join(__dirname, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, layout(data.title, data.content, data.nav), 'utf8');
  console.log(`Generated ${relPath}`);
}
