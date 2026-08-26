document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const menuBtn = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.navlinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('is-open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Work Index Interaction
  const workRows = document.querySelectorAll('.work-row');
  const previewImg = document.getElementById('work-index-img');

  if (workRows.length > 0 && previewImg) {
    const updatePreview = (row) => {
      workRows.forEach(r => r.setAttribute('data-preview-active', 'false'));
      row.setAttribute('data-preview-active', 'true');

      const newSrc = row.getAttribute('data-img');
      if (newSrc) {
        previewImg.style.opacity = 0;
        setTimeout(() => {
          previewImg.src = newSrc;
          previewImg.alt = `Preview for ${row.querySelector('h2').textContent}`;
          previewImg.style.opacity = 1;
        }, 150);
      }
    };

    workRows.forEach(row => {
      row.addEventListener('mouseenter', () => updatePreview(row));
      row.addEventListener('focus', () => updatePreview(row));
    });
  }

  // Generic Tab/Diagram Logic (used for Loft OS, ARP Workbench, and Resume)
  // Finds all tablists, ensuring Arrow Key navigation and explicit ARIA + hidden state
  const tabLists = document.querySelectorAll('[role="tablist"]');
  tabLists.forEach(tabList => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    if (tabs.length === 0) return;

    // Create an array of panels based on aria-controls
    const panels = Array.from(tabs).map(tab => {
      const panelId = tab.getAttribute('aria-controls');
      return document.getElementById(panelId);
    }).filter(Boolean);

    const activateTab = (tabToActivate) => {
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(p => {
        p.setAttribute('aria-hidden', 'true');
        p.hidden = true;
      });

      tabToActivate.setAttribute('aria-selected', 'true');
      tabToActivate.setAttribute('tabindex', '0');

      const targetId = tabToActivate.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.setAttribute('aria-hidden', 'false');
        targetPanel.hidden = false;
      }

      tabToActivate.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (e) => {
        let newIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        }

        if (newIndex !== null) {
          e.preventDefault();
          activateTab(tabs[newIndex]);
        }
      });
    });
  });

  // RSP Sticky Steps (Evidence Selectors using aria-pressed)
  const rspSteps = document.querySelectorAll('.rsp-step');
  const rspImg = document.getElementById('rsp-preview-img');

  if (rspSteps.length > 0 && rspImg) {
    rspSteps.forEach(step => {
      step.addEventListener('click', () => {
        rspSteps.forEach(s => s.setAttribute('aria-pressed', 'false'));
        step.setAttribute('aria-pressed', 'true');

        const newSrc = step.getAttribute('data-img');
        if (newSrc) {
          rspImg.style.opacity = 0;
          setTimeout(() => {
            rspImg.src = newSrc;
            rspImg.alt = `Screenshot of ${step.querySelector('h3').textContent}`;
            rspImg.style.opacity = 1;
          }, 150);
        }
      });
    });
  }

  // Loft OS Trace Flow Animation
  const traceTrigger = document.getElementById('trace-trigger');
  if (traceTrigger) {
    traceTrigger.addEventListener('click', () => {
      const stages = document.querySelectorAll('.trace-stage');
      if (stages.length === 0) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Update button state
      traceTrigger.setAttribute('aria-pressed', 'true');
      traceTrigger.disabled = true;
      traceTrigger.style.opacity = '0.5';
      traceTrigger.textContent = 'Traced';

      if (prefersReducedMotion) {
        stages.forEach(s => s.classList.add('is-active'));
      } else {
        // Sequentially activate each stage (~1500ms total for 6 stages)
        stages.forEach((stage, index) => {
          setTimeout(() => {
            stage.classList.add('is-active');
          }, index * 250);
        });
      }
    });
  }

  // Mess to Mission Interaction (Phase 2B & 3A-1)
  const FIXTURES = {
    overloaded_day: {
      id: 'overloaded_day',
      input: "Need to finish the Q3 presentation today but I only have 3 hours. Also need to reply to that important email from David. Waiting on feedback for the design comps. Should probably go to the gym and get groceries. Oh and maybe I can start brainstorming that new lower-priority marketing idea if I have time.",
      triage_summary: "6 items · 1 blocker · 1 constraint",
      planning_summary: "2 outcomes · 4 ready · 1 deferred",
      assistant_summary: "1 next action · 3 today items",
      timing: [0.8, 1.2, 0.9],
      mission: {
        nextAction: { action: "Finish the Q3 presentation", estimate: "~90 min", inferred: true },
        outcomes: [
          "Deliver Q3 presentation within constrained window",
          "Clear important communication with David",
          "Protect essential personal errands if time permits"
        ],
        today: [
          { action: "Reply to important email from David" },
          { action: "Get groceries", state: "Errand" }
        ],
        blockers: [
          { blocking: "Design comps", blocked: "Finalizing related presentation slides", unlock: "Feedback received from reviewer" }
        ],
        deferred: [
          { item: "Go to the gym", reason: "Insufficient time within 3-hour constraint" },
          { item: "Marketing brainstorm", reason: "Lower priority against hard deadlines" }
        ],
        assumptions: [
          "Presentation work estimate is approximate based on the 3-hour total constraint."
        ]
      },
      supportedRefinements: [
        "I only have 90 minutes.",
        "Move nonessential work to tomorrow."
      ],
      refinements: {
        "i only have 90 minutes": {
          constraint_label: "Only 90 minutes available",
          planning_summary: "2 outcomes · 2 ready · 3 deferred",
          assistant_summary: "1 next action · 2 today items",
          mission: {
            nextAction: { action: "Finish the most important remaining portion of the Q3 presentation", estimate: "~60 min", inferred: true },
            outcomes: [
              "Make meaningful progress on the Q3 presentation",
              "Clear the important email from David"
            ],
            today: [
              { action: "Q3 presentation", estimate: "~60 min", state: "estimated" },
              { action: "Reply to David", estimate: "~15 min", state: "estimated" }
            ],
            blockers: [
              { blocking: "Design comps", blocked: "Finalizing related presentation slides", unlock: "Feedback received from reviewer" }
            ],
            deferred: [
              { item: "Groceries", reason: "Outside the 90-minute work window" },
              { item: "Go to the gym", reason: "Deferred by time constraint" },
              { item: "Marketing brainstorm", reason: "Lower priority" }
            ],
            assumptions: []
          }
        },
        "move nonessential work to tomorrow": {
          constraint_label: "Move nonessential work to tomorrow",
          planning_summary: "2 outcomes · 3 ready · 2 deferred",
          assistant_summary: "1 next action · 2 today items",
          mission: {
            nextAction: { action: "Continue the Q3 presentation.", estimate: "", inferred: false },
            outcomes: [
              "Advance the Q3 presentation",
              "Clear the important email from David"
            ],
            today: [
              { action: "Q3 presentation" },
              { action: "Reply to David" }
            ],
            blockers: [
              { blocking: "Design comps", blocked: "Finalizing related presentation slides", unlock: "Feedback received from reviewer" }
            ],
            deferred: [
              { item: "Go to the gym", reason: "Nonessential today" },
              { item: "Marketing brainstorm", reason: "Lower priority" },
              { item: "Groceries", reason: "Not essential to current work window" }
            ],
            assumptions: []
          }
        }
      }
    },
    blocked_project: {
      id: 'blocked_project',
      input: "Goal is to ship the website change today. I'm waiting on access approval from IT for the deployment environment. I can do the documentation right now though. Need to also do QA work on the staging link. Unrelated: urgent request from sales to pull a report. And we need to make a decision on the vendor contract.",
      triage_summary: "6 items · 1 blocker · 1 decision",
      planning_summary: "3 outcomes · 3 ready · 2 deferred",
      assistant_summary: "1 next action · 4 today items",
      timing: [0.9, 1.3, 0.8],
      mission: {
        nextAction: { action: "Complete documentation for the website change", estimate: "~45 min", inferred: true },
        outcomes: [
          "Maintain forward momentum while IT access is blocked",
          "Resolve urgent sales request",
          "Clear QA staging queue"
        ],
        today: [
          { action: "Perform QA work on the staging link" },
          { action: "Pull urgent report for sales", state: "Urgent" }
        ],
        blockers: [
          { blocking: "IT access approval", blocked: "Website deployment environment", unlock: "Access granted by IT" }
        ],
        deferred: [
          { item: "Ship website change", reason: "Blocked on deployment access" }
        ],
        humanDecisions: [
          { context: "Vendor contract", choice: "Choose whether contract review remains today or moves after the urgent sales request." }
        ],
        assumptions: [
          "Documentation can be completed without IT deployment access."
        ]
      },
      supportedRefinements: [
        "This just became urgent.",
        "I’m waiting on someone for this."
      ],
      refinements: {
        "this just became urgent": {
          constraint_label: "This just became urgent",
          planning_summary: "3 outcomes · 3 ready · 2 deferred",
          assistant_summary: "1 next action · 4 today items",
          mission: {
            nextAction: { action: "Complete the urgent sales report.", estimate: "", inferred: false },
            outcomes: [
              "Resolve urgent sales request immediately",
              "Maintain forward momentum while IT access is blocked",
              "Clear QA staging queue"
            ],
            today: [
              { action: "Complete documentation for the website change" },
              { action: "Perform QA work on the staging link" }
            ],
            blockers: [
              { blocking: "IT access approval", blocked: "Website deployment environment", unlock: "Access granted by IT" }
            ],
            deferred: [
              { item: "Ship website change", reason: "Blocked on deployment access" }
            ],
            humanDecisions: [
              { context: "Vendor contract", choice: "Choose whether contract review remains today or moves after the urgent sales request." }
            ],
            assumptions: []
          }
        },
        "i’m waiting on someone for this": {
          constraint_label: "I’m waiting on someone for this",
          planning_summary: "3 outcomes · 3 ready · 2 deferred",
          assistant_summary: "1 next action · 3 today items",
          mission: {
            nextAction: { action: "Complete documentation for the website change", estimate: "~45 min", inferred: true },
            outcomes: [
              "Maintain forward momentum while IT access is blocked",
              "Resolve urgent sales request"
            ],
            today: [
              { action: "Perform QA work on the staging link" },
              { action: "Pull urgent report for sales", state: "Urgent" }
            ],
            blockers: [
              { blocking: "IT access approval", blocked: "Website deployment environment", unlock: "Access granted by IT" }
            ],
            deferred: [
              { item: "Ship website change", reason: "Waiting on someone for deployment access" }
            ],
            humanDecisions: [
              { context: "Vendor contract", choice: "Decide priority compared to sales report." }
            ],
            assumptions: [
              "Waiting work is safely parked until access is granted."
            ]
          }
        }
      }
    },
    brain_dump: {
      id: 'brain_dump',
      input: "Don't forget to renew the software license by Friday. Thinking about how the team structure isn't scaling well... worrying about the Q4 targets. Need the finalized budget before I can hire. Also a note: the coffee machine is broken again.",
      triage_summary: "5 items · 1 blocker · 1 deadline",
      planning_summary: "2 outcomes · 2 ready · 2 deferred",
      assistant_summary: "1 next action · 2 today items",
      timing: [0.7, 1.1, 0.9],
      mission: {
        nextAction: { action: "Renew the software license", estimate: "Deadline: Friday", inferred: false },
        outcomes: [
          "Secure tooling access before license expiration",
          "Document organizational and budget constraints"
        ],
        today: [
          { action: "Request finalized budget for hiring plan" }
        ],
        blockers: [
          { blocking: "Finalized budget", blocked: "Hiring new team members", unlock: "Budget approved and released" }
        ],
        deferred: [
          { item: "Team structure scaling", reason: "Requires budget clarity and dedicated planning session" }
        ],
        assumptions: [
          "Coffee machine note is non-actionable venting.",
          "Q4 targets worry is logged for context but lacks an immediate action today."
        ]
      },
      supportedRefinements: [
        "I only have 90 minutes.",
        "Move nonessential work to tomorrow."
      ],
      refinements: {
        "i only have 90 minutes": {
          constraint_label: "Only 90 minutes available",
          planning_summary: "1 outcomes · 1 ready · 3 deferred",
          assistant_summary: "1 next action · 1 today items",
          mission: {
            nextAction: { action: "Renew the software license.", estimate: "Deadline: Friday", inferred: false },
            outcomes: [
              "Secure tooling access before license expiration"
            ],
            today: [],
            blockers: [
              { blocking: "Finalized budget", blocked: "Hiring new team members", unlock: "Budget approved and released" }
            ],
            deferred: [
              { item: "Team structure scaling", reason: "Requires dedicated planning session" },
              { item: "Q4 targets planning", reason: "Deferred by 90-minute time constraint" },
              { item: "Request finalized budget", reason: "Deferred by 90-minute time constraint" }
            ],
            assumptions: [
              "Coffee machine note is non-actionable venting - no requested action."
            ]
          }
        },
        "move nonessential work to tomorrow": {
          constraint_label: "Move nonessential work to tomorrow",
          planning_summary: "2 outcomes · 1 ready · 3 deferred",
          assistant_summary: "1 next action · 1 today items",
          mission: {
            nextAction: { action: "Renew the software license.", estimate: "", inferred: false },
            outcomes: [
              "Protect deadline-sensitive license work",
              "Defer exploratory structural planning"
            ],
            today: [],
            blockers: [
              { blocking: "Finalized budget", blocked: "Hiring new team members", unlock: "Budget approved and released" }
            ],
            deferred: [
              { item: "Team structure scaling", reason: "Exploratory, lower priority" },
              { item: "Q4 targets", reason: "Deferred to tomorrow" },
              { item: "Request finalized budget", reason: "Deferred to tomorrow" }
            ],
            assumptions: [
              "Coffee machine note is non-actionable venting - no requested action."
            ]
          }
        }
      }
    }
  };

  const m2mTextarea = document.getElementById('m2m-textarea');
  const m2mRunBtn = document.getElementById('m2m-run-btn');
  const m2mSampleBtns = document.querySelectorAll('.m2m-sample-btn');
  const m2mWarning = document.getElementById('m2m-custom-warning');
  const m2mAnnouncer = document.getElementById('m2m-announcer');

  const m2mMissionPanel = document.getElementById('m2m-mission-panel');
  const m2mMissionPlaceholder = document.getElementById('m2m-mission-placeholder');
  const m2mMissionPopulated = document.getElementById('m2m-mission-populated');
  const m2mMissionHeading = document.getElementById('m2m-mission-heading');
  const m2mMissionBody = document.getElementById('m2m-mission-body');
  const m2mResetBtn = document.getElementById('m2m-reset-btn');
  const m2mRefineInput = document.getElementById('m2m-refine-input');
  const m2mRefineBtn = document.getElementById('m2m-refine-btn');
  const m2mRefineSampleBtn = document.getElementById('m2m-refine-sample-btn');
  const m2mRefineWarning = document.getElementById('m2m-refine-warning');
  const m2mPipelineHelper = document.getElementById('m2m-pipeline-helper');
  const m2mRevisedBadge = document.getElementById('m2m-revised-badge');
  const m2mHumanConstraint = document.getElementById('m2m-human-constraint');
  const m2mHumanConstraintText = document.getElementById('m2m-human-constraint-text');

  const m2mRefineWarningContainer = document.getElementById('m2m-refine-warning-container');
  const m2mStartOverBtn = document.getElementById('m2m-start-over-btn');
  const m2mRefineSamples = document.getElementById('m2m-refine-samples');

  let currentFixtureId = null;
  let currentRunId = 0;
  let revisionCount = 0;

  if (m2mTextarea && m2mRunBtn) {
    // Helper for safe DOM element creation
    const el = (tag, className = '', textContent = '') => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (textContent) element.textContent = textContent;
      return element;
    };

    const runStage = async (stageNum, name, summary, timeSeconds, runId) => {
      if (currentRunId !== runId) throw new Error('Aborted');

      const statusEl = document.getElementById(`m2m-status-${stageNum}`);
      const descEl = document.getElementById(`m2m-desc-${stageNum}`);
      const summaryEl = document.getElementById(`m2m-summary-${stageNum}`);
      const stageEl = document.getElementById(`m2m-stage-${stageNum}`);

      m2mAnnouncer.textContent = `${name} stage working.`;
      statusEl.textContent = "WORKING";
      statusEl.className = "m2m-status mono working";
      stageEl.classList.add("active");

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scale = prefersReducedMotion ? 0.1 : 1;
      await new Promise(r => setTimeout(r, timeSeconds * 1000 * scale));

      if (currentRunId !== runId) throw new Error('Aborted');

      statusEl.textContent = "VALIDATED";
      statusEl.className = "m2m-status mono validated";
      stageEl.classList.remove("active");

      descEl.hidden = true;

      // Update summary safely without innerHTML
      summaryEl.textContent = summary;
      summaryEl.appendChild(document.createElement('br'));
      const timeSpan = el('span', 'text-muted');
      timeSpan.style.fontSize = '0.75rem';
      timeSpan.textContent = `${timeSeconds.toFixed(2)}s`;
      summaryEl.appendChild(timeSpan);

      summaryEl.hidden = false;
      m2mAnnouncer.textContent = `${name} stage validated.`;
    };

    // Render Mission Data safely
    const renderMission = (mission) => {
      m2mMissionBody.innerHTML = '';

      // 1. DO THIS NEXT
      if (mission.nextAction) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'DO THIS NEXT'));

        const box = el('div', 'm2m-dominant-action');
        box.appendChild(el('div', 'm2m-dominant-text', mission.nextAction.action));

        if (mission.nextAction.estimate) {
          const est = el('div', 'm2m-dominant-meta');
          est.textContent = mission.nextAction.inferred
            ? `${mission.nextAction.estimate} · estimated`
            : mission.nextAction.estimate;
          box.appendChild(est);
        }
        sec.appendChild(box);
        m2mMissionBody.appendChild(sec);
      }

      // 2. TOP OUTCOMES
      if (mission.outcomes && mission.outcomes.length > 0) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'TOP OUTCOMES'));
        const list = el('ul', 'm2m-list');
        mission.outcomes.slice(0, 3).forEach(o => {
          list.appendChild(el('li', 'm2m-list-item', o));
        });
        sec.appendChild(list);
        m2mMissionBody.appendChild(sec);
      }

      // 3. TODAY
      if (mission.today && mission.today.length > 0) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'TODAY'));
        const list = el('ul', 'm2m-list');
        mission.today.forEach(t => {
          const li = el('li', 'm2m-list-item');
          li.appendChild(el('span', '', t.action));

          if (t.estimate || t.state) {
            const metaWrap = el('div');
            if (t.estimate) metaWrap.appendChild(el('span', 'm2m-meta-pill', t.estimate));
            if (t.state) metaWrap.appendChild(el('span', 'm2m-meta-pill', t.state));
            li.appendChild(metaWrap);
          }
          list.appendChild(li);
        });
        sec.appendChild(list);
        m2mMissionBody.appendChild(sec);
      }

      // 4. BLOCKERS
      if (mission.blockers && mission.blockers.length > 0) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'BLOCKERS'));
        mission.blockers.forEach(b => {
          const block = el('div', 'm2m-blocker-block');

          const r1 = el('div', 'm2m-blocker-row');
          r1.appendChild(el('span', 'm2m-blocker-label', 'WAITING ON'));
          r1.appendChild(el('div', '', b.blocking));
          block.appendChild(r1);

          const r2 = el('div', 'm2m-blocker-row');
          r2.appendChild(el('span', 'm2m-blocker-label', 'BLOCKS'));
          r2.appendChild(el('div', '', b.blocked));
          block.appendChild(r2);

          const r3 = el('div', 'm2m-blocker-row');
          r3.appendChild(el('span', 'm2m-blocker-label', 'UNLOCK'));
          r3.appendChild(el('div', '', b.unlock));
          block.appendChild(r3);

          sec.appendChild(block);
        });
        m2mMissionBody.appendChild(sec);
      }

      // 5. DEFERRED
      if (mission.deferred && mission.deferred.length > 0) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'DEFERRED'));
        const list = el('ul', 'm2m-list');
        mission.deferred.forEach(d => {
          const li = el('li', 'm2m-list-item');
          li.style.flexDirection = 'column';
          li.style.alignItems = 'flex-start';
          li.style.gap = '0.25rem';
          li.appendChild(el('div', '', d.item));
          const reason = el('div', 'text-muted');
          reason.style.fontSize = '0.8rem';
          reason.textContent = `Deferred — ${d.reason}`;
          li.appendChild(reason);
          list.appendChild(li);
        });
        sec.appendChild(list);
        m2mMissionBody.appendChild(sec);
      }

      // 6. HUMAN DECISIONS
      if (mission.humanDecisions && mission.humanDecisions.length > 0) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'HUMAN DECISIONS'));
        mission.humanDecisions.forEach(hd => {
          const block = el('div', 'm2m-decision-block');
          block.appendChild(el('span', 'm2m-decision-label', 'HUMAN DECISION'));
          block.appendChild(el('strong', '', hd.context));
          const p = el('p');
          p.style.margin = '0.25rem 0 0 0';
          p.textContent = hd.choice;
          block.appendChild(p);
          sec.appendChild(block);
        });
        m2mMissionBody.appendChild(sec);
      }

      // 7. ASSUMPTIONS
      if (mission.assumptions && mission.assumptions.length > 0) {
        const sec = el('div', 'm2m-mission-section');
        sec.appendChild(el('span', 'm2m-section-label', 'ASSUMPTIONS'));
        const list = el('ul', 'm2m-list');
        mission.assumptions.forEach(a => {
          const li = el('li', 'm2m-list-item m2m-assumptions', a);
          list.appendChild(li);
        });
        sec.appendChild(list);
        m2mMissionBody.appendChild(sec);
      }
    };

    // Reset Pipeline Visuals
    const resetPipeline = () => {
      currentRunId++; // Increment to invalidate any running timers
      revisionCount = 0;

      [1, 2, 3].forEach(i => {
        const statusEl = document.getElementById(`m2m-status-${i}`);
        const descEl = document.getElementById(`m2m-desc-${i}`);
        const summaryEl = document.getElementById(`m2m-summary-${i}`);
        const stageEl = document.getElementById(`m2m-stage-${i}`);

        statusEl.textContent = "WAITING";
        statusEl.className = "m2m-status mono";
        stageEl.classList.remove("active");
        descEl.hidden = false;
        summaryEl.hidden = true;
      });

      m2mMissionPanel.classList.add('empty');
      m2mMissionPanel.classList.remove('completed');
      m2mMissionPlaceholder.hidden = false;
      m2mMissionPopulated.hidden = true;
      m2mMissionBody.innerHTML = '';

      m2mRunBtn.disabled = false;
      m2mRunBtn.textContent = 'Run the agents';
      m2mTextarea.disabled = false;

      // Reset refinement states
      m2mPipelineHelper.hidden = true;
      m2mRevisedBadge.hidden = true;
      m2mHumanConstraint.hidden = true;
      m2mRefineInput.value = '';
      m2mRefineInput.disabled = false;
      m2mRefineBtn.disabled = false;
      m2mRefineWarningContainer.hidden = true;
      m2mRefineSamples.innerHTML = '';
    };

    m2mResetBtn.addEventListener('click', resetPipeline);

    // Populate textarea with samples
    m2mSampleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const fixId = btn.getAttribute('data-fixture');
        const fixture = FIXTURES[fixId];
        if (fixture) {
          currentFixtureId = fixture.id;
          m2mTextarea.value = fixture.input;
          m2mWarning.hidden = true;
          resetPipeline();
          m2mTextarea.focus();
        }
      });
    });

    // Start over with this added logic
    m2mStartOverBtn.addEventListener('click', () => {
      const newWorkText = m2mRefineInput.value.trim();
      if (newWorkText) {
        m2mTextarea.value = m2mTextarea.value + '\n\n' + newWorkText;
      }
      currentFixtureId = null; // Eligibility lost
      resetPipeline();
      m2mWarning.hidden = true;
    });

    m2mRefineInput.addEventListener('input', () => {
      m2mRefineWarningContainer.hidden = true;
    });

    m2mRefineInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        m2mRefineBtn.click();
      }
    });

    m2mRefineBtn.addEventListener('click', async () => {
      const rawVal = m2mRefineInput.value.trim();
      const val = rawVal.toLowerCase().replace(/\.$/, '');

      m2mRefineWarningContainer.hidden = true;
      m2mStartOverBtn.hidden = true;

      if (!val) return;

      // Material New Work Detection
      if (val.startsWith('add ') || val.startsWith('also add') || val.startsWith('new task') || val.startsWith('also need to')) {
        m2mRefineWarning.textContent = "REFINE_REQUIRES_NEW_RUN — this adds new work that was not part of the original triage.";
        m2mRefineWarningContainer.hidden = false;
        m2mStartOverBtn.hidden = false;
        m2mAnnouncer.textContent = m2mRefineWarning.textContent;
        return;
      }

      if (!currentFixtureId || !FIXTURES[currentFixtureId]) {
        m2mRefineWarning.textContent = "This demo refinement is not available for this scenario yet.";
        m2mRefineWarningContainer.hidden = false;
        m2mAnnouncer.textContent = m2mRefineWarning.textContent;
        return;
      }

      const fixture = FIXTURES[currentFixtureId];
      const refinementData = fixture.refinements && fixture.refinements[val];

      if (!refinementData) {
        m2mRefineWarning.textContent = "This refinement requires the live local agent. Choose a demo refinement.";
        m2mRefineWarningContainer.hidden = false;
        m2mAnnouncer.textContent = m2mRefineWarning.textContent;
        return;
      }

      // Valid refinement
      revisionCount++;
      const revisionStr = revisionCount < 10 ? `0${revisionCount}` : `${revisionCount}`;

      m2mRefineBtn.disabled = true;
      m2mRefineInput.disabled = true;
      m2mPipelineHelper.hidden = false;
      m2mAnnouncer.textContent = "Triage preserved. Replanning downstream.";

      currentRunId++; // invalidate previous runs
      const runId = currentRunId;

      try {
        await runStage(2, "Planning", refinementData.planning_summary, 0.9, runId);
        await runStage(3, "Assistant", refinementData.assistant_summary, 0.8, runId);

        if (currentRunId !== runId) return;

        renderMission(refinementData.mission);

        m2mHumanConstraintText.textContent = refinementData.constraint_label || rawVal;
        m2mHumanConstraint.hidden = false;
        m2mRevisedBadge.textContent = `REVISED PLAN · REVISION ${revisionStr}`;
        m2mRevisedBadge.hidden = false;

        m2mMissionHeading.focus();
        m2mAnnouncer.textContent = "Plan revised. Updated Mission is ready.";
      } catch(e) {
        if (e.message !== 'Aborted') console.error(e);
      } finally {
        m2mRefineBtn.disabled = false;
        m2mRefineInput.disabled = false;
      }
    });

    // Detect Custom Input
    m2mTextarea.addEventListener('input', () => {
      if (currentFixtureId) {
        const fixture = FIXTURES[currentFixtureId];
        if (m2mTextarea.value !== fixture.input) {
          currentFixtureId = null; // Eligibility lost
        }
      }
      m2mWarning.hidden = true;
    });

    // Run Pipeline
    m2mRunBtn.addEventListener('click', async () => {
      if (!currentFixtureId) {
        m2mWarning.textContent = "Custom input requires the live local agent. Choose a demo example to run the prototype.";
        m2mWarning.hidden = false;
        m2mAnnouncer.textContent = "Custom input requires the live local agent. Choose a demo example to run the prototype.";
        return;
      }

      if (!m2mTextarea.value.trim()) return;

      m2mWarning.hidden = true;

      resetPipeline(); // Clean slate before running

      m2mRunBtn.disabled = true;
      m2mRunBtn.textContent = 'Prototype running...';
      m2mTextarea.disabled = true;

      const runId = currentRunId; // Capture ID for this run instance

      const fixture = FIXTURES[currentFixtureId];
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scale = prefersReducedMotion ? 0.1 : 1;

      try {
        // Execute State Machine
        await runStage(1, "Triage", fixture.triage_summary, fixture.timing[0], runId);
        await runStage(2, "Planning", fixture.planning_summary, fixture.timing[1], runId);
        await runStage(3, "Assistant", fixture.assistant_summary, fixture.timing[2], runId);

        if (currentRunId !== runId) return; // Prevent race conditions

        // Finalize
        renderMission(fixture.mission);

        // Populate sample refinements for this fixture
        m2mRefineSamples.innerHTML = '';
        if (fixture.supportedRefinements) {
          fixture.supportedRefinements.forEach(refStr => {
            const btn = el('button', 'm2m-sample-btn mono', refStr);
            btn.addEventListener('click', () => {
              m2mRefineInput.value = refStr;
              m2mRefineWarningContainer.hidden = true;
            });
            m2mRefineSamples.appendChild(btn);
          });
        }

        m2mMissionPlaceholder.hidden = true;
        m2mMissionPopulated.hidden = false;
        m2mMissionPanel.classList.remove('empty');
        m2mMissionPanel.classList.add('completed');

        m2mRunBtn.textContent = 'Run the agents';
        m2mMissionHeading.focus();
        m2mAnnouncer.textContent = "Mission validated. Your demo plan is ready.";

      } catch (e) {
        if (e.message !== 'Aborted') console.error(e);
      }
    });
  }
});
